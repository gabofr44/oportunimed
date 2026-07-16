-- ============================================
-- Page Sections: ALL editable content
-- ============================================

-- Drop and recreate to ensure clean state
DROP TABLE IF EXISTS page_sections CASCADE;

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
CREATE POLICY "Authenticated users can insert sections" ON page_sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update sections" ON page_sections FOR UPDATE USING (true);
CREATE POLICY "Authenticated users can delete sections" ON page_sections FOR DELETE USING (true);

CREATE TRIGGER trigger_page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- HOME PAGE
-- ============================================
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

('home', 'stats', 'Stats Section', '{
  "title": "Global Reach",
  "subtitle": "Numbers that speak for themselves",
  "items": [
    {"label": "Programs Listed", "value": "500+", "icon": "📚"},
    {"label": "Countries", "value": "50+", "icon": "🌍"},
    {"label": "Students Helped", "value": "10,000+", "icon": "🎓"},
    {"label": "Partner Institutions", "value": "200+", "icon": "🏛️"}
  ]
}', 4),

('home', 'cta', 'Call to Action', '{
  "title": "Ready to Start Your Journey?",
  "subtitle": "Join thousands of students who found their global pathway.",
  "button_text": "Get Started",
  "button_link": "/opportunities"
}', 5),

-- ============================================
-- HEADER (site-wide)
-- ============================================
('header', 'header', 'Header & Navigation', '{
  "site_name": "Oportunimed",
  "logo_text": "GP",
  "nav_items": [
    {"label": "Home", "href": "/"},
    {"label": "Opportunities", "href": "/opportunities"},
    {"label": "Destinations", "href": "/destinations"},
    {"label": "Scholarships", "href": "/opportunities?type=scholarship"},
    {"label": "Stories", "href": "/stories"},
    {"label": "Blog", "href": "/blog"}
  ]
}', 1),

-- ============================================
-- FOOTER (site-wide)
-- ============================================
('footer', 'footer', 'Footer', '{
  "site_name": "Oportunimed",
  "logo_text": "GP",
  "tagline": "Empowering students to find research and scholarship opportunities worldwide.",
  "copyright": "Oportunimed",
  "explore_links": [
    {"label": "Opportunities", "href": "/opportunities"},
    {"label": "Scholarships", "href": "/opportunities?type=scholarship"},
    {"label": "Destinations", "href": "/destinations"}
  ],
  "resource_links": [
    {"label": "Blog", "href": "/blog"},
    {"label": "Stories", "href": "/stories"},
    {"label": "How to Apply", "href": "/how-to-apply"}
  ],
  "legal_links": [
    {"label": "Privacy Policy", "href": "/privacy"},
    {"label": "Terms of Service", "href": "/terms"}
  ]
}', 1),

-- ============================================
-- HOW TO APPLY PAGE
-- ============================================
('how-to-apply', 'hero', 'How to Apply Hero', '{
  "title": "How to Apply",
  "subtitle": "A step-by-step guide to securing your international opportunity"
}', 1),

('how-to-apply', 'steps', 'Application Steps', '{
  "title": "Steps",
  "items": [
    {
      "number": "01",
      "title": "Research & Discover",
      "description": "Browse our curated database of opportunities. Use filters to find programs that match your field, level, and interests.",
      "icon": "🔍",
      "details": [
        "Search by country, type, or keyword",
        "Filter by funding availability",
        "Read detailed program descriptions",
        "Save opportunities to your shortlist"
      ]
    },
    {
      "number": "02",
      "title": "Prepare Documents",
      "description": "Most programs require similar documents. Start preparing them early to avoid last-minute stress.",
      "icon": "📄",
      "details": [
        "Statement of Purpose (SOP)",
        "Letters of Recommendation",
        "CV / Resume",
        "Academic Transcripts",
        "Language Proficiency (IELTS/TOEFL)",
        "Research Proposal (for research programs)"
      ]
    },
    {
      "number": "03",
      "title": "Write a Strong SOP",
      "description": "Your Statement of Purpose is your chance to stand out. Make it personal, specific, and compelling.",
      "icon": "✍️",
      "details": [
        "Start with a hook that grabs attention",
        "Explain why this specific program",
        "Highlight relevant experience",
        "Show your future goals",
        "Proofread multiple times"
      ]
    },
    {
      "number": "04",
      "title": "Submit Application",
      "description": "Follow the application instructions carefully. Most programs have online portals.",
      "icon": "📤",
      "details": [
        "Create an account on the portal",
        "Fill in all required fields",
        "Upload documents in correct format",
        "Double-check everything before submitting",
        "Note the deadline and submit early"
      ]
    },
    {
      "number": "05",
      "title": "Follow Up",
      "description": "After submitting, keep track of your applications and follow up if needed.",
      "icon": "📋",
      "details": [
        "Track application status on your dashboard",
        "Respond to any requests for additional info",
        "Prepare for interviews if required",
        "Accept offers before the deadline"
      ]
    }
  ]
}', 2),

