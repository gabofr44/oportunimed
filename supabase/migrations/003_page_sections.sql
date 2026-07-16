-- Page sections: structured content for each page
CREATE TABLE page_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page TEXT NOT NULL DEFAULT 'home',
  section_key TEXT NOT NULL,
  title TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  sort_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page, section_key)
);

ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Page sections viewable by everyone" ON page_sections FOR SELECT USING (true);

CREATE TRIGGER trigger_page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed: Home page sections
INSERT INTO page_sections (page, section_key, title, content, sort_order) VALUES
('home', 'hero', 'Hero Section', '{
  "headline": "Your Global Research & Scholarship Journey Starts Here.",
  "subheadline": "Find prestigious programs, funding, and academic experiences worldwide to enrich your CV.",
  "search_placeholder": "Search by destination, program...",
  "cta_1_text": "Explore Opportunities",
  "cta_1_link": "/opportunities",
  "cta_2_text": "How to Apply",
  "cta_2_link": "/how-to-apply"
}', 1),

('home', 'categories', 'Categories Section', '{
  "title": "Categories",
  "subtitle": "Discover opportunities that match your academic goals",
  "items": [
    {"label": "Scholarships", "description": "Full & Partial Funding", "icon": "🎓"},
    {"label": "Research Programs", "description": "STEM & Humanities Research", "icon": "🔬"},
    {"label": "Internships", "description": "Professional Placements Abroad", "icon": "💼"},
    {"label": "Language & Summer", "description": "Short-term Study Abroad", "icon": "📖"}
  ]
}', 2),

('home', 'featured', 'Featured Section', '{
  "title": "Featured Opportunities",
  "subtitle": "Hand-picked programs to jumpstart your academic career"
}', 3),

('home', 'footer', 'Footer', '{
  "tagline": "Empowering students to find research and scholarship opportunities worldwide.",
  "copyright": "Oportunimed"
}', 4);
