-- ============================================
-- TODO EN UNO: Tabla + RLS + Seed en Español
-- ============================================

-- 1. Fix RLS en site_content (ya existe)
DROP POLICY IF EXISTS "Site content viewable by everyone" ON site_content;
CREATE POLICY "site_content_full_access" ON site_content FOR ALL USING (true) WITH CHECK (true);

-- 2. Crear tabla page_sections (si no existe)
CREATE TABLE IF NOT EXISTS page_sections (
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

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Page sections viewable by everyone" ON page_sections;
DROP POLICY IF EXISTS "Authenticated users can insert sections" ON page_sections;
DROP POLICY IF EXISTS "Authenticated users can update sections" ON page_sections;
DROP POLICY IF EXISTS "Authenticated users can delete sections" ON page_sections;
DROP POLICY IF EXISTS "page_sections_full_access" ON page_sections;

CREATE POLICY "page_sections_full_access" ON page_sections FOR ALL USING (true) WITH CHECK (true);

-- Trigger
DROP TRIGGER IF EXISTS trigger_page_sections_updated_at ON page_sections;
CREATE TRIGGER trigger_page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 3. Limpiar datos viejos
DELETE FROM page_sections;

-- 4. Seed en Español
INSERT INTO page_sections (page, section_key, title, content, sort_order) VALUES

-- HOMEPAGE
('home', 'hero', 'Sección Principal', '{
  "headline": "Tu Viaje de Investigación y Becas Internacionales Comienza Aquí.",
  "subheadline": "Encuentra programas prestigiosos, financiamiento y experiencias académicas en todo el mundo para enriquecer tu CV.",
  "search_placeholder": "Buscar por destino, programa...",
  "cta_1_text": "Explorar Oportunidades",
  "cta_1_link": "/opportunities",
  "cta_2_text": "Cómo Aplicar",
  "cta_2_link": "/how-to-apply"
}', 1),

('home', 'categories', 'Categorías', '{
  "title": "Categorías",
  "subtitle": "Descubre oportunidades que se adapten a tus metas académicas",
  "items": [
    {"label": "Becas", "description": "Financiamiento Total y Parcial", "icon": "🎓"},
    {"label": "Programas de Investigación", "description": "Investigación en Ciencias y Humanidades", "icon": "🔬"},
    {"label": "Prácticas Profesionales", "description": "Colocaciones Profesionales en el Extranjero", "icon": "💼"},
    {"label": "Idiomas y Verano", "description": "Estudios Cortos en el Extranjero", "icon": "📖"}
  ]
}', 2),

('home', 'featured', 'Destacados', '{
  "title": "Oportunidades Destacadas",
  "subtitle": "Programas seleccionados para impulsar tu carrera académica"
}', 3),

('home', 'stats', 'Estadísticas', '{
  "title": "Alcance Global",
  "subtitle": "Números que hablan por sí solos",
  "items": [
    {"label": "Programas Listados", "value": "500+", "icon": "📚"},
    {"label": "Países", "value": "50+", "icon": "🌍"},
    {"label": "Estudiantes Ayudados", "value": "10,000+", "icon": "🎓"},
    {"label": "Instituciones Aliadas", "value": "200+", "icon": "🏛️"}
  ]
}', 4),

('home', 'cta', 'Llamado a la Acción', '{
  "title": "¿Listo para Comenzar tu Viaje?",
  "subtitle": "Únete a miles de estudiantes que encontraron su camino global.",
  "button_text": "Comenzar",
  "button_link": "/opportunities"
}', 5),

-- HEADER
('header', 'header', 'Navegación', '{
  "site_name": "Oportunimed",
  "logo_text": "GP",
  "nav_items": [
    {"label": "Inicio", "href": "/"},
    {"label": "Oportunidades", "href": "/opportunities"},
    {"label": "Destinos", "href": "/destinations"},
    {"label": "Becas", "href": "/opportunities?type=scholarship"},
    {"label": "Historias", "href": "/stories"},
    {"label": "Blog", "href": "/blog"}
  ]
}', 1),

-- FOOTER
('footer', 'footer', 'Pie de Página', '{
  "site_name": "Oportunimed",
  "logo_text": "GP",
  "tagline": "Empoderando a estudiantes para encontrar oportunidades de investigación y becas en todo el mundo.",
  "copyright": "Oportunimed",
  "explore_links": [
    {"label": "Oportunidades", "href": "/opportunities"},
    {"label": "Becas", "href": "/opportunities?type=scholarship"},
    {"label": "Destinos", "href": "/destinations"}
  ],
  "resource_links": [
    {"label": "Blog", "href": "/blog"},
    {"label": "Historias", "href": "/stories"},
    {"label": "Cómo Aplicar", "href": "/how-to-apply"}
  ],
  "legal_links": [
    {"label": "Política de Privacidad", "href": "/privacy"},
    {"label": "Términos de Servicio", "href": "/terms"}
  ]
}', 1),

-- CÓMO APLICAR
('how-to-apply', 'hero', 'Cómo Aplicar', '{
  "title": "Cómo Aplicar",
  "subtitle": "Guía paso a paso para asegurar tu oportunidad internacional"
}', 1),

('how-to-apply', 'steps', 'Pasos de la Aplicación', '{
  "items": [
    {
      "number": "01",
      "title": "Investiga y Descubre",
      "description": "Explora nuestra base de datos curada de oportunidades. Usa filtros para encontrar programas que coincidan con tu campo e intereses.",
      "icon": "🔍",
      "details": [
        "Busca por país, tipo o palabra clave",
        "Filtra por disponibilidad de financiamiento",
        "Lee descripciones detalladas de programas",
        "Guarda oportunidades en tu lista de favoritos"
      ]
    },
    {
      "number": "02",
      "title": "Prepara tus Documentos",
      "description": "La mayoría de los programas requieren documentos similares. Prepara con anticipación para evitar estrés de último minuto.",
      "icon": "📄",
      "details": [
        "Declaración de Propósitos (SOP)",
        "Cartas de Recomendación",
        "Currículum Vitae",
        "Historial Académico",
        "Dominio del Idioma (IELTS/TOEFL)",
        "Propuesta de Investigación (para programas de investigación)"
      ]
    },
    {
      "number": "03",
      "title": "Escribe un SOP Sólido",
      "description": "Tu Declaración de Propósitos es tu oportunidad para destacar. Hazla personal, específica y convincente.",
      "icon": "✍️",
      "details": [
        "Comienza con un gancho que capture la atención",
        "Explica por qué este programa específico",
        "Destaca experiencias relevantes",
        "Muestra tus metas futuras",
        "Revisa múltiples veces"
      ]
    },
    {
      "number": "04",
      "title": "Envía tu Aplicación",
      "description": "Sigue las instrucciones de aplicación cuidadosamente. La mayoría tiene portales en línea.",
      "icon": "📤",
      "details": [
        "Crea una cuenta en el portal",
        "Completa todos los campos obligatorios",
        "Sube documentos en el formato correcto",
        "Verifica todo antes de enviar",
        "Anota la fecha límite y envía con anticipación"
      ]
    },
    {
      "number": "05",
      "title": "Da Seguimiento",
      "description": "Después de enviar, mantén un registro de tus aplicaciones y da seguimiento si es necesario.",
      "icon": "📋",
      "details": [
        "Monitorea el estado en tu panel",
        "Responde a solicitudes de información adicional",
        "Prepárate para entrevistas si las requieren",
        "Acepta ofertas antes de la fecha límite"
      ]
    }
  ]
}', 2),

('how-to-apply', 'tips', 'Consejos Pro', '{
  "title": "Consejos para una Aplicación Exitosa",
  "items": [
    {
      "title": "Aplica a Múltiples Programas",
      "description": "No pongas todos tus huevos en una canasta. Aplica a al menos 3-5 programas para aumentar tus posibilidades."
    },
    {
      "title": "Comienza Temprano",
      "description": "Empieza a preparar al menos 3-6 meses antes de la fecha límite. Las aplicaciones apresuradas rara vez tienen éxito."
    },
    {
      "title": "Busca Retroalimentación",
      "description": "Pide a mentores, profesores o compañeros que revisen tu SOP y materiales."
    },
    {
      "title": "Sé Auténtico",
      "description": "Los comités de admisión detectan aplicaciones genéricas. Sé genuino sobre tus intereses y metas."
    }
  ]
}', 3),

('how-to-apply', 'cta', 'Llamado a la Acción', '{
  "title": "¿Listo para Empezar?",
  "subtitle": "Explora oportunidades y da el primer paso hacia tu viaje global.",
  "button_1_text": "Explorar Oportunidades",
  "button_1_link": "/opportunities",
  "button_2_text": "Leer Más Guías",
  "button_2_link": "/blog"
}', 4),

-- BLOG
('blog', 'hero', 'Blog', '{
  "title": "El Blog de Oportunimed",
  "subtitle": "Consejos, guías y perspectivas para tu viaje académico internacional"
}', 1),

('blog', 'posts', 'Publicaciones', '{
  "items": [
    {
      "slug": "como-escribir-sop-ganador",
      "title": "Cómo Escribir una Declaración de Propósitos Ganadora",
      "excerpt": "Aprende la estructura, el tono y los elementos clave que hacen que los comités de admisión presten atención.",
      "category": "Consejos de Aplicación",
      "date": "2026-07-10",
      "readTime": "8 min de lectura"
    },
    {
      "slug": "mejores-becas-2026",
      "title": "Las 10 Mejores Becas para Estudiantes Internacionales en 2026",
      "excerpt": "Desde Fulbright hasta Erasmus Mundus, descubre los programas de becas más generosos abiertos este año.",
      "category": "Becas",
      "date": "2026-07-05",
      "readTime": "12 min de lectura"
    },
    {
      "slug": "guia-investigacion-extranjero",
      "title": "La Guía Completa para Investigar en el Extranjero",
      "excerpt": "Todo lo que necesitas saber para encontrar posiciones de investigación, contactar profesores y conseguir financiamiento.",
      "category": "Investigación",
      "date": "2026-06-28",
      "readTime": "15 min de lectura"
    },
    {
      "slug": "comparacion-costos-vida",
      "title": "Costo de Vida: Comparando Destinos de Estudio",
      "excerpt": "Una comparación basada en datos de costos de vida en los principales destinos de estudio.",
      "category": "Planificación",
      "date": "2026-06-20",
      "readTime": "10 min de lectura"
    },
    {
      "slug": "consejos-visa",
      "title": "Consejos para Visa: Evita Errores Comunes",
      "excerpt": "Navega el proceso de solicitud de visa con confianza. Aprende de errores comunes y cómo preparar una solicitud sólida.",
      "category": "Visa y Legal",
      "date": "2026-06-15",
      "readTime": "7 min de lectura"
    },
    {
      "slug": "networking-congresos",
      "title": "Networking en Congresos Académicos: Guía para Estudiantes",
      "excerpt": "Cómo aprovechar al máximo los congresos académicos, construir tu red y abrir puertas para colaboraciones futuras.",
      "category": "Desarrollo Profesional",
      "date": "2026-06-10",
      "readTime": "6 min de lectura"
    }
  ]
}', 2),

-- HISTORIAS
('stories', 'hero', 'Historias', '{
  "title": "Historias de Estudiantes",
  "subtitle": "Experiencias reales de estudiantes que encontraron su camino global"
}', 1),

('stories', 'stories', 'Historias de Estudiantes', '{
  "items": [
    {
      "avatar": "👩‍🔬",
      "name": "María Rodríguez",
      "country": "España",
      "destination": "Alemania",
      "program": "Beca de Investigación DAAD",
      "quote": "Oportunimed me ayudó a descubrir el programa DAAD. Nunca supe que existían oportunidades así para investigación en neurociencia computacional en Berlín.",
      "year": "2025"
    },
    {
      "avatar": "👨‍💻",
      "name": "James Chen",
      "country": "Canadá",
      "destination": "Japón",
      "program": "Beca MEXT",
      "quote": "La guía de aplicación en esta plataforma fue invaluable. Pasé de no saber nada sobre becas japonesas a tener una posición financiada en Tokio.",
      "year": "2025"
    },
    {
      "avatar": "👩‍🎓",
      "name": "Aisha Patel",
      "country": "India",
      "destination": "Estados Unidos",
      "program": "Programa Fulbright",
      "quote": "Las plantillas de SOP y los consejos de revisión me dieron la confianza para aplicar. Ahora estoy haciendo mi doctorado en MIT con financiamiento completo.",
      "year": "2024"
    },
    {
      "avatar": "👨‍🔬",
      "name": "Carlos Mendoza",
      "country": "México",
      "destination": "Canadá",
      "program": "MITACS Globalink",
      "quote": "Encontré mi pasantía de investigación de verano a través de Oportunimed. La experiencia llevó a una posición de posgrado completa en la Universidad de Toronto.",
      "year": "2025"
    },
    {
      "avatar": "👩‍🏫",
      "name": "Sophie Laurent",
      "country": "Francia",
      "destination": "Países Bajos",
      "program": "Beca de Holanda",
      "quote": "Mudarme a Ámsterdam fue la mejor decisión. La plataforma hizo fácil comparar programas y encontrar el ajuste perfecto para mis intereses de investigación.",
      "year": "2024"
    },
    {
      "avatar": "👨‍🎓",
      "name": "Kim Ji-hoon",
      "country": "Corea del Sur",
      "destination": "Reino Unido",
      "program": "Beca Chevening",
      "quote": "De Seúl a Londres, Oportunimed fue mi brújula. La guía de aplicación paso a paso fue un cambio total.",
      "year": "2025"
    }
  ]
}', 2),

-- DESTINOS
('destinations', 'hero', 'Destinos', '{
  "title": "Destinos de Estudio",
  "subtitle": "Explora oportunidades en más de 50 países alrededor del mundo"
}', 1),

('destinations', 'top', 'Principales Destinos', '{
  "title": "Principales Destinos",
  "items": [
    {"flag": "🇩🇪", "name": "Alemania", "programs": 89},
    {"flag": "🇺🇸", "name": "Estados Unidos", "programs": 134},
    {"flag": "🇬🇧", "name": "Reino Unido", "programs": 76},
    {"flag": "🇨🇦", "name": "Canadá", "programs": 67},
    {"flag": "🇯🇵", "name": "Japón", "programs": 45},
    {"flag": "🇦🇺", "name": "Australia", "programs": 52},
    {"flag": "🇳🇱", "name": "Países Bajos", "programs": 38},
    {"flag": "🇫🇷", "name": "Francia", "programs": 41}
  ]
}', 2),

('destinations', 'regions', 'Regiones', '{
  "title": "Por Región",
  "items": [
    {
      "name": "Europa",
      "description": "Universidades de clase mundial e instituciones de investigación en más de 40 países.",
      "countries": ["Alemania", "Reino Unido", "Francia", "Países Bajos", "Suecia", "Suiza"],
      "count": 245,
      "color": "from-blue-500 to-blue-700"
    },
    {
      "name": "América del Norte",
      "description": "Centros de investigación líderes y programas de becas prestigiosos.",
      "countries": ["Estados Unidos", "Canadá", "México"],
      "count": 189,
      "color": "from-emerald-500 to-emerald-700"
    },
    {
      "name": "Asia Pacífico",
      "description": "Potencias académicas en rápido crecimiento con financiamiento generoso.",
      "countries": ["Japón", "Corea del Sur", "Australia", "Singapur", "China"],
      "count": 156,
      "color": "from-orange-500 to-orange-700"
    },
    {
      "name": "América Latina",
      "description": "Destinos de investigación emergentes con ricas experiencias culturales.",
      "countries": ["Brasil", "Argentina", "Chile", "Colombia", "México"],
      "count": 98,
      "color": "from-purple-500 to-purple-700"
    },
    {
      "name": "Medio Oriente y África",
      "description": "Redes académicas en crecimiento y oportunidades de investigación únicas.",
      "countries": ["EAU", "Sudáfrica", "Israel", "Arabia Saudita"],
      "count": 67,
      "color": "from-amber-500 to-amber-700"
    }
  ]
}', 3);
