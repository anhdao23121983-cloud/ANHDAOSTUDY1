-- ==============================================================================
-- BẢNG DỮ LIỆU ĐĂNG KÝ / ĐĂNG NHẬP (AUTHENTICATION & USER PROFILES) CHO SUPABASE
-- ==============================================================================

-- 1. Bảng app_users: Lưu trữ thông tin tài khoản người dùng, băm mật khẩu bảo mật
CREATE TABLE IF NOT EXISTS public.app_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    classroom VARCHAR(30) DEFAULT '5A',
    role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
    avatar TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bảng user_sessions: Quản lý phiên đăng nhập và Token bảo mật
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.app_users(id) ON DELETE CASCADE,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tạo chỉ mục (Index) giúp truy vấn đăng nhập siêu tốc
CREATE INDEX IF NOT EXISTS idx_app_users_username ON public.app_users(username);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON public.user_sessions(token);

-- 4. Kích hoạt Row Level Security (RLS) & Phân quyền truy cập
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Cho phép người dùng và ứng dụng truy vấn và đăng ký tài khoản (Anon & Authenticated)
CREATE POLICY "Allow public read app_users" 
ON public.app_users FOR SELECT USING (true);

CREATE POLICY "Allow public insert app_users" 
ON public.app_users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update app_users" 
ON public.app_users FOR UPDATE USING (true);

CREATE POLICY "Allow public all user_sessions" 
ON public.user_sessions FOR ALL USING (true);

-- 5. Nạp sẵn 2 tài khoản mẫu chuẩn để thầy cô và học sinh thử nghiệm ngay:
-- Tài khoản học sinh: hocsinh5a / 123456
-- Tài khoản giáo viên: giaovien / 123456
INSERT INTO public.app_users (username, password_hash, salt, full_name, classroom, role, avatar)
VALUES 
(
    'hocsinh5a', 
    '08cb2142d7650f9689456715f53d2ee17f8a709292fa041f2a32c0274191d9d9', 
    'a1b2c3d4e5f67890', 
    'Đào Thùy Anh', 
    '5A', 
    'student', 
    'https://img.icons8.com/color/96/student-male.png'
),
(
    'giaovien', 
    '08cb2142d7650f9689456715f53d2ee17f8a709292fa041f2a32c0274191d9d9', 
    'a1b2c3d4e5f67890', 
    'Cô Giáo Anh Đào', 
    'Khối 5', 
    'teacher', 
    'https://img.icons8.com/color/96/teacher.png'
)
ON CONFLICT (username) DO NOTHING;
