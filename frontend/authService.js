/**
 * DỊCH VỤ XÁC THỰC & BẢO MẬT NGƯỜI DÙNG (AUTHENTICATION SERVICE)
 * ---------------------------------------------------------------
 * Đồng bộ toàn diện Frontend (FE), Backend Service (BE) và Supabase Database (DB)
 * Hỗ trợ Đăng ký, Đăng nhập bằng Username / Password với mã hóa SHA-256 + Salt
 */

class AuthService {
    constructor() {
        this.currentUser = null;
        this.AUTH_STORAGE_KEY = 'anhdao_study_auth_user';
        this.AUTH_TOKEN_KEY = 'anhdao_study_auth_token';
        this.init();
    }

    init() {
        try {
            const saved = localStorage.getItem(this.AUTH_STORAGE_KEY) || sessionStorage.getItem(this.AUTH_STORAGE_KEY);
            if (saved) {
                this.currentUser = JSON.parse(saved);
            }
        } catch (e) {
            this.currentUser = null;
        }
    }

    /**
     * Băm mật khẩu an toàn chuẩn mật mã học bằng SHA-256 và Salt ngẫu nhiên
     */
    async hashPassword(password, salt) {
        const enc = new TextEncoder();
        const data = enc.encode(salt + password + 'ANHDAO_STUDY_SECURITY_SECRET_2026');
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Tạo chuỗi Salt ngẫu nhiên (Cryptographic Random Salt)
     */
    generateSalt(length = 16) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Tạo mã phiên đăng nhập ngẫu nhiên (Session Token)
     */
    generateToken() {
        return 'token_' + this.generateSalt(24) + '_' + Date.now();
    }

    /**
     * Lấy Supabase Client hiện hành
     */
    getSupabase() {
        return window.supabaseClient || null;
    }

    /**
     * ĐĂNG KÝ TÀI KHOẢN MỚI
     */
    async register({ username, password, fullName, classroom = '5A', role = 'student' }) {
        username = (username || '').trim().toLowerCase();
        fullName = (fullName || '').trim();

        // 1. Kiểm tra tính hợp lệ dữ liệu (Validation)
        if (!username || username.length < 3) {
            throw new Error('Tên đăng nhập phải có ít nhất 3 ký tự (chữ cái và số)!');
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            throw new Error('Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới (không dấu, không khoảng trắng)!');
        }
        if (!password || password.length < 6) {
            throw new Error('Mật khẩu bảo mật phải có ít nhất 6 ký tự!');
        }
        if (!fullName) {
            throw new Error('Vui lòng nhập họ và tên của học sinh hoặc giáo viên!');
        }

        const supabase = this.getSupabase();
        const salt = this.generateSalt();
        const passwordHash = await this.hashPassword(password, salt);
        const avatarUrl = role === 'teacher' 
            ? 'https://img.icons8.com/color/96/teacher.png' 
            : 'https://img.icons8.com/color/96/student-male.png';

        // 2. Kiểm tra và lưu tài khoản vào Supabase
        if (supabase) {
            // Kiểm tra username đã tồn tại chưa
            const { data: existingUser, error: checkErr } = await supabase
                .from('app_users')
                .select('id')
                .eq('username', username)
                .maybeSingle();

            if (existingUser) {
                throw new Error(`Tên đăng nhập "${username}" đã có người sử dụng! Vui lòng chọn tên khác.`);
            }

            // Thêm người dùng mới vào bảng app_users trong Supabase
            const { data: newUser, error: insertErr } = await supabase
                .from('app_users')
                .insert({
                    username: username,
                    password_hash: passwordHash,
                    salt: salt,
                    full_name: fullName,
                    classroom: classroom,
                    role: role,
                    avatar: avatarUrl,
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                })
                .select()
                .single();

            if (insertErr) {
                console.error('Lỗi Supabase insert app_users:', insertErr);
                throw new Error('Không thể lưu người dùng lên Supabase: ' + (insertErr.message || 'Lỗi cơ sở dữ liệu'));
            }

            // Đồng bộ luôn vào bảng students để quản lý tiến độ
            try {
                await supabase.from('students').upsert({
                    student_name: fullName,
                    classroom: classroom,
                    completed_lessons_count: 0,
                    last_active: new Date().toISOString()
                }, { onConflict: 'student_name' });
            } catch (e) {}

            return this.setCurrentSession(newUser, this.generateToken(), true);
        } else {
            // Lưu trữ Offline/Local Fallback nếu chưa kết nối mạng
            const localUsers = JSON.parse(localStorage.getItem('anhdao_local_users') || '[]');
            if (localUsers.find(u => u.username === username)) {
                throw new Error(`Tên đăng nhập "${username}" đã tồn tại trên thiết bị này!`);
            }

            const localUser = {
                id: 'local_' + Date.now(),
                username,
                password_hash: passwordHash,
                salt,
                full_name: fullName,
                classroom,
                role,
                avatar: avatarUrl,
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString()
            };

            localUsers.push(localUser);
            localStorage.setItem('anhdao_local_users', JSON.stringify(localUsers));
            return this.setCurrentSession(localUser, this.generateToken(), true);
        }
    }

    /**
     * ĐĂNG NHẬP BẰNG USERNAME & MẬT KHẨU
     */
    async login({ username, password, remember = true }) {
        username = (username || '').trim().toLowerCase();
        if (!username || !password) {
            throw new Error('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
        }

        const supabase = this.getSupabase();

        if (supabase) {
            // 1. Truy vấn thông tin người dùng từ Supabase
            const { data: user, error } = await supabase
                .from('app_users')
                .select('*')
                .eq('username', username)
                .maybeSingle();

            if (error) {
                console.error('Lỗi truy vấn đăng nhập:', error);
                throw new Error('Lỗi truy vấn cơ sở dữ liệu Supabase: ' + error.message);
            }

            if (!user) {
                // Kiểm tra xem có phải tài khoản Demo có sẵn không
                if (username === 'hocsinh5a' && password === '123456') {
                    return this.register({
                        username: 'hocsinh5a',
                        password: '123456',
                        fullName: 'Đào Thùy Anh',
                        classroom: '5A',
                        role: 'student'
                    });
                } else if (username === 'giaovien' && password === '123456') {
                    return this.register({
                        username: 'giaovien',
                        password: '123456',
                        fullName: 'Cô Giáo Anh Đào',
                        classroom: 'Khối 5',
                        role: 'teacher'
                    });
                }
                throw new Error(`Tên đăng nhập "${username}" không tồn tại trong hệ thống! Hãy bấm "Đăng ký ngay" để tạo tài khoản mới.`);
            }

            // 2. Tính toán mã băm với Salt và đối chiếu
            const computedHash = await this.hashPassword(password, user.salt);
            if (computedHash !== user.password_hash) {
                throw new Error('Mật khẩu không chính xác! Vui lòng kiểm tra lại.');
            }

            // 3. Cập nhật thời gian đăng nhập gần nhất (last_login)
            await supabase.from('app_users').update({
                last_login: new Date().toISOString()
            }).eq('id', user.id);

            // 4. Tạo phiên làm việc (Session)
            const token = this.generateToken();
            try {
                await supabase.from('user_sessions').insert({
                    user_id: user.id,
                    token: token,
                    created_at: new Date().toISOString()
                });
            } catch (e) {}

            return this.setCurrentSession(user, token, remember);
        } else {
            // Local fallback
            const localUsers = JSON.parse(localStorage.getItem('anhdao_local_users') || '[]');
            const user = localUsers.find(u => u.username === username);

            if (!user) {
                // Tự động cấp tài khoản demo
                if (username === 'hocsinh5a' && password === '123456') {
                    const demoUser = {
                        id: 'demo_1',
                        username: 'hocsinh5a',
                        full_name: 'Đào Thùy Anh',
                        classroom: '5A',
                        role: 'student',
                        avatar: 'https://img.icons8.com/color/96/student-male.png'
                    };
                    return this.setCurrentSession(demoUser, 'demo_token', remember);
                } else if (username === 'giaovien' && password === '123456') {
                    const demoTeacher = {
                        id: 'demo_2',
                        username: 'giaovien',
                        full_name: 'Cô Giáo Anh Đào',
                        classroom: 'Khối 5',
                        role: 'teacher',
                        avatar: 'https://img.icons8.com/color/96/teacher.png'
                    };
                    return this.setCurrentSession(demoTeacher, 'demo_token_teacher', remember);
                }
                throw new Error(`Tên đăng nhập "${username}" không tồn tại! Vui lòng chuyển sang tab Đăng ký.`);
            }

            const computedHash = await this.hashPassword(password, user.salt);
            if (computedHash !== user.password_hash) {
                throw new Error('Mật khẩu không chính xác!');
            }

            return this.setCurrentSession(user, this.generateToken(), remember);
        }
    }

    /**
     * Lưu thông tin người dùng vào Session Client
     */
    setCurrentSession(user, token = null, remember = true) {
        const safeUser = {
            id: user.id,
            username: user.username,
            full_name: user.full_name || user.username,
            classroom: user.classroom || '5A',
            role: user.role || 'student',
            avatar: user.avatar || (user.role === 'teacher' ? 'https://img.icons8.com/color/96/teacher.png' : 'https://img.icons8.com/color/96/student-male.png'),
            last_login: user.last_login || new Date().toISOString()
        };

        this.currentUser = safeUser;
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(safeUser));

        if (token) {
            storage.setItem(this.AUTH_TOKEN_KEY, token);
        }

        // Bắn sự kiện thông báo toàn bộ website cập nhật giao diện
        window.dispatchEvent(new CustomEvent('auth:stateChange', { detail: { user: safeUser } }));
        return safeUser;
    }

    /**
     * ĐĂNG XUẤT TÀI KHOẢN
     */
    async logout() {
        const user = this.currentUser;
        const supabase = this.getSupabase();

        if (user && supabase) {
            try {
                await supabase.from('user_sessions').delete().eq('user_id', user.id);
            } catch (e) {}
        }

        this.currentUser = null;
        localStorage.removeItem(this.AUTH_STORAGE_KEY);
        localStorage.removeItem(this.AUTH_TOKEN_KEY);
        sessionStorage.removeItem(this.AUTH_STORAGE_KEY);
        sessionStorage.removeItem(this.AUTH_TOKEN_KEY);

        window.dispatchEvent(new CustomEvent('auth:stateChange', { detail: { user: null } }));
    }

    /**
     * ĐỔI MẬT KHẨU BẢO MẬT
     */
    async changePassword({ oldPassword, newPassword }) {
        if (!this.currentUser) {
            throw new Error('Vui lòng đăng nhập trước khi thực hiện đổi mật khẩu!');
        }
        if (!oldPassword || !newPassword) {
            throw new Error('Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới!');
        }
        if (newPassword.length < 6) {
            throw new Error('Mật khẩu mới phải có tối thiểu 6 ký tự!');
        }

        const supabase = this.getSupabase();
        const username = this.currentUser.username;

        if (supabase) {
            // 1. Lấy thông tin user hiện tại từ Supabase
            const { data: user, error } = await supabase
                .from('app_users')
                .select('*')
                .eq('username', username)
                .single();

            if (error || !user) {
                throw new Error('Không tìm thấy tài khoản người dùng trên Supabase!');
            }

            // 2. Xác thực mật khẩu cũ
            const oldComputed = await this.hashPassword(oldPassword, user.salt);
            if (oldComputed !== user.password_hash) {
                throw new Error('Mật khẩu cũ không chính xác! Vui lòng kiểm tra lại.');
            }

            // 3. Tạo salt mới và hash mật khẩu mới
            const newSalt = this.generateSalt();
            const newHash = await this.hashPassword(newPassword, newSalt);

            // 4. Cập nhật vào Supabase
            const { error: updateErr } = await supabase
                .from('app_users')
                .update({
                    password_hash: newHash,
                    salt: newSalt
                })
                .eq('id', user.id);

            if (updateErr) {
                console.error('Lỗi update password Supabase:', updateErr);
                throw new Error('Không thể cập nhật mật khẩu mới trên Supabase: ' + updateErr.message);
            }

            return { success: true };
        } else {
            // Local fallback
            const localUsers = JSON.parse(localStorage.getItem('anhdao_local_users') || '[]');
            const userIdx = localUsers.findIndex(u => u.username === username);

            if (userIdx === -1) {
                // Cho phép đổi mật khẩu demo
                return { success: true };
            }

            const user = localUsers[userIdx];
            const oldComputed = await this.hashPassword(oldPassword, user.salt);
            if (oldComputed !== user.password_hash) {
                throw new Error('Mật khẩu cũ không chính xác!');
            }

            const newSalt = this.generateSalt();
            const newHash = await this.hashPassword(newPassword, newSalt);
            localUsers[userIdx].password_hash = newHash;
            localUsers[userIdx].salt = newSalt;
            localStorage.setItem('anhdao_local_users', JSON.stringify(localUsers));

            return { success: true };
        }
    }

    /**
     * Lấy người dùng hiện tại
     */
    getUser() {
        return this.currentUser;
    }

    /**
     * Kiểm tra có đang đăng nhập hay không
     */
    isAuthenticated() {
        return !!this.currentUser;
    }

    /**
     * Kiểm tra quyền Giáo viên
     */
    isTeacher() {
        return this.currentUser && this.currentUser.role === 'teacher';
    }
}

// Khởi tạo Singleton toàn cục
window.authService = new AuthService();

