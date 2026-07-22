-- Migration: Add educational_level and educational_field to opportunities
-- Run this in Supabase SQL Editor

-- Add educational_level column
ALTER TABLE opportunities 
ADD COLUMN IF NOT EXISTS educational_level TEXT DEFAULT 'universidad';

-- Add educational_field column  
ALTER TABLE opportunities 
ADD COLUMN IF NOT EXISTS educational_field TEXT DEFAULT 'general';

-- Add index for filtering
CREATE INDEX IF NOT EXISTS idx_opportunities_educational_level ON opportunities(educational_level);
CREATE INDEX IF NOT EXISTS idx_opportunities_educational_field ON opportunities(educational_field);

-- Update comment
COMMENT ON COLUMN opportunities.educational_level IS 'Level: secundaria, preparatoria, universidad, posgrado, profesional';
COMMENT ON COLUMN opportunities.educational_field IS 'Field: ciencias_salud, administracion, ingenieria, ciencias, humanidades, tecnologia, derecho, educacion, artes, general';
