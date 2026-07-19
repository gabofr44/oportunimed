-- Migration: Add course-specific columns for the new course catalog
-- ============================================

-- Add course-level (difficulty)
ALTER TABLE opportunities 
ADD COLUMN IF NOT EXISTS course_level TEXT DEFAULT NULL;

-- Add course duration
ALTER TABLE opportunities 
ADD COLUMN IF NOT EXISTS course_duration TEXT DEFAULT NULL;

-- Add course subject (ClassCentral subject taxonomy)
ALTER TABLE opportunities 
ADD COLUMN IF NOT EXISTS course_subject TEXT DEFAULT NULL;

-- Add course language
ALTER TABLE opportunities 
ADD COLUMN IF NOT EXISTS course_language TEXT DEFAULT NULL;

-- Add indexes for filtering
CREATE INDEX IF NOT EXISTS idx_opportunities_course_level ON opportunities(course_level);
CREATE INDEX IF NOT EXISTS idx_opportunities_course_subject ON opportunities(course_subject);
CREATE INDEX IF NOT EXISTS idx_opportunities_course_language ON opportunities(course_language);

COMMENT ON COLUMN opportunities.course_level IS 'Difficulty: beginner, intermediate, advanced';
COMMENT ON COLUMN opportunities.course_duration IS 'Course length (e.g., 6 weeks, 2-4 hours/week)';
COMMENT ON COLUMN opportunities.course_subject IS 'Subject category: Health & Wellness, STEM, Technology, People & Society, Personal Growth, Business, Language';
COMMENT ON COLUMN opportunities.course_language IS 'Course language: en, es';
