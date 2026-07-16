-- Site content table for editable pages
CREATE TABLE site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  section TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read, no public write (admin only via server)
CREATE POLICY "Site content viewable by everyone" ON site_content FOR SELECT USING (true);

INSERT INTO site_content (key, value, section) VALUES
  ('hero_headline', 'Your Global Research & Scholarship Journey Starts Here.', 'hero'),
  ('hero_subheadline', 'Find prestigious programs, funding, and academic experiences worldwide to enrich your CV.', 'hero'),
  ('hero_cta_1', 'Explore Opportunities', 'hero'),
  ('hero_cta_2', 'How to Apply', 'hero'),
  ('hero_search_placeholder', 'Search by destination, program...', 'hero'),
  ('about_title', 'About Oportunimed', 'about'),
  ('about_text', 'Oportunimed connects students worldwide with research opportunities, scholarships, and academic programs.', 'about');

CREATE TRIGGER trigger_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
