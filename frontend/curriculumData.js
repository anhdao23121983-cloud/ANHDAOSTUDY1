/**
 * ==============================================================================
 * HỆ THỐNG DỮ LIỆU CHƯƠNG TRÌNH SGK ĐẦY ĐỦ TỪ LỚP 1 ĐẾN LỚP 12 (BỘ GIÁO DỤC & ĐÀO TẠO)
 * ANH DAO AI STUDY - CHƯƠNG TRÌNH GIÁO DỤC PHỔ THÔNG (GDPT 2018)
 * ==============================================================================
 */

window.CURRICULUM_CATALOG = {
    // ==========================================
    // CẤP 1 - TIỂU HỌC (LỚP 1 ĐẾN LỚP 5)
    // ==========================================
    lop1: {
        name: 'Khối Lớp 1 (Tiểu học)',
        subjects: {
            toan: {
                name: 'Môn Toán lớp 1',
                color: '#2563EB',
                icon: 'cube',
                nodes: {
                    'node-1': { title: 'TOÁN LỚP 1 - BỘ GD&ĐT', desc: 'Làm quen số đếm & các hình khối cơ bản', icon: 'cube', color: '#2563EB' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 1A', icon: 'grad', color: '#2563EB' },
                    'node-3': { title: 'CÁC SỐ TRONG PHẠM VI 10', desc: 'Đếm, đọc, viết và so sánh các số từ 0 đến 10', icon: 'book', color: '#2563EB' },
                    'node-4': { title: 'PHÉP CỘNG TRỪ TRONG PHẠM VI 10', desc: 'Bảng cộng trừ cơ bản & toán có lời văn', icon: 'gamepad', color: '#2563EB' },
                    'node-5': { title: 'BÀI KIỂM TRA TOÁN LỚP 1', desc: 'Đề khảo sát năng lực số học kỳ 1', icon: 'quiz', color: '#2563EB' },
                    'node-6': { title: 'CÁC SỐ ĐẾN 100', desc: 'Chục và đơn vị, so sánh số có 2 chữ số', icon: 'cube', color: '#2563EB' },
                    'node-7': { title: 'HÌNH HỌC TRỰC QUAN', desc: 'Hình vuông, hình tròn, hình tam giác', icon: 'cube', color: '#2563EB' },
                    'node-8': { title: 'ĐO ĐỘ DÀI & XEM GIỜ', desc: 'Làm quen với xăng-ti-mét và xem đồng hồ', icon: 'cube', color: '#2563EB' }
                },
                quizzes: [
                    { q: 'Số liền sau của số 9 là số nào?', opts: ['7', '8', '10', '11'], correct: 'C', exp: 'Số liền sau của 9 là 9 + 1 = 10.' },
                    { q: 'Kết quả của phép tính: 5 + 3 = ?', opts: ['7', '8', '9', '6'], correct: 'B', exp: '5 cộng 3 bằng 8.' },
                    { q: 'Hình nào sau đây có 3 cạnh và 3 góc?', opts: ['Hình vuông', 'Hình tròn', 'Hình tam giác', 'Hình chữ nhật'], correct: 'C', exp: 'Hình tam giác có 3 cạnh và 3 đỉnh góc.' }
                ],
                flashcards: [
                    { id: 1, text: 'Số 10', matchText: 'Gồm 1 chục và 0 đơn vị' },
                    { id: 2, text: 'Hình tròn', matchText: 'Hình cong khép kín không có góc' },
                    { id: 3, text: 'Xăng-ti-mét (cm)', matchText: 'Đơn vị đo độ dài' },
                    { id: 4, text: 'Phép cộng', matchText: 'Gộp thêm vào để có nhiều hơn' },
                    { id: 5, text: 'Phép trừ', matchText: 'Bớt đi để biết còn lại bao nhiêu' },
                    { id: 6, text: 'Đồng hồ', matchText: 'Dụng cụ xem giờ và phút' }
                ]
            },
            tiengviet: {
                name: 'Môn Tiếng Việt lớp 1',
                color: '#059669',
                icon: 'book',
                nodes: {
                    'node-1': { title: 'TIẾNG VIỆT LỚP 1 - ÂM VẦN', desc: 'Học bảng chữ cái và ghép vần tiếng Việt', icon: 'book', color: '#059669' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 1A', icon: 'grad', color: '#059669' },
                    'node-3': { title: 'BẢNG CHỮ CÁI & DẤU THANH', desc: '29 chữ cái và 5 dấu thanh tiếng Việt', icon: 'book', color: '#059669' },
                    'node-4': { title: 'TRÒ CHƠI GHÉP VẦN VUI', desc: 'Ghép nguyên âm và phụ âm tạo từ', icon: 'gamepad', color: '#059669' },
                    'node-5': { title: 'KIỂM TRA ĐỌC HIỂU LỚP 1', desc: 'Đọc câu ngắn và nhận biết hình ảnh', icon: 'quiz', color: '#059669' },
                    'node-6': { title: 'TẬP ĐỌC CÂU NGẮN', desc: 'Luyện phát âm chuẩn và ngắt nghỉ đúng', icon: 'book', color: '#059669' },
                    'node-7': { title: 'CHÍNH TẢ & TẬP VIẾT', desc: 'Tô chữ hoa, viết nét đều và nét thanh', icon: 'book', color: '#059669' },
                    'node-8': { title: 'KỂ CHUYỆN THEO TRANH', desc: 'Quan sát tranh và kể lại câu chuyện hay', icon: 'book', color: '#059669' }
                },
                quizzes: [
                    { q: 'Tiếng "hoa" gồm có những âm nào ghép lại?', opts: ['h - o - a', 'h - a', 'o - a', 'h - o'], correct: 'A', exp: 'Tiếng hoa gồm âm đầu h ghép với vần oa.' },
                    { q: 'Dấu thanh nào được dùng trong từ "bà"?', opts: ['Dấu sắc', 'Dấu huyền', 'Dấu hỏi', 'Dấu ngã'], correct: 'B', exp: 'Từ "bà" mang dấu huyền.' }
                ],
                flashcards: [
                    { id: 1, text: 'Chữ A - a', matchText: 'Chữ cái đầu tiên trong bảng chữ cái' },
                    { id: 2, text: 'Dấu Sắc (/) ', matchText: 'Thanh sắc tạo âm cao' },
                    { id: 3, text: 'Vần An', matchText: 'Ghép từ âm a và âm n' },
                    { id: 4, text: 'Vần Ong', matchText: 'Ghép từ âm o và âm ng' },
                    { id: 5, text: 'Từ Mẹ', matchText: 'Người sinh thành yêu thương em' },
                    { id: 6, text: 'Trường học', matchText: 'Nơi em học tập cùng thầy cô bạn bè' }
                ]
            },
            tienganh: {
                name: 'Môn Tiếng Anh lớp 1',
                color: '#D97706',
                icon: 'globe',
                nodes: {
                    'node-1': { title: 'ENGLISH GRADE 1 - PHONICS', desc: 'First Steps in English Phonics & Words', icon: 'grad', color: '#D97706' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'Student: Thuy Anh - Grade 1A', icon: 'grad', color: '#D97706' },
                    'node-3': { title: 'GREETINGS & COLORS', desc: 'Hello, Goodbye, Red, Blue, Yellow', icon: 'book', color: '#D97706' },
                    'node-4': { title: 'ENGLISH WORD GAMES', desc: 'Match animal pictures with sounds', icon: 'gamepad', color: '#D97706' },
                    'node-5': { title: 'ENGLISH TEST GRADE 1', desc: 'Listen and pick the correct object', icon: 'quiz', color: '#D97706' },
                    'node-6': { title: 'NUMBERS 1 TO 10', desc: 'One, two, three, four, five...', icon: 'monitor', color: '#D97706' },
                    'node-7': { title: 'MY FAMILY & HOME', desc: 'Father, mother, brother, sister', icon: 'monitor', color: '#D97706' },
                    'node-8': { title: 'ANIMAL FRIENDS', desc: 'Cat, dog, bird, fish, elephant', icon: 'monitor', color: '#D97706' }
                },
                quizzes: [
                    { q: 'How do you say "Xin chào" in English?', opts: ['Goodbye', 'Hello', 'Thank you', 'Sorry'], correct: 'B', exp: '"Hello" or "Hi" means Xin chào.' },
                    { q: 'What color is the Sun?', opts: ['Blue', 'Yellow', 'Green', 'Black'], correct: 'B', exp: 'The Sun is yellow/orange.' }
                ],
                flashcards: [
                    { id: 1, text: 'Hello', matchText: 'Xin chào' },
                    { id: 2, text: 'Red', matchText: 'Màu đỏ rực rỡ' },
                    { id: 3, text: 'Cat', matchText: 'Con mèo đáng yêu' },
                    { id: 4, text: 'Dog', matchText: 'Con chó trung thành' },
                    { id: 5, text: 'Apple', matchText: 'Quả táo ngọt lành' },
                    { id: 6, text: 'Book', matchText: 'Quyển sách học bài' }
                ]
            }
        }
    },

    // ==========================================
    // CÁC KHỐI LỚP 2, 3, 4, 5
    // ==========================================
    lop2: {
        name: 'Khối Lớp 2 (Tiểu học)',
        subjects: {
            toan: {
                name: 'Môn Toán lớp 2',
                color: '#2563EB',
                icon: 'cube',
                nodes: {
                    'node-1': { title: 'TOÁN LỚP 2 - PHÉP TÍNH', desc: 'Bảng nhân 2 & 5, cộng trừ có nhớ trong phạm vi 100', icon: 'cube', color: '#2563EB' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 2A', icon: 'grad', color: '#2563EB' },
                    'node-3': { title: 'PHÉP CỘNG TRỪ CÓ NHỚ', desc: 'Tính nhẩm và đặt tính rồi tính', icon: 'book', color: '#2563EB' },
                    'node-4': { title: 'TRÒ CHƠI BẢNG CỬU CHƯƠNG', desc: 'Đua xe giải đố nhân chia 2 và 5', icon: 'gamepad', color: '#2563EB' },
                    'node-5': { title: 'KIỂM TRA ĐỊNH KỲ TOÁN 2', desc: 'Đề thi trắc nghiệm và toán đố', icon: 'quiz', color: '#2563EB' },
                    'node-6': { title: 'ĐƠN VỊ ĐO ĐỘ DÀI (dm, m, km)', desc: 'Chuyển đổi xăng-ti-mét, đề-xi-mét, mét', icon: 'cube', color: '#2563EB' },
                    'node-7': { title: 'KHỐI TRỤ & KHỐI CẦU', desc: 'Nhận biết hình khối trong không gian', icon: 'cube', color: '#2563EB' },
                    'node-8': { title: 'NGÀY GIỜ & LỊCH THỜI GIAN', desc: 'Xem đồng hồ chính xác đến 5 phút', icon: 'cube', color: '#2563EB' }
                },
                quizzes: [
                    { q: 'Kết quả của phép nhân: 2 x 8 = ?', opts: ['14', '16', '18', '12'], correct: 'B', exp: '2 nhân 8 bằng 16.' },
                    { q: '1 mét (m) bằng bao nhiêu xăng-ti-mét (cm)?', opts: ['10 cm', '100 cm', '1000 cm', '50 cm'], correct: 'B', exp: '1 m = 100 cm.' }
                ],
                flashcards: [
                    { id: 1, text: '2 x 5', matchText: 'Bằng 10' },
                    { id: 2, text: '5 x 6', matchText: 'Bằng 30' },
                    { id: 3, text: '1 Đề-xi-mét (dm)', matchText: 'Bằng 10 cm' },
                    { id: 4, text: 'Khối trụ', matchText: 'Có hai đáy hình tròn phẳng' },
                    { id: 5, text: 'Số bị trừ', matchText: 'Thành phần đầu tiên trong phép trừ' },
                    { id: 6, text: 'Thừa số', matchText: 'Các thành phần trong phép nhân' }
                ]
            },
            tiengviet: {
                name: 'Môn Tiếng Việt lớp 2',
                color: '#059669',
                icon: 'book',
                nodes: {
                    'node-1': { title: 'TIẾNG VIỆT LỚP 2 - MỞ RỘNG', desc: 'Mở rộng vốn từ và rèn luyện kỹ năng viết', icon: 'book', color: '#059669' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 2A', icon: 'grad', color: '#059669' },
                    'node-3': { title: 'TỪ CHỈ SỰ VẬT & HOẠT ĐỘNG', desc: 'Phân biệt danh từ và động từ chỉ hành động', icon: 'book', color: '#059669' },
                    'node-4': { title: 'TRÒ CHƠI NỐI CÂU AI LÀ GÌ?', desc: 'Luyện mẫu câu: Ai là gì? Ai làm gì?', icon: 'gamepad', color: '#059669' },
                    'node-5': { title: 'KIỂM TRA TIẾNG VIỆT 2', desc: 'Đọc hiểu và luyện câu', icon: 'quiz', color: '#059669' },
                    'node-6': { title: 'TẬP LÀM VĂN NGẮN', desc: 'Viết đoạn văn 4-5 câu kể về người thân', icon: 'book', color: '#059669' },
                    'node-7': { title: 'DẤU CHẤM, DẤU PHẨY', desc: 'Quy tắc đặt dấu câu đúng ngữ pháp', icon: 'book', color: '#059669' },
                    'node-8': { title: 'MỞ RỘNG VỐN TỪ THIÊN NHIÊN', desc: 'Cây cối, thời tiết và bốn mùa tươi đẹp', icon: 'book', color: '#059669' }
                },
                quizzes: [
                    { q: 'Từ nào sau đây là TỪ CHỈ HOẠT ĐỘNG?', opts: ['Học sinh', 'Chạy nhảy', 'Bàn ghế', 'Xinh đẹp'], correct: 'B', exp: '"Chạy nhảy" là từ chỉ hoạt động vận động.' }
                ],
                flashcards: [
                    { id: 1, text: 'Mẫu câu: Ai là gì?', matchText: 'Dùng để giới thiệu hoặc nhận định' },
                    { id: 2, text: 'Mẫu câu: Ai làm gì?', matchText: 'Dùng để kể về hoạt động của người/vật' },
                    { id: 3, text: 'Từ chỉ đặc điểm', matchText: 'Mô tả màu sắc, hình dáng, tính nết' },
                    { id: 4, text: 'Dấu chấm hỏi (?)', matchText: 'Đặt ở cuối câu hỏi' },
                    { id: 5, text: 'Dấu chấm than (!)', matchText: 'Đặt ở cuối câu bộc lộ cảm xúc' },
                    { id: 6, text: 'Đoạn văn', matchText: 'Tập hợp các câu cùng diễn đạt một ý' }
                ]
            }
        }
    },

    lop3: {
        name: 'Khối Lớp 3 (Tiểu học)',
        subjects: {
            toan: {
                name: 'Môn Toán lớp 3',
                color: '#2563EB',
                icon: 'cube',
                nodes: {
                    'node-1': { title: 'TOÁN LỚP 3 - BẢNG NHÂN CHIA', desc: 'Bảng nhân chia 1 đến 9, số có 4-5 chữ số', icon: 'cube', color: '#2563EB' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 3A', icon: 'grad', color: '#2563EB' },
                    'node-3': { title: 'BẢNG NHÂN CHIA TỪ 6 ĐẾN 9', desc: 'Ghi nhớ nhanh và tính nhẩm thành thạo', icon: 'book', color: '#2563EB' },
                    'node-4': { title: 'TRÒ CHƠI TÍNH DIỆN TÍCH', desc: 'Tính chu vi và diện tích hình vuông/chữ nhật', icon: 'gamepad', color: '#2563EB' },
                    'node-5': { title: 'KIỂM TRA HỌC KỲ TOÁN 3', desc: 'Đề thi tổng hợp kiến thức lớp 3', icon: 'quiz', color: '#2563EB' },
                    'node-6': { title: 'SỐ CÓ BỐN VÀ NĂM CHỮ SỐ', desc: 'Đọc viết và so sánh số đến 100.000', icon: 'cube', color: '#2563EB' },
                    'node-7': { title: 'CHU VI & DIỆN TÍCH', desc: 'Công thức S = a x b và P = (a + b) x 2', icon: 'cube', color: '#2563EB' },
                    'node-8': { title: 'GIẢI TOÁN BẰNG 2 PHÉP TÍNH', desc: 'Bài toán rút về đơn vị và toán gấp/giảm', icon: 'cube', color: '#2563EB' }
                },
                quizzes: [
                    { q: 'Diện tích hình vuông có cạnh 6 cm là:', opts: ['24 cm2', '36 cm2', '12 cm2', '18 cm2'], correct: 'B', exp: 'Diện tích hình vuông S = cạnh x cạnh = 6 x 6 = 36 cm2.' }
                ],
                flashcards: [
                    { id: 1, text: 'Chu vi hình chữ nhật', matchText: '(Chiều dài + Chiều rộng) x 2' },
                    { id: 2, text: 'Diện tích hình chữ nhật', matchText: 'Chiều dài x Chiều rộng' },
                    { id: 3, text: '1 Kilôgam (kg)', matchText: 'Bằng 1000 gam (g)' },
                    { id: 4, text: '9 x 9', matchText: 'Bằng 81' },
                    { id: 5, text: 'Góc vuông', matchText: 'Góc có số đo 90 độ đo bằng ê-ke' },
                    { id: 6, text: 'Tâm đường tròn', matchText: 'Điểm chính giữa cách đều mọi điểm trên đường tròn' }
                ]
            },
            tinhoc: {
                name: 'Môn Tin học lớp 3',
                color: '#7C3AED',
                icon: 'monitor',
                nodes: {
                    'node-1': { title: 'TIN HỌC LỚP 3 - KHÁM PHÁ', desc: 'Máy tính xung quanh ta và gõ 10 ngón', icon: 'monitor', color: '#7C3AED' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 3A', icon: 'grad', color: '#7C3AED' },
                    'node-3': { title: 'THÀNH PHẦN MÁY TÍNH', desc: 'Màn hình, Thân máy, Chuột, Bàn phím', icon: 'book', color: '#7C3AED' },
                    'node-4': { title: 'LUYỆN GÕ PHÍM 10 NGÓN', desc: 'Tập gõ hàng phím cơ sở với phím F và J', icon: 'gamepad', color: '#7C3AED' },
                    'node-5': { title: 'BÀI KIỂM TRA TIN HỌC 3', desc: 'Trắc nghiệm thao tác máy tính cơ bản', icon: 'quiz', color: '#7C3AED' },
                    'node-6': { title: 'PHẦN MỀM VẼ PAINT', desc: 'Dùng cọ vẽ, hình mẫu và tô màu sắc', icon: 'monitor', color: '#7C3AED' },
                    'node-7': { title: 'THƯ MỤC & TỆP TIN', desc: 'Tạo, đổi tên và lưu trữ tệp ngăn nắp', icon: 'monitor', color: '#7C3AED' },
                    'node-8': { title: 'AN TOÀN TRÊN MẠNG', desc: 'Không xem nội dung xấu và bảo vệ mắt', icon: 'monitor', color: '#7C3AED' }
                },
                quizzes: [
                    { q: 'Hai phím có gai định vị trên hàng phím cơ sở là phím nào?', opts: ['Phím F và J', 'Phím A và L', 'Phím G và H', 'Phím Space'], correct: 'A', exp: 'Phím F (ngón trỏ trái) và Phím J (ngón trỏ phải) có gờ định vị.' }
                ],
                flashcards: [
                    { id: 1, text: 'Phím F & J', matchText: 'Hai phím có gờ định vị ngón trỏ' },
                    { id: 2, text: 'Chuột máy tính', matchText: 'Gồm nút trái, nút phải và bánh lăn' },
                    { id: 3, text: 'Folder (Thư mục)', matchText: 'Ngăn chứa dùng lưu trữ tài liệu' },
                    { id: 4, text: 'Paint', matchText: 'Phần mềm đồ họa tập vẽ tranh' },
                    { id: 5, text: 'Màn hình', matchText: 'Thiết bị hiển thị kết quả làm việc' },
                    { id: 6, text: 'Bàn phím', matchText: 'Thiết bị nhập chữ và số' }
                ]
            }
        }
    },

    lop4: {
        name: 'Khối Lớp 4 (Tiểu học)',
        subjects: {
            toan: {
                name: 'Môn Toán lớp 4',
                color: '#2563EB',
                icon: 'cube',
                nodes: {
                    'node-1': { title: 'TOÁN LỚP 4 - PHÂN SỐ', desc: 'Phân số, Trung bình cộng và Hình học', icon: 'cube', color: '#2563EB' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 4A', icon: 'grad', color: '#2563EB' },
                    'node-3': { title: 'PHÂN SỐ & PHÉP TÍNH PHÂN SỐ', desc: 'Quy đồng mẫu số, cộng trừ nhân chia phân số', icon: 'book', color: '#2563EB' },
                    'node-4': { title: 'TRÒ CHƠI TOÁN TƯ DUY 4', desc: 'Tìm hai số khi biết Tổng và Hiệu', icon: 'gamepad', color: '#2563EB' },
                    'node-5': { title: 'KIỂM TRA HỌC KỲ TOÁN 4', desc: 'Đề thi khảo sát chất lượng phân số', icon: 'quiz', color: '#2563EB' },
                    'node-6': { title: 'TRUNG BÌNH CỘNG', desc: 'Tính số trung bình cộng của nhiều số', icon: 'cube', color: '#2563EB' },
                    'node-7': { title: 'HÌNH BÌNH HÀNH & HÌNH THOI', desc: 'Diện tích hình bình hành và hình thoi', icon: 'cube', color: '#2563EB' },
                    'node-8': { title: 'DẤU HIỆU CHIA HẾT (2, 3, 5, 9)', desc: 'Quy tắc xét chữ số tận cùng và tổng các chữ số', icon: 'cube', color: '#2563EB' }
                },
                quizzes: [
                    { q: 'Số nào sau đây chia hết cho CẢ 2 VÀ 5?', opts: ['125', '230', '342', '555'], correct: 'B', exp: 'Số chia hết cho cả 2 và 5 có chữ số tận cùng là 0 (230).' }
                ],
                flashcards: [
                    { id: 1, text: 'Phân số', matchText: 'Gồm tử số ở trên và mẫu số ở dưới khác 0' },
                    { id: 2, text: 'Diện tích hình thoi', matchText: '(Đường chéo 1 x Đường chéo 2) : 2' },
                    { id: 3, text: 'Số chia hết cho 9', matchText: 'Tổng các chữ số chia hết cho 9' },
                    { id: 4, text: 'Trung bình cộng', matchText: 'Tổng các số chia cho số các số hạng' },
                    { id: 5, text: 'Góc nhọn', matchText: 'Góc bé hơn góc vuông ( < 90 độ)' },
                    { id: 6, text: 'Góc tù', matchText: 'Góc lớn hơn góc vuông ( > 90 độ)' }
                ]
            },
            lichsu: {
                name: 'Môn Lịch sử & Địa lý lớp 4',
                color: '#B45309',
                icon: 'landmark',
                nodes: {
                    'node-1': { title: 'LỊCH SỬ & ĐỊA LÝ LỚP 4', desc: 'Khám phá lịch sử dựng nước & thiên nhiên VN', icon: 'landmark', color: '#B45309' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 4A', icon: 'grad', color: '#B45309' },
                    'node-3': { title: 'NƯỚC VĂN LANG & ÂU LẠC', desc: 'Vua Hùng dựng nước và An Dương Vương', icon: 'book', color: '#B45309' },
                    'node-4': { title: 'TRÒ CHƠI BẢN ĐỒ VIỆT NAM', desc: 'Nhận biết các vùng miền tổ quốc', icon: 'gamepad', color: '#B45309' },
                    'node-5': { title: 'KIỂM TRA LỊCH SỬ ĐỊA LÝ 4', desc: 'Đề thi trắc nghiệm danh nhân & địa hình', icon: 'quiz', color: '#B45309' },
                    'node-6': { title: 'CHIẾN THẮNG BẠCH ĐẰNG 938', desc: 'Ngô Quyền cắm cọc gỗ đánh tan quân Nam Hán', icon: 'landmark', color: '#B45309' },
                    'node-7': { title: 'VÙNG TRUNG DU VÀ ĐỒNG BẰNG', desc: 'Đặc điểm khí hậu, sông ngòi và nông nghiệp', icon: 'landmark', color: '#B45309' },
                    'node-8': { title: 'KINH ĐÔ THĂNG LONG - HÀ NỘI', desc: 'Lý Thái Tổ dời đô năm 1010', icon: 'landmark', color: '#B45309' }
                },
                quizzes: [
                    { q: 'Ai là người lãnh đạo chiến thắng Bạch Đằng năm 938 chấm dứt 1000 năm Bắc thuộc?', opts: ['Hai Bà Trưng', 'Ngô Quyền', 'Đinh Bộ Lĩnh', 'Lý Thường Kiệt'], correct: 'B', exp: 'Ngô Quyền chỉ huy trận Bạch Đằng năm 938 lập nên nhà Ngô.' }
                ],
                flashcards: [
                    { id: 1, text: 'Vua Hùng', matchText: 'Tổ tiên dựng nên nước Văn Lang' },
                    { id: 2, text: 'Năm 1010', matchText: 'Vua Lý Thái Tổ dời đô về Thăng Long' },
                    { id: 3, text: 'Đồng bằng Bắc Bộ', matchText: 'Vùng phù sa màu mỡ sông Hồng' },
                    { id: 4, text: 'Đỉnh Phan-xi-păng', matchText: 'Nóc nhà Đông Dương cao 3.143m' },
                    { id: 5, text: 'Chiến thắng Bạch Đằng', matchText: 'Năm 938 dùng cọc gỗ tiêu diệt quân Nam Hán' },
                    { id: 6, text: 'Quần đảo Hoàng Sa & Trường Sa', matchText: 'Lãnh thổ thiêng liêng trên biển Đông' }
                ]
            }
        }
    },

    lop5: {
        name: 'Khối Lớp 5 (Tiểu học)',
        subjects: {
            tinhoc: {
                name: 'Môn Tin học lớp 5',
                color: '#7C3AED',
                icon: 'monitor',
                nodes: {
                    'node-1': { title: 'WELCOME TO ANH DAO AI STUDY', desc: 'Nhấp đúp chuột để chỉnh sửa thông tin', icon: 'monitor', color: '#7C3AED' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 5A', icon: 'monitor', color: '#7C3AED' },
                    'node-3': { title: 'BÀI HỌC MÔN TIN HỌC', desc: 'Khám phá thế giới máy tính & lập trình', icon: 'book', color: '#7C3AED' },
                    'node-4': { title: 'TRÒ CHƠI MÔN TIN HỌC', desc: 'Luyện gõ 10 ngón & trò chơi tư duy', icon: 'gamepad', color: '#7C3AED' },
                    'node-5': { title: 'BÀI KIỂM TRA MÔN TIN HỌC', desc: 'Trắc nghiệm kiến thức Tin học kỳ 1', icon: 'quiz', color: '#7C3AED' },
                    'node-6': { title: 'TIN HỌC LỚP 5 - PHẦN MỀM', desc: 'Làm quen với soạn thảo văn bản Word', icon: 'monitor', color: '#7C3AED' },
                    'node-7': { title: 'TIN HỌC LỚP 5 - TRÌNH CHIẾU', desc: 'Thiết kế bài thuyết trình PowerPoint', icon: 'monitor', color: '#7C3AED' },
                    'node-8': { title: 'TIN HỌC LỚP 5 - INTERNET', desc: 'Tìm kiếm thông tin an toàn trên mạng', icon: 'monitor', color: '#7C3AED' }
                },
                quizzes: [
                    { q: 'Trong phần mềm soạn thảo văn bản Word, tổ hợp phím nào dùng để LƯU tệp văn bản?', opts: ['Ctrl + C', 'Ctrl + S', 'Ctrl + V', 'Ctrl + P'], correct: 'B', exp: 'Phím tắt Ctrl + S (Save) dùng để lưu lại văn bản đang soạn thảo.' },
                    { q: 'Thiết bị nào sau đây là THIẾT BỊ VÀO (Input Device) đưa dữ liệu vào máy tính?', opts: ['Màn hình hiển thị', 'Máy in màu', 'Bàn phím (Keyboard)', 'Loa máy tính'], correct: 'C', exp: 'Bàn phím và Chuột là các thiết bị vào cơ bản giúp con người nhập thông tin.' },
                    { q: 'Để bảo vệ an toàn thông tin cá nhân trên mạng Internet, em nên làm gì?', opts: ['Đặt mật khẩu đơn giản như 123456', 'Chia sẻ mật khẩu cho nhiều người', 'Đặt mật khẩu mạnh và không chia sẻ cho người lạ', 'Bấm vào mọi đường link lạ'], correct: 'C', exp: 'Mật khẩu mạnh và bảo mật thông tin cá nhân giúp tránh bị kẻ xấu đánh cắp tài khoản.' }
                ],
                flashcards: [
                    { id: 1, text: '🖥️ Màn hình', matchText: 'Thiết bị xuất hình ảnh đầu ra' },
                    { id: 2, text: '⌨️ Bàn phím', matchText: 'Thiết bị nhập ký tự & phím gõ' },
                    { id: 3, text: '🖱️ Chuột máy tính', matchText: 'Thiết bị điều khiển con trỏ' },
                    { id: 4, text: '💻 Thân máy (CPU)', matchText: 'Bộ não xử lý dữ liệu trung tâm' },
                    { id: 5, text: '🌐 Mạng Internet', matchText: 'Kết nối thông tin toàn cầu' },
                    { id: 6, text: '🧠 Trí tuệ AI', matchText: 'Trợ lý học tập thông minh' }
                ]
            },
            toan: {
                name: 'Môn Toán lớp 5',
                color: '#2563EB',
                icon: 'cube',
                nodes: {
                    'node-1': { title: 'HỆ THỐNG TOÁN HỌC LỚP 5', desc: 'Số thập phân, Tỉ số % và Toán chuyển động', icon: 'cube', color: '#2563EB' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 5A', icon: 'grad', color: '#2563EB' },
                    'node-3': { title: 'BÀI HỌC SỐ THẬP PHÂN', desc: 'Cộng trừ nhân chia số thập phân', icon: 'book', color: '#2563EB' },
                    'node-4': { title: 'TRÒ CHƠI GIẢI ĐỐ TOÁN NHANH', desc: 'Thi đấu tính nhẩm siêu tốc', icon: 'gamepad', color: '#2563EB' },
                    'node-5': { title: 'BÀI KIỂM TRA TOÁN HỌC 5', desc: 'Đề thi khảo sát chất lượng tháng', icon: 'quiz', color: '#2563EB' },
                    'node-6': { title: 'HÌNH HỌC LỚP 5', desc: 'Tính diện tích hình thang, hình tròn', icon: 'cube', color: '#2563EB' },
                    'node-7': { title: 'TOÁN CHUYỂN ĐỘNG', desc: 'Bài toán vận tốc, quãng đường, thời gian', icon: 'cube', color: '#2563EB' },
                    'node-8': { title: 'TỈ SỐ PHẦN TRĂM', desc: 'Toán ứng dụng thực tế tỉ số %', icon: 'cube', color: '#2563EB' }
                },
                quizzes: [
                    { q: 'Kết quả của phép tính cộng số thập phân: 12,5 + 3,75 là:', opts: ['15,25', '16,25', '16,50', '15,75'], correct: 'B', exp: '12,5 + 3,75 = 16,25.' },
                    { q: 'Một ô tô chạy trong 2 giờ được 90 km. Vận tốc trung bình của ô tô là:', opts: ['45 km/h', '40 km/h', '90 km/h', '180 km/h'], correct: 'A', exp: 'Vận tốc = Quãng đường : Thời gian = 90 : 2 = 45 km/h.' }
                ],
                flashcards: [
                    { id: 1, text: 'Vận tốc (v)', matchText: 'v = s : t (Quãng đường chia Thời gian)' },
                    { id: 2, text: 'Quãng đường (s)', matchText: 's = v x t (Vận tốc nhân Thời gian)' },
                    { id: 3, text: 'Diện tích hình tròn', matchText: 'S = r x r x 3,14' },
                    { id: 4, text: 'Diện tích hình thang', matchText: '(Đáy lớn + Đáy bé) x Chiều cao : 2' },
                    { id: 5, text: 'Tỉ số phần trăm (%)', matchText: 'Tỉ số của hai số nhân với 100%' },
                    { id: 6, text: 'Thể tích hình lập phương', matchText: 'V = a x a x a (Cạnh x Cạnh x Cạnh)' }
                ]
            },
            tiengviet: {
                name: 'Môn Tiếng Việt lớp 5',
                color: '#059669',
                icon: 'book',
                nodes: {
                    'node-1': { title: 'TIẾNG VIỆT LỚP 5 - TÁC PHẨM', desc: 'Từ nhiều nghĩa, Đại từ & Văn tả cảnh', icon: 'book', color: '#059669' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 5A', icon: 'grad', color: '#059669' },
                    'node-3': { title: 'TẬP ĐỌC & KỂ CHUYỆN', desc: 'Bài học Đất nước mến yêu', icon: 'book', color: '#059669' },
                    'node-4': { title: 'TRÒ CHƠI Ô CHỮ TIẾNG VIỆT', desc: 'Ghép từ nối câu & tìm từ đồng nghĩa', icon: 'gamepad', color: '#059669' },
                    'node-5': { title: 'KIỂM TRA CHÍNH TẢ & TẬP LÀM VĂN', desc: 'Bài văn tả cảnh thiên nhiên', icon: 'quiz', color: '#059669' },
                    'node-6': { title: 'LUYỆN TỪ VÀ CÂU', desc: 'Từ nhiều nghĩa và đại từ xưng hô', icon: 'book', color: '#059669' },
                    'node-7': { title: 'TẬP LÀM VĂN MIÊU TẢ', desc: 'Kỹ năng quan sát và diễn đạt', icon: 'book', color: '#059669' },
                    'node-8': { title: 'THƠ CA THIẾU NHI', desc: 'Cảm thụ tác phẩm văn học hay', icon: 'book', color: '#059669' }
                },
                quizzes: [
                    { q: 'Cặp từ nào sau đây là cặp TỪ ĐỒNG NGHĨA?', opts: ['Chăm chỉ - Siêng năng', 'Cao lớn - Thấp bé', 'Đen nhánh - Trắng tinh', 'Nhanh nhẹn - Chậm chạp'], correct: 'A', exp: 'Chăm chỉ và Siêng năng đều mang ý nghĩa cần cù, siêng năng lao động học tập.' }
                ],
                flashcards: [
                    { id: 1, text: 'Từ đồng âm', matchText: 'Phát âm giống nhau nhưng nghĩa hoàn toàn khác' },
                    { id: 2, text: 'Từ nhiều nghĩa', matchText: 'Có nghĩa gốc và các nghĩa chuyển liên quan' },
                    { id: 3, text: 'Đại từ xưng hô', matchText: 'Dùng để chỉ người nói, người nghe và người được nhắc' },
                    { id: 4, text: 'Quan hệ từ', matchText: 'Và, nhưng, vì, nên, tuy... nhưng...' },
                    { id: 5, text: 'Văn miêu tả', matchText: 'Vẽ lại hình ảnh sự vật bằng ngôn từ sinh động' },
                    { id: 6, text: 'Điệp từ điệp ngữ', matchText: 'Biện pháp lặp lại từ để nhấn mạnh ý nghĩa' }
                ]
            }
        }
    },

    // ==========================================
    // CẤP 2 - THCS (LỚP 6 ĐẾN LỚP 9)
    // ==========================================
    lop6: {
        name: 'Khối Lớp 6 (THCS)',
        subjects: {
            toan: {
                name: 'Môn Toán lớp 6',
                color: '#2563EB',
                icon: 'cube',
                nodes: {
                    'node-1': { title: 'TOÁN LỚP 6 - SỐ HỌC & HÌNH', desc: 'Tập hợp số tự nhiên, số nguyên, phân số & hình trực quan', icon: 'cube', color: '#2563EB' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 6A', icon: 'grad', color: '#2563EB' },
                    'node-3': { title: 'SỐ NGUYÊN ÂM & DƯƠNG', desc: 'Quy tắc cộng trừ nhân chia số nguyên (Z)', icon: 'book', color: '#2563EB' },
                    'node-4': { title: 'TRÒ CHƠI TÍNH ƯỚC & BỘI', desc: 'Tìm ƯCLN và BCNN siêu tốc', icon: 'gamepad', color: '#2563EB' },
                    'node-5': { title: 'KIỂM TRA HỌC KỲ TOÁN 6', desc: 'Đề thi trắc nghiệm số học & hình học', icon: 'quiz', color: '#2563EB' },
                    'node-6': { title: 'PHÂN SỐ & SỐ THẬP PHÂN', desc: 'Hỗn số, số thập phân và tỉ số phần trăm', icon: 'cube', color: '#2563EB' },
                    'node-7': { title: 'HÌNH HỌC PHẲNG TRỰC QUAN', desc: 'Tam giác đều, lục giác đều, hình thang cân', icon: 'cube', color: '#2563EB' },
                    'node-8': { title: 'THỐNG KÊ & XÁC SUẤT THỰC NGHIỆM', desc: 'Thu thập dữ liệu và biểu đồ cột kép', icon: 'cube', color: '#2563EB' }
                },
                quizzes: [
                    { q: 'Kết quả của phép tính: (-5) + (-8) là:', opts: ['-13', '13', '-3', '3'], correct: 'A', exp: 'Cộng hai số nguyên âm: (-5) + (-8) = -13.' },
                    { q: 'Ước chung lớn nhất của 12 và 18 là:', opts: ['3', '6', '12', '36'], correct: 'B', exp: 'ƯCLN(12, 18) = 6.' }
                ],
                flashcards: [
                    { id: 1, text: 'Tập hợp số nguyên Z', matchText: 'Bao gồm số nguyên âm, số 0 và số nguyên dương' },
                    { id: 2, text: 'ƯCLN', matchText: 'Số lớn nhất trong tập hợp các ước chung' },
                    { id: 3, text: 'BCNN', matchText: 'Số nhỏ nhất khác 0 trong tập hợp các bội chung' },
                    { id: 4, text: 'Tam giác đều', matchText: 'Có 3 cạnh bằng nhau và 3 góc bằng 60 độ' },
                    { id: 5, text: 'Lục giác đều', matchText: 'Hình có 6 cạnh bằng nhau và 6 góc bằng nhau' },
                    { id: 6, text: 'Xác suất thực nghiệm', matchText: 'Tỉ số giữa số lần xảy ra và tổng số lần thực hiện' }
                ]
            },
            tiengviet: {
                name: 'Môn Ngữ văn lớp 6',
                color: '#059669',
                icon: 'book',
                nodes: {
                    'node-1': { title: 'NGỮ VĂN LỚP 6 - CHÂN TRỜI SÁNG TẠO', desc: 'Truyện truyền thuyết, cổ tích & thơ lục bát', icon: 'book', color: '#059669' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 6A', icon: 'grad', color: '#059669' },
                    'node-3': { title: 'TRUYỀN THUYẾT & CỔ TÍCH', desc: 'Thánh Gióng, Sơn Tinh Thủy Tinh, Thạch Sanh', icon: 'book', color: '#059669' },
                    'node-4': { title: 'TRÒ CHƠI Ô CHỮ VĂN HỌC', desc: 'Tìm hiểu cốt truyện và nhân vật', icon: 'gamepad', color: '#059669' },
                    'node-5': { title: 'KIỂM TRA ĐỌC HIỂU NGỮ VĂN 6', desc: 'Đề thi phân tích văn bản & làm văn', icon: 'quiz', color: '#059669' },
                    'node-6': { title: 'THƠ LỤC BÁT & BIỆN PHÁP TU TỪ', desc: 'Quy tắc hiệp vần, ẩn dụ, hoán dụ', icon: 'book', color: '#059669' },
                    'node-7': { title: 'VĂN BẢN THÔNG TIN', desc: 'Cách đọc hiểu sơ đồ và văn bản thuyết minh', icon: 'book', color: '#059669' },
                    'node-8': { title: 'TẬP LÀM VĂN TỰ SỰ & MIÊU TẢ', desc: 'Kể lại một trải nghiệm sâu sắc của bản thân', icon: 'book', color: '#059669' }
                },
                quizzes: [
                    { q: 'Chi tiết "ngựa sắt phun lửa, gậy sắt nhổ tre đánh giặc" thuộc truyền thuyết nào?', opts: ['Sơn Tinh Thủy Tinh', 'Thánh Gióng', 'Con Rồng Cháu Tiên', 'Bánh chưng bánh giầy'], correct: 'B', exp: 'Truyền thuyết Thánh Gióng ca ngợi tinh thần yêu nước đánh giặc Ân.' }
                ],
                flashcards: [
                    { id: 1, text: 'Truyền thuyết', matchText: 'Kể về các sự kiện và nhân vật lịch sử có yếu tố hoang đường' },
                    { id: 2, text: 'Thơ lục bát', matchText: 'Thể thơ truyền thống câu 6 chữ xen kẽ câu 8 chữ' },
                    { id: 3, text: 'Ẩn dụ', matchText: 'Gọi tên sự vật này bằng tên sự vật khác có nét tương đồng' },
                    { id: 4, text: 'Hoán dụ', matchText: 'Gọi tên sự vật này bằng tên sự vật khác có nét tương cận' },
                    { id: 5, text: 'Nhân hóa', matchText: 'Gán cho loài vật đồ vật tính cách hành động của con người' },
                    { id: 6, text: 'So sánh', matchText: 'Đối chiếu hai sự vật có nét tương đồng qua từ "như, là"' }
                ]
            }
        }
    },

    lop9: {
        name: 'Khối Lớp 9 (Ôn thi vào 10)',
        subjects: {
            toan: {
                name: 'Môn Toán lớp 9 (Ôn thi vào 10)',
                color: '#2563EB',
                icon: 'cube',
                nodes: {
                    'node-1': { title: 'TOÁN LỚP 9 - TRỌNG TÂM THI VÀO 10', desc: 'Căn thức, Hệ phương trình, Parabol & Hình học đường tròn', icon: 'cube', color: '#2563EB' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 9A', icon: 'grad', color: '#2563EB' },
                    'node-3': { title: 'CĂN BẬC HAI & BIỂU THỨC', desc: 'Rút gọn biểu thức chứa căn bậc hai', icon: 'book', color: '#2563EB' },
                    'node-4': { title: 'TRÒ CHƠI GIẢI ĐỒ THỊ PARABOL', desc: 'Tương giao giữa đường thẳng (d) và parabol (P)', icon: 'gamepad', color: '#2563EB' },
                    'node-5': { title: 'ĐỀ THI THỬ TOÁN VÀO 10', desc: 'Đề thi chuẩn cấu trúc tuyển sinh Sở GD&ĐT', icon: 'quiz', color: '#2563EB' },
                    'node-6': { title: 'HỆ PHƯƠNG TRÌNH & ĐỊNH LÝ VI-ÉT', desc: 'Hệ thức Vi-ét và dấu nghiệm phương trình bậc 2', icon: 'cube', color: '#2563EB' },
                    'node-7': { title: 'HÌNH HỌC ĐƯỜNG TRÒN', desc: 'Góc nội tiếp, góc tạo bởi tiếp tuyến & dây cung', icon: 'cube', color: '#2563EB' },
                    'node-8': { title: 'TỨ GIÁC NỘI TIẾP & TOÁN THỰC TẾ', desc: 'Chứng minh 4 điểm thuộc đường tròn & bài toán ứng dụng', icon: 'cube', color: '#2563EB' }
                },
                quizzes: [
                    { q: 'Hệ thức Vi-ét đối với phương trình bậc hai ax^2 + bx + c = 0 (a ≠ 0) có hai nghiệm x1, x2 là:', opts: ['x1 + x2 = -b/a; x1.x2 = c/a', 'x1 + x2 = b/a; x1.x2 = -c/a', 'x1 + x2 = -c/a; x1.x2 = b/a', 'x1 + x2 = 2b/a; x1.x2 = c/2a'], correct: 'A', exp: 'Theo định lý Vi-ét: Tổng hai nghiệm S = -b/a và Tích hai nghiệm P = c/a.' },
                    { q: 'Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu?', opts: ['45 độ', '60 độ', '90 độ (góc vuông)', '180 độ'], correct: 'C', exp: 'Góc nội tiếp chắn nửa đường tròn luôn là góc vuông 90 độ.' }
                ],
                flashcards: [
                    { id: 1, text: 'Định lý Vi-ét', matchText: 'x1 + x2 = -b/a và x1.x2 = c/a' },
                    { id: 2, text: 'Biệt thức Delta (Δ)', matchText: 'Δ = b^2 - 4ac (Δ > 0 phương trình có 2 nghiệm pb)' },
                    { id: 3, text: 'Tứ giác nội tiếp', matchText: 'Tứ giác có tổng hai góc đối diện bằng 180 độ' },
                    { id: 4, text: 'Góc tạo bởi tiếp tuyến & dây cung', matchText: 'Bằng nửa số đo của cung bị chắn' },
                    { id: 5, text: 'Phương trình bậc hai', matchText: 'Dạng chuẩn ax^2 + bx + c = 0 (a ≠ 0)' },
                    { id: 6, text: 'Hệ phương trình bậc nhất 2 ẩn', matchText: 'Giải bằng phương pháp thế hoặc cộng đại số' }
                ]
            },
            tiengviet: {
                name: 'Môn Ngữ văn lớp 9 (Ôn thi vào 10)',
                color: '#059669',
                icon: 'book',
                nodes: {
                    'node-1': { title: 'NGỮ VĂN LỚP 9 - ÔN THI VÀO 10', desc: 'Văn học hiện đại, Truyện Kiều & Nghị luận văn học', icon: 'book', color: '#059669' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 9A', icon: 'grad', color: '#059669' },
                    'node-3': { title: 'TRUYỆN KIỀU - NGUYỄN DU', desc: 'Chị em Thúy Kiều & Kiều ở lầu Ngưng Bích', icon: 'book', color: '#059669' },
                    'node-4': { title: 'TRÒ CHƠI THI CA HIỆN ĐẠI', desc: 'Đồng chí, Bài thơ về tiểu đội xe không kính', icon: 'gamepad', color: '#059669' },
                    'node-5': { title: 'ĐỀ THI THỬ NGỮ VĂN VÀO 10', desc: 'Nghị luận xã hội & Nghị luận văn học', icon: 'quiz', color: '#059669' },
                    'node-6': { title: 'MÙA XUÂN NHO NHỎ - THANH HẢI', desc: 'Khát vọng cống hiến cuộc đời cho đất nước', icon: 'book', color: '#059669' },
                    'node-7': { title: 'VIẾNG LĂNG BÁC - VIỄN PHƯƠNG', desc: 'Tình cảm thành kính thiêng liêng với Bác Hồ', icon: 'book', color: '#059669' },
                    'node-8': { title: 'CHIẾC LƯỢC NGÀ & LẶNG LẼ SA PA', desc: 'Tình cha con sâu nặng và vẻ đẹp lao động thầm lặng', icon: 'book', color: '#059669' }
                },
                quizzes: [
                    { q: 'Tác giả của bài thơ "Đồng chí" viết về tình đồng đội người lính thời kháng chiến chống Pháp là ai?', opts: ['Chính Hữu', 'Phạm Tiến Duật', 'Quang Dũng', 'Huy Cận'], correct: 'A', exp: 'Bài thơ Đồng chí được nhà thơ Chính Hữu sáng tác năm 1948.' }
                ],
                flashcards: [
                    { id: 1, text: 'Truyện Kiều', matchText: 'Kiệt tác văn học trung đại của Đại thi hào Nguyễn Du' },
                    { id: 2, text: 'Bài thơ Đồng chí', matchText: 'Tác giả Chính Hữu - Ca ngợi tình đồng đội sâu sắc' },
                    { id: 3, text: 'Bài thơ về tiểu đội xe không kính', matchText: 'Tác giả Phạm Tiến Duật - Khắc họa người lính lái xe dũng cảm' },
                    { id: 4, text: 'Lặng lẽ Sa Pa', matchText: 'Tác giả Nguyễn Thành Long - Ca ngợi người lao động thầm lặng' },
                    { id: 5, text: 'Chiếc lược ngà', matchText: 'Tác giả Nguyễn Quang Sáng - Tình phụ tử cảm động thời chiến' },
                    { id: 6, text: 'Mùa xuân nho nhỏ', matchText: 'Tác giả Thanh Hải - Khát vọng cống hiến thanh xuân cho quê hương' }
                ]
            }
        }
    },

    // ==========================================
    // CẤP 3 - THPT (LỚP 10 ĐẾN LỚP 12)
    // ==========================================
    lop12: {
        name: 'Khối Lớp 12 (Ôn thi Tốt nghiệp THPT & Đại học)',
        subjects: {
            toan: {
                name: 'Môn Toán lớp 12 (Ôn thi THPT Quốc Gia)',
                color: '#2563EB',
                icon: 'cube',
                nodes: {
                    'node-1': { title: 'TOÁN LỚP 12 - ÔN THI ĐẠI HỌC', desc: 'Hàm số, Mũ - Logarit, Tích phân & Hình Oxyz', icon: 'cube', color: '#2563EB' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 12A1', icon: 'grad', color: '#2563EB' },
                    'node-3': { title: 'ỨNG DỤNG ĐẠO HÀM KHẢO SÁT HÀM SỐ', desc: 'Đơn điệu, cực trị, tiệm cận và min max hàm số', icon: 'book', color: '#2563EB' },
                    'node-4': { title: 'TRÒ CHƠI TÍNH NHẨM ĐẠO HÀM & TÍCH PHÂN', desc: 'Bấm máy tính Casio & công thức giải nhanh', icon: 'gamepad', color: '#2563EB' },
                    'node-5': { title: 'ĐỀ THI THỬ TỐT NGHIỆP THPT TOÁN', desc: '50 câu trắc nghiệm chuẩn ma trận Bộ GD&ĐT', icon: 'quiz', color: '#2563EB' },
                    'node-6': { title: 'HÀM SỐ MŨ & LOGARIT', desc: 'Phương trình, bất phương trình mũ và logarit', icon: 'cube', color: '#2563EB' },
                    'node-7': { title: 'NGUYÊN HÀM & TÍCH PHÂN', desc: 'Tính diện tích hình phẳng và thể tích khối tròn xoay', icon: 'cube', color: '#2563EB' },
                    'node-8': { title: 'HÌNH HỌC TỌA ĐỘ OXYZ', desc: 'Mặt phẳng, đường thẳng, mặt cầu trong không gian', icon: 'cube', color: '#2563EB' }
                },
                quizzes: [
                    { q: 'Đạo hàm của hàm số y = ln(x) (với x > 0) là:', opts: ['1/x', 'e^x', 'x', '1/(x^2)'], correct: 'A', exp: 'Đạo hàm (ln x)\' = 1/x.' },
                    { q: 'Nguyên hàm của hàm số f(x) = e^x là:', opts: ['e^x + C', 'x.e^x + C', 'e^(x+1) + C', 'ln(x) + C'], correct: 'A', exp: '∫ e^x dx = e^x + C.' },
                    { q: 'Trong không gian Oxyz, vectơ pháp tuyến của mặt phẳng (P): 2x - 3y + z - 5 = 0 là:', opts: ['(2; -3; 1)', '(2; 3; 1)', '(2; -3; -5)', '(-3; 1; -5)'], correct: 'A', exp: 'Vectơ pháp tuyến n = (A, B, C) = (2; -3; 1).' }
                ],
                flashcards: [
                    { id: 1, text: 'Đạo hàm y = x^n', matchText: 'y\' = n . x^(n-1)' },
                    { id: 2, text: 'Tích phân từng phần', matchText: '∫ u dv = u.v - ∫ v du' },
                    { id: 3, text: 'Phương trình mặt cầu Oxyz', matchText: '(x-a)^2 + (y-b)^2 + (z-c)^2 = R^2' },
                    { id: 4, text: 'Công thức logarit', matchText: 'log_a(b.c) = log_a(b) + log_a(c)' },
                    { id: 5, text: 'Thể tích khối tròn xoay', matchText: 'V = π ∫ [f(x)]^2 dx' },
                    { id: 6, text: 'Điểm cực trị hàm số', matchText: 'Điểm làm cho đạo hàm f\'(x) đổi dấu' }
                ]
            },
            tiengviet: {
                name: 'Môn Ngữ văn lớp 12 (Ôn thi THPT Quốc Gia)',
                color: '#059669',
                icon: 'book',
                nodes: {
                    'node-1': { title: 'NGỮ VĂN LỚP 12 - TÁC PHẨM KINH ĐIỂN', desc: 'Văn học hiện đại Việt Nam 1945 - 2000', icon: 'book', color: '#059669' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 12A1', icon: 'grad', color: '#059669' },
                    'node-3': { title: 'BÀI THƠ TÂY TIẾN - QUANG DŨNG', desc: 'Bức tranh thiên nhiên Tây Bắc & người lính hào hoa', icon: 'book', color: '#059669' },
                    'node-4': { title: 'TRÒ CHƠI NGHỊ LUẬN XÃ HỘI', desc: 'Rèn luyện kỹ năng viết đoạn văn 200 chữ', icon: 'gamepad', color: '#059669' },
                    'node-5': { title: 'ĐỀ THI THỬ TỐT NGHIỆP NGỮ VĂN', desc: 'Cấu trúc đề Đọc hiểu, NLXH & NLVH', icon: 'quiz', color: '#059669' },
                    'node-6': { title: 'BÀI THƠ VIỆT BẮC - TỐ HỮU', desc: 'Khúc ca ân tình cách mạng & thủ đô kháng chiến', icon: 'book', color: '#059669' },
                    'node-7': { title: 'ĐẤT NƯỚC - NGUYỄN KHOA ĐIỀM', desc: 'Tư tưởng Đất Nước của Nhân Dân', icon: 'book', color: '#059669' },
                    'node-8': { title: 'NGƯỜI LÁI ĐÒ SÔNG ĐÀ & VỢ CHỒNG A PHỦ', desc: 'Vẻ đẹp sông Đà hùng vĩ và sức sống Tây Bắc', icon: 'book', color: '#059669' }
                },
                quizzes: [
                    { q: 'Tác giả của bài thơ "Tây Tiến" là nhà thơ nào?', opts: ['Quang Dũng', 'Tố Hữu', 'Nguyễn Khoa Điềm', 'Xuân Quỳnh'], correct: 'A', exp: 'Bài thơ Tây Tiến được Quang Dũng sáng tác năm 1948 tại Phù Lưu Chanh.' },
                    { q: 'Hình tượng người lái đò trong tác phẩm "Người lái đò Sông Đà" của Nguyễn Tuân được ví như một gì?', opts: ['Một nghệ sĩ chèo đò tài hoa', 'Một chiến binh quả cảm', 'Một người lao động cần cù', 'Một bậc tiền bối'], correct: 'A', exp: 'Nguyễn Tuân ngợi ca người lái đò như một người nghệ sĩ tài hoa trên sóng thác.' }
                ],
                flashcards: [
                    { id: 1, text: 'Tây Tiến - Quang Dũng', matchText: 'Vẻ đẹp bi tráng hào hoa của đoàn quân Tây Tiến' },
                    { id: 2, text: 'Việt Bắc - Tố Hữu', matchText: 'Khúc tráng ca ân tình thủy chung cách mạng' },
                    { id: 3, text: 'Đất Nước - Nguyễn Khoa Điềm', matchText: 'Đất Nước của ca dao thần thoại, của Nhân Dân' },
                    { id: 4, text: 'Sóng - Xuân Quỳnh', matchText: 'Khát vọng tình yêu vĩnh hằng và thủy chung' },
                    { id: 5, text: 'Vợ chồng A Phủ - Tô Hoài', matchText: 'Sức sống tiềm tàng và khát vọng tự do của Mị' },
                    { id: 6, text: 'Vợ nhặt - Kim Lân', matchText: 'Vẻ đẹp tình người và niềm tin vào tương lai giữa nạn đói 1945' }
                ]
            },
            khoahoc: {
                name: 'Môn Vật lý lớp 12 (Ôn thi THPT Quốc Gia)',
                color: '#E11D48',
                icon: 'cube',
                nodes: {
                    'node-1': { title: 'VẬT LÝ LỚP 12 - LUYỆN THI ĐẠI HỌC', desc: 'Dao động cơ, Sóng cơ, Dòng điện xoay chiều & Lượng tử', icon: 'cube', color: '#E11D48' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 12A1', icon: 'grad', color: '#E11D48' },
                    'node-3': { title: 'DAO ĐỘNG ĐIỀU HÒA & CON LẮC', desc: 'Phương trình dao động x = A.cos(ωt + φ)', icon: 'book', color: '#E11D48' },
                    'node-4': { title: 'TRÒ CHƠI MẠCH ĐIỆN XOAY CHIỀU RLC', desc: 'Tính tổng trở Z và hiện tượng cộng hưởng điện', icon: 'gamepad', color: '#E11D48' },
                    'node-5': { title: 'ĐỀ THI THỬ VẬT LÝ TỐT NGHIỆP', desc: '40 câu trắc nghiệm Vật lý chuẩn Bộ GD&ĐT', icon: 'quiz', color: '#E11D48' },
                    'node-6': { title: 'SÓNG CƠ & GIAO THOA SÓNG', desc: 'Phương trình sóng, cực đại cực tiểu giao thoa', icon: 'cube', color: '#E11D48' },
                    'node-7': { title: 'SÓNG ÁNH SÁNG & TÁN SẮC', desc: 'Thí nghiệm Young, bước sóng và quang phổ', icon: 'cube', color: '#E11D48' },
                    'node-8': { title: 'LƯỢNG TỬ ÁNH SÁNG & VẬT LÝ HẠT NHÂN', desc: 'Hiện tượng quang điện và phản ứng phân hạch', icon: 'cube', color: '#E11D48' }
                },
                quizzes: [
                    { q: 'Chu kỳ dao động của con lắc lò xo có khối lượng m và độ cứng k là:', opts: ['T = 2π √(m/k)', 'T = 2π √(k/m)', 'T = 2π √(g/l)', 'T = √(m/k) / 2π'], correct: 'A', exp: 'Chu kỳ con lắc lò xo T = 2π √(m/k).' },
                    { q: 'Hiện tượng cộng hưởng điện trong mạch RLC xảy ra khi nào?', opts: ['ZL = ZC (ωL = 1/ωC)', 'ZL > ZC', 'R = ZL', 'ZC = 0'], correct: 'A', exp: 'Cộng hưởng điện xảy ra khi ZL = ZC hay ω = 1/√(LC).' }
                ],
                flashcards: [
                    { id: 1, text: 'Phương trình x = A cos(ωt + φ)', matchText: 'Li độ dao động điều hòa' },
                    { id: 2, text: 'Vận tốc cực đại', matchText: 'v_max = ω.A (khi qua VTCB)' },
                    { id: 3, text: 'Gia tốc cực đại', matchText: 'a_max = ω^2.A (khi ở biên)' },
                    { id: 4, text: 'Bước sóng (λ)', matchText: 'λ = v . T = v / f' },
                    { id: 5, text: 'Khoảng vân Young (i)', matchText: 'i = λ.D / a' },
                    { id: 6, text: 'Năng lượng photon (E)', matchText: 'E = h.f = h.c / λ' }
                ]
            },
            hoahoc: {
                name: 'Môn Hóa học lớp 12 (Ôn thi THPT Quốc Gia)',
                color: '#0891B2',
                icon: 'flask',
                nodes: {
                    'node-1': { title: 'HÓA HỌC LỚP 12 - TRỌNG TÂM', desc: 'Este - Lipit, Cacbohiđrat, Amin & Kim loại', icon: 'flask', color: '#0891B2' },
                    'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 12A1', icon: 'grad', color: '#0891B2' },
                    'node-3': { title: 'ESTE & CHẤT BÉO (LIPIT)', desc: 'Phản ứng xà phòng hóa & thủy phân este', icon: 'book', color: '#0891B2' },
                    'node-4': { title: 'TRÒ CHƠI PHẢN ỨNG TRÁNG GƯƠNG', desc: 'Nhận biết Glucozơ, Fructozơ, Saccarozơ', icon: 'gamepad', color: '#0891B2' },
                    'node-5': { title: 'ĐỀ THI THỬ HÓA HỌC 12', desc: '40 câu trắc nghiệm Hóa học lý thuyết & bài tập', icon: 'quiz', color: '#0891B2' },
                    'node-6': { title: 'AMIN, AMINO AXIT & PEPTIT', desc: 'Tính chất lưỡng tính của amino axit & protein', icon: 'flask', color: '#0891B2' },
                    'node-7': { title: 'POLIME & VẬT LIỆU POLIME', desc: 'Tơ nilon-6,6, cao su buna, chất dẻo PE/PVC', icon: 'flask', color: '#0891B2' },
                    'node-8': { title: 'ĐẠI CƯƠNG KIM LOẠI & SẮT/CROM', desc: 'Dãy điện hóa kim loại & phản ứng nhiệt nhôm', icon: 'flask', color: '#0891B2' }
                },
                quizzes: [
                    { q: 'Chất nào sau đây có phản ứng TRÁNG BẠC (tráng gương)?', opts: ['Glucozơ', 'Saccarozơ', 'Tinh bột', 'Xenlulozơ'], correct: 'A', exp: 'Glucozơ có nhóm chức andehit -CHO nên có phản ứng tráng bạc với AgNO3/NH3.' },
                    { q: 'Công thức phân tử của Etyl axetat là:', opts: ['CH3COOC2H5', 'HCOOCH3', 'CH3COOH', 'C2H5OH'], correct: 'A', exp: 'Etyl axetat có công thức CH3COOC2H5 mang mùi thơm táo chín.' }
                ],
                flashcards: [
                    { id: 1, text: 'Glucozơ', matchText: 'C6H12O6 (Đường nho, có phản ứng tráng gương)' },
                    { id: 2, text: 'Este', matchText: 'RCOOR\' (Tạo thành từ axit cacboxylic và ancol)' },
                    { id: 3, text: 'Phản ứng xà phòng hóa', matchText: 'Thủy phân chất béo trong dung dịch kiềm NaOH' },
                    { id: 4, text: 'Amino axit', matchText: 'Hợp chất hữu cơ tạp chức chứa -NH2 và -COOH' },
                    { id: 5, text: 'Kim loại dẫn điện tốt nhất', matchText: 'Bạc (Ag) > Đồng (Cu) > Vàng (Au) > Nhôm (Al)' },
                    { id: 6, text: 'Dãy điện hóa kim loại', matchText: 'K Na Ca Mg Al Zn Fe Ni Sn Pb H Cu Hg Ag Pt Au' }
                ]
            }
        }
    }
};
