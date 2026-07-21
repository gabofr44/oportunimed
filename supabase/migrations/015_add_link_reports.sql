-- Reportes de links rotos: cualquiera puede reportar (incluso sin cuenta),
-- solo administradores pueden verlos
CREATE TABLE link_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  note TEXT,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE link_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can report a broken link" ON link_reports
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view link reports" ON link_reports
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Admins can update link reports" ON link_reports
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE INDEX idx_link_reports_opportunity ON link_reports(opportunity_id);