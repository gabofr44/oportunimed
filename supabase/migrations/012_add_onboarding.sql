-- Add onboarding fields to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS interests TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS goals TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_complete BOOLEAN DEFAULT false;
