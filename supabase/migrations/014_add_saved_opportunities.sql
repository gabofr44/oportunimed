-- Favoritos: permite a los usuarios guardar oportunidades para revisar despues
CREATE TABLE saved_opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

ALTER TABLE saved_opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved opportunities" ON saved_opportunities
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save opportunities" ON saved_opportunities
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave opportunities" ON saved_opportunities
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_saved_opportunities_user ON saved_opportunities(user_id);
CREATE INDEX idx_saved_opportunities_opportunity ON saved_opportunities(opportunity_id);