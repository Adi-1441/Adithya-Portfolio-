-- ==============================================================================
-- SUPABASE STORAGE CONFIGURATION & POLICIES
-- Buckets: 'portfolio-media' (Images & Videos), 'resumes' (PDF Resumes)
-- ==============================================================================

-- 1. Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('portfolio-media', 'portfolio-media', true, 104857600, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime', 'application/pdf']),
  ('resumes', 'resumes', true, 20971520, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Policies for 'portfolio-media'
CREATE POLICY "Public Read Portfolio Media"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin Insert Portfolio Media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "Admin Update Portfolio Media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin Delete Portfolio Media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-media');

-- 3. Storage Policies for 'resumes'
CREATE POLICY "Public Read Resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'resumes');

CREATE POLICY "Admin Insert Resumes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admin Update Resumes"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'resumes');

CREATE POLICY "Admin Delete Resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resumes');
