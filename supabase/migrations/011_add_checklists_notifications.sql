-- Add educational_level and educational_field to profiles for recommendations
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS educational_level TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS educational_field TEXT;

-- Checklists table
CREATE TABLE IF NOT EXISTS checklists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE NOT NULL,
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

ALTER TABLE checklists ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage own checklists' AND tablename = 'checklists') THEN
    CREATE POLICY "Users can manage own checklists" ON checklists FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

-- Notification preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  types TEXT[] DEFAULT '{}',
  fields TEXT[] DEFAULT '{}',
  levels TEXT[] DEFAULT '{}',
  frequency TEXT DEFAULT 'daily',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage own notification preferences' AND tablename = 'notification_preferences') THEN
    CREATE POLICY "Users can manage own notification preferences" ON notification_preferences FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

-- Notifications log
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'new_opportunity',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own notifications' AND tablename = 'notifications') THEN
    CREATE POLICY "Users can read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own notifications' AND tablename = 'notifications') THEN
    CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;