('how-to-apply', 'tips', 'Pro Tips', '{
  "title": "Pro Tips for a Successful Application",
  "items": [
    {
      "title": "Apply to Multiple Programs",
      "description": "Don''t put all your eggs in one basket. Apply to at least 3-5 programs to increase your chances."
    },
    {
      "title": "Start Early",
      "description": "Begin preparing at least 3-6 months before the deadline. Rushed applications are rarely successful."
    },
    {
      "title": "Get Feedback",
      "description": "Have mentors, professors, or peers review your SOP and application materials."
    },
    {
      "title": "Be Authentic",
      "description": "Admissions committees can spot generic applications. Be genuine about your interests and goals."
    }
  ]
}', 3),

('how-to-apply', 'cta', 'Call to Action', '{
  "title": "Ready to Start?",
  "subtitle": "Browse opportunities and take the first step toward your global journey.",
  "button_1_text": "Explore Opportunities",
  "button_1_link": "/opportunities",
  "button_2_text": "Read More Guides",
  "button_2_link": "/blog"
}', 4),

-- ============================================
-- BLOG PAGE
-- ============================================
('blog', 'hero', 'Blog Hero', '{
  "title": "The Oportunimed Blog",
  "subtitle": "Tips, guides, and insights for your international academic journey"
}', 1),

('blog', 'posts', 'Blog Posts', '{
  "items": [
    {
      "slug": "how-to-write-winning-sop",
      "title": "How to Write a Winning Statement of Purpose",
      "excerpt": "Your SOP is your chance to stand out. Learn the structure, tone, and key elements that make admissions committees take notice.",
      "category": "Application Tips",
      "date": "2026-07-10",
      "readTime": "8 min read"
    },
    {
      "slug": "top-scholarships-2026",
      "title": "Top 10 Scholarships for International Students in 2026",
      "excerpt": "From Fulbright to Erasmus Mundus, discover the most generous scholarship programs open for applications this year.",
      "category": "Scholarships",
      "date": "2026-07-05",
      "readTime": "12 min read"
    },
    {
      "slug": "research-abroad-guide",
      "title": "The Complete Guide to Research Abroad",
      "excerpt": "Everything you need to know about finding research positions, contacting professors, and securing funding overseas.",
      "category": "Research",
      "date": "2026-06-28",
      "readTime": "15 min read"
    },
    {
      "slug": "cost-of-living-comparison",
      "title": "Cost of Living: Comparing Study Destinations",
      "excerpt": "A data-driven comparison of living costs across top study destinations to help you budget your international experience.",
      "category": "Planning",
      "date": "2026-06-20",
      "readTime": "10 min read"
    },
    {
      "slug": "visa-application-tips",
      "title": "Visa Application Tips: Avoid Common Mistakes",
      "excerpt": "Navigate the visa application process with confidence. Learn from common mistakes and how to prepare a strong application.",
      "category": "Visa & Legal",
      "date": "2026-06-15",
      "readTime": "7 min read"
    },
    {
      "slug": "networking-academic-conferences",
      "title": "Networking at Academic Conferences: A Student Guide",
      "excerpt": "How to make the most of academic conferences, build your network, and open doors for future collaborations.",
      "category": "Career Development",
      "date": "2026-06-10",
      "readTime": "6 min read"
    }
  ]
}', 2),

-- ============================================
-- STORIES PAGE
-- ============================================
('stories', 'hero', 'Stories Hero', '{
  "title": "Student Stories",
  "subtitle": "Real experiences from students who found their global pathway"
}', 1),

