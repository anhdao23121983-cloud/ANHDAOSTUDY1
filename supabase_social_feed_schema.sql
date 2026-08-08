-- ==============================================================================
-- BẢNG DỮ LIỆU BẢNG TIN LỚP HỌC (CLASS SOCIAL FEED & COMMENTS) TRÊN SUPABASE
-- ==============================================================================

-- 1. Bảng class_posts: Lưu trữ các bài đăng, thông báo của giáo viên và bài thảo luận
CREATE TABLE IF NOT EXISTS public.class_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name VARCHAR(100) NOT NULL,
    author_username VARCHAR(50) NOT NULL,
    author_avatar TEXT,
    author_role VARCHAR(20) DEFAULT 'teacher',
    classroom VARCHAR(30) DEFAULT '5A',
    content TEXT NOT NULL,
    badge_tag VARCHAR(50) DEFAULT '📢 Thông báo',
    likes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bảng post_comments: Lưu trữ các bình luận, phản hồi của học sinh
CREATE TABLE IF NOT EXISTS public.post_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.class_posts(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_username VARCHAR(50) NOT NULL,
    author_avatar TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tạo chỉ mục tối ưu truy vấn thời gian thực
CREATE INDEX IF NOT EXISTS idx_class_posts_classroom ON public.class_posts(classroom);
CREATE INDEX IF NOT EXISTS idx_class_posts_created ON public.class_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_comments_post ON public.post_comments(post_id);

-- 4. Kích hoạt Row Level Security (RLS) & Quyền truy cập
ALTER TABLE public.class_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all class_posts" ON public.class_posts FOR ALL USING (true);
CREATE POLICY "Allow public all post_comments" ON public.post_comments FOR ALL USING (true);

-- 5. Nạp sẵn các bài đăng mẫu đầu tiên của Cô giáo và học sinh
INSERT INTO public.class_posts (author_name, author_username, author_avatar, author_role, classroom, content, badge_tag, likes_count)
VALUES 
(
    'Cô Giáo Anh Đào',
    'giaovien',
    'https://img.icons8.com/color/96/teacher.png',
    'teacher',
    '5A',
    'Chào các em học sinh lớp 5A thân yêu! 🌟 Hôm nay lớp chúng mình đã hoàn thành rất tốt bài học Tin học về các thiết bị máy tính và thực hành trắc nghiệm trực tuyến. Các em hãy làm bài luyện tập và ghi âm giọng đọc bài nhé!',
    '📢 Thông báo',
    18
),
(
    'Đào Thùy Anh',
    'hocsinh5a',
    'https://img.icons8.com/color/96/student-male.png',
    'student',
    '5A',
    'Em vừa hoàn thành bài thi trắc nghiệm Quiz môn Tin học đạt 100 điểm tuyệt đối ạ! Cảm ơn Cô giáo vì sơ đồ tư duy rất sinh động và dễ nhớ! 🎉',
    '🏆 Khen thưởng',
    12
);
