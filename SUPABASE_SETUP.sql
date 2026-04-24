-- Ikigai LLP Supabase Schema

-- 1. Programs Table
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    title_hi TEXT,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT DEFAULT '📚',
    tagline TEXT,
    tagline_hi TEXT,
    description TEXT,
    description_hi TEXT,
    content TEXT,
    content_hi TEXT,
    overview TEXT,
    overview_hi TEXT,
    cover_image TEXT,
    color TEXT DEFAULT '#e84c1e',
    duration TEXT,
    format TEXT,
    suitable_for TEXT,
    suitable_for_hi TEXT,
    status TEXT DEFAULT 'draft',
    sort_order INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    title_hi TEXT,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT DEFAULT '💻',
    category TEXT,
    tagline TEXT,
    tagline_hi TEXT,
    description TEXT,
    description_hi TEXT,
    content TEXT,
    content_hi TEXT,
    overview TEXT,
    overview_hi TEXT,
    cover_image TEXT,
    color TEXT DEFAULT '#1e7a78',
    duration TEXT,
    mode TEXT,
    batch_size TEXT,
    certificate TEXT,
    who_is_it_for JSONB DEFAULT '[]'::jsonb, -- Array of strings
    who_is_it_for_hi JSONB DEFAULT '[]'::jsonb, -- Array of strings
    achievements JSONB DEFAULT '[]'::jsonb,  -- Array of strings
    achievements_hi JSONB DEFAULT '[]'::jsonb,  -- Array of strings
    modules JSONB DEFAULT '[]'::jsonb,       -- Array of objects {num, title, desc}
    modules_hi JSONB DEFAULT '[]'::jsonb,    -- Array of objects {num, title, desc}
    status TEXT DEFAULT 'draft',
    sort_order INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT
);

-- 3. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    role TEXT,
    role_hi TEXT,
    bio TEXT,
    bio_hi TEXT,
    photo TEXT,
    linkedin TEXT,
    status TEXT DEFAULT 'active',
    sort_order INTEGER DEFAULT 0
);

-- 4. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    role TEXT,
    role_hi TEXT,
    text TEXT NOT NULL,
    text_hi TEXT,
    photo TEXT,
    rating INTEGER DEFAULT 5,
    page_context TEXT DEFAULT 'all', -- 'home', 'programs', 'all'
    status TEXT DEFAULT 'active',
    sort_order INTEGER DEFAULT 0
);

-- 5. Updates Table (Blog/News)
CREATE TABLE IF NOT EXISTS public.updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    title_hi TEXT,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    excerpt_hi TEXT,
    content TEXT,
    content_hi TEXT,
    category TEXT DEFAULT 'News',
    cover_image TEXT,
    published_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'draft',
    meta_title TEXT,
    meta_description TEXT
);

-- 6. Contact Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT,
    type TEXT DEFAULT 'general', -- 'general', 'program_enquiry', 'course_enquiry'
    program_interest TEXT,
    status TEXT DEFAULT 'new' -- 'new', 'read', 'responded'
);

-- 7. Azure900 Enrollments Table
CREATE TABLE IF NOT EXISTS public.azure900_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    age INTEGER,
    college TEXT,
    department TEXT,
    language TEXT,
    status TEXT DEFAULT 'new'
);

-- RLS POLICIES
-- Enable RLS on all tables
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.azure900_enrollments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active content
DROP POLICY IF EXISTS "Public Read Programs" ON public.programs;
CREATE POLICY "Public Read Programs" ON public.programs FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Public Read Courses" ON public.courses;
CREATE POLICY "Public Read Courses" ON public.courses FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Public Read Team" ON public.team_members;
CREATE POLICY "Public Read Team" ON public.team_members FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Public Read Testimonials" ON public.testimonials;
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Public Read Updates" ON public.updates;
CREATE POLICY "Public Read Updates" ON public.updates FOR SELECT USING (status = 'published');

-- Allow public insert access to submission tables
DROP POLICY IF EXISTS "Public Insert Enquiries" ON public.contact_submissions;
CREATE POLICY "Public Insert Enquiries" ON public.contact_submissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Insert Azure Enrollments" ON public.azure900_enrollments;
CREATE POLICY "Public Insert Azure Enrollments" ON public.azure900_enrollments FOR INSERT WITH CHECK (true);

-- Allow authenticated admins full access
CREATE POLICY "Admin Full Access Programs" ON public.programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Courses" ON public.courses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Team" ON public.team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Updates" ON public.updates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Enquiries" ON public.contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Azure" ON public.azure900_enrollments FOR ALL USING (auth.role() = 'authenticated');