('stories', 'stories', 'Student Stories', '{
  "items": [
    {
      "name": "Maria Rodriguez",
      "country": "Spain",
      "destination": "Germany",
      "program": "DAAD Research Grant",
      "quote": "Oportunimed helped me discover the DAAD program. I never knew such opportunities existed for computational neuroscience research in Berlin.",
      "year": "2025",
      "avatar": "👩‍🔬"
    },
    {
      "name": "James Chen",
      "country": "Canada",
      "destination": "Japan",
      "program": "MEXT Scholarship",
      "quote": "The application guide on this platform was invaluable. I went from zero knowledge about Japanese scholarships to a fully funded position in Tokyo.",
      "year": "2025",
      "avatar": "👨‍💻"
    },
    {
      "name": "Aisha Patel",
      "country": "India",
      "destination": "United States",
      "program": "Fulbright Student Program",
      "quote": "The SOP templates and review tips gave me the confidence to apply. Now I''m pursuing my PhD at MIT with full funding.",
      "year": "2024",
      "avatar": "👩‍🎓"
    },
    {
      "name": "Carlos Mendoza",
      "country": "Mexico",
      "destination": "Canada",
      "program": "MITACS Globalink",
      "quote": "I found my summer research internship through Oportunimed. The experience led to a full graduate position at the University of Toronto.",
      "year": "2025",
      "avatar": "👨‍🔬"
    },
    {
      "name": "Sophie Laurent",
      "country": "France",
      "destination": "Netherlands",
      "program": "Holland Scholarship",
      "quote": "Moving to Amsterdam was the best decision. The platform made it easy to compare programs and find the perfect fit for my research interests.",
      "year": "2024",
      "avatar": "👩‍🏫"
    },
    {
      "name": "Kim Ji-hoon",
      "country": "South Korea",
      "destination": "United Kingdom",
      "program": "Chevening Scholarship",
      "quote": "From Seoul to London, Oportunimed was my compass. The step-by-step application guide was a game changer.",
      "year": "2025",
      "avatar": "👨‍🎓"
    }
  ]
}', 2),

-- ============================================
-- DESTINATIONS PAGE
-- ============================================
('destinations', 'hero', 'Destinations Hero', '{
  "title": "Study Destinations",
  "subtitle": "Explore opportunities in over 50 countries worldwide"
}', 1),

('destinations', 'top', 'Top Destinations', '{
  "title": "Top Destinations",
  "items": [
    {"name": "Germany", "programs": 89, "flag": "🇩🇪"},
    {"name": "United States", "programs": 134, "flag": "🇺🇸"},
    {"name": "United Kingdom", "programs": 76, "flag": "🇬🇧"},
    {"name": "Canada", "programs": 67, "flag": "🇨🇦"},
    {"name": "Japan", "programs": 45, "flag": "🇯🇵"},
    {"name": "Australia", "programs": 52, "flag": "🇦🇺"},
    {"name": "Netherlands", "programs": 38, "flag": "🇳🇱"},
    {"name": "France", "programs": 41, "flag": "🇫🇷"}
  ]
}', 2),

('destinations', 'regions', 'Regions', '{
  "title": "By Region",
  "items": [
    {
      "name": "Europe",
      "description": "World-class universities and research institutions across 40+ countries.",
      "countries": ["Germany", "United Kingdom", "France", "Netherlands", "Sweden", "Switzerland"],
      "count": 245,
      "color": "from-blue-500 to-blue-700"
    },
    {
      "name": "North America",
      "description": "Leading research hubs and prestigious scholarship programs.",
      "countries": ["United States", "Canada", "Mexico"],
      "count": 189,
      "color": "from-emerald-500 to-emerald-700"
    },
    {
      "name": "Asia Pacific",
      "description": "Fast-growing academic powerhouses with generous funding.",
      "countries": ["Japan", "South Korea", "Australia", "Singapore", "China"],
      "count": 156,
      "color": "from-orange-500 to-orange-700"
    },
    {
      "name": "Latin America",
      "description": "Emerging research destinations with rich cultural experiences.",
      "countries": ["Brazil", "Argentina", "Chile", "Colombia", "Mexico"],
      "count": 98,
      "color": "from-purple-500 to-purple-700"
    },
    {
      "name": "Middle East & Africa",
      "description": "Growing academic networks and unique research opportunities.",
      "countries": ["UAE", "South Africa", "Israel", "Saudi Arabia"],
      "count": 67,
      "color": "from-amber-500 to-amber-700"
    }
  ]
}', 3);
