-- ============================================
-- Set call_frequency for all opportunities
-- Run AFTER 009_add_call_frequency.sql
-- ============================================

-- 1) All courses default to "Contínua" (self-paced, always available)
UPDATE opportunities SET call_frequency = 'Contínua' WHERE type = 'course';

-- 2) Semester-based courses (NPTEL/Swayam)
UPDATE opportunities SET call_frequency = 'Semestral - enero/julio'
WHERE type = 'course' AND (
  institution LIKE '%Swayam%' OR institution LIKE '%NPTEL%'
  OR institution LIKE '%IGNOU%' OR institution LIKE '%CEC (%'
  OR institution = 'IIT Madras' OR institution LIKE '%NIT%'
);

-- 3) Annual olympiads and competitions
UPDATE opportunities SET call_frequency = 'Anual - convocatoria nacional sep/ene, internacional jul/ago'
WHERE type = 'course' AND (
  title LIKE '%IMO%' OR title LIKE '%IChO%' OR title LIKE '%IBO%'
  OR title LIKE '%IOI%' OR title LIKE '%IPhO%' OR title LIKE '%IEO%'
  OR title LIKE '%Olympiad%' OR title LIKE '%Olimpiada%'
  OR title LIKE '%ICPC%' OR title LIKE '%Programming Contest%'
);

-- 4) Annual hackathons and competitions
UPDATE opportunities SET call_frequency = 'Anual - octubre/enero'
WHERE type = 'course' AND (
  title LIKE '%Imagine Cup%' OR title LIKE '%Hackathon%'
  OR title LIKE '%TreeHacks%' OR title LIKE '%PennApps%'
  OR title LIKE '%CalHacks%' OR title LIKE '%HackMIT%'
  OR title LIKE '%Hult Prize%'
);

-- 5) Google Summer of Code
UPDATE opportunities SET call_frequency = 'Anual - enero/marzo'
WHERE (title LIKE '%Google Summer of Code%' OR title LIKE '%GSoC%');

-- 6) Major League Hacking
UPDATE opportunities SET call_frequency = 'Trimestral - primavera/verano/otoño'
WHERE institution LIKE '%Major League Hacking%' OR institution LIKE '%MLH%';

-- 7) NASA programs
UPDATE opportunities SET call_frequency = 'Trimestral - primavera/verano/otoño (3 sesiones al año)'
WHERE institution LIKE '%NASA%';

-- 8) CERN programs
UPDATE opportunities SET call_frequency = 'Anual - enero'
WHERE institution LIKE '%CERN%';

-- 9) ESA programs
UPDATE opportunities SET call_frequency = 'Anual - febrero'
WHERE institution LIKE '%ESA%' OR institution LIKE '%European Space%';

-- 10) Max Planck
UPDATE opportunities SET call_frequency = 'Anual - noviembre (verano); contínua (resto)'
WHERE institution LIKE '%Max Planck%';

-- ============================================
-- SCHOLARSHIPS - Government programs
-- ============================================

UPDATE opportunities SET call_frequency = 'Anual - febrero/mayo'
WHERE title LIKE '%Fulbright Foreign Student%' OR title LIKE '%Fulbright U.S. Student%';

UPDATE opportunities SET call_frequency = 'Anual - octubre'
WHERE title = 'Fulbright (México)' OR title LIKE '%Becas del COMEXUS%';

UPDATE opportunities SET call_frequency = 'Anual - agosto'
WHERE title LIKE '%Chevening%';

UPDATE opportunities SET call_frequency = 'Anual - junio'
WHERE title LIKE '%Marshall Scholarship%' OR title LIKE '%Marshall Aid%';

UPDATE opportunities SET call_frequency = 'Anual - julio'
WHERE title LIKE '%Rhodes Scholarship%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre'
WHERE title LIKE '%Gates Cambridge%';

UPDATE opportunities SET call_frequency = 'Anual - agosto/octubre'
WHERE (title LIKE '%DAAD%' AND title NOT LIKE '%EPOS%');

UPDATE opportunities SET call_frequency = 'Anual - octubre'
WHERE title LIKE '%DAAD EPOS%';

UPDATE opportunities SET call_frequency = 'Anual - agosto'
WHERE title LIKE '%Swiss Government Excellence%';

UPDATE opportunities SET call_frequency = 'Anual - enero'
WHERE title LIKE '%Turkish Government%' OR title LIKE '%Türkiye Bursları%' OR title LIKE '%Turkiye Burslari%';

UPDATE opportunities SET call_frequency = 'Anual - octubre'
WHERE title LIKE '%Eiffel Excellence%';

UPDATE opportunities SET call_frequency = 'Anual - abril'
WHERE title LIKE '%Schwarzman%';

UPDATE opportunities SET call_frequency = 'Anual - junio'
WHERE title LIKE '%Knight-Hennessy%';

UPDATE opportunities SET call_frequency = 'Anual - diciembre'
WHERE title LIKE '%Clarendon%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre'
WHERE title LIKE '%Commonwealth Scholarship%';

UPDATE opportunities SET call_frequency = 'Anual - febrero'
WHERE title LIKE '%Australia Awards%';

UPDATE opportunities SET call_frequency = 'Anual - marzo'
WHERE title LIKE '%New Zealand Scholarships%' OR title LIKE '%NZSS%';

UPDATE opportunities SET call_frequency = 'Anual - julio/septiembre'
WHERE title LIKE '%Gates Millennium%';

UPDATE opportunities SET call_frequency = 'Anual - agosto'
WHERE title LIKE '%Coca-Cola Scholars%';

UPDATE opportunities SET call_frequency = 'Anual - agosto'
WHERE title LIKE '%Jack Kent Cooke%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre'
WHERE title LIKE '%Barry Goldwater%';

UPDATE opportunities SET call_frequency = 'Anual - abril'
WHERE title LIKE '%Paul & Daisy Soros%' OR title LIKE '%Paul and Daisy Soros%';

UPDATE opportunities SET call_frequency = 'Anual - julio'
WHERE title LIKE '%Hertz Foundation%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre'
WHERE title LIKE '%Ford Foundation%';

UPDATE opportunities SET call_frequency = 'Anual - agosto'
WHERE title LIKE '%GEM Fellowship%';

UPDATE opportunities SET call_frequency = 'Anual - agosto'
WHERE title LIKE '%SMART Scholarship%';

UPDATE opportunities SET call_frequency = 'Contínua'
WHERE title LIKE '%Open Society Foundations%';

UPDATE opportunities SET call_frequency = 'Anual - enero'
WHERE title LIKE '%Aga Khan Foundation%' OR title LIKE '%Aga Khan Development%';

UPDATE opportunities SET call_frequency = 'Anual - enero'
WHERE title LIKE '%World Bank Scholarship%' OR title LIKE '%JJWBGSP%';

UPDATE opportunities SET call_frequency = 'Anual - julio'
WHERE title LIKE '%OPEC Fund%';

UPDATE opportunities SET call_frequency = 'Anual - octubre'
WHERE title LIKE '%TU Delft Excellence%';

UPDATE opportunities SET call_frequency = 'Anual - noviembre'
WHERE title LIKE '%Holland Scholarship%';

UPDATE opportunities SET call_frequency = 'Semestral - febrero/septiembre'
WHERE title LIKE '%Orange Knowledge%' OR title LIKE '%OKP%';

UPDATE opportunities SET call_frequency = 'Anual - noviembre'
WHERE title LIKE '%Chinese Government Scholarship%' OR title LIKE '%CSC%';

UPDATE opportunities SET call_frequency = 'Anual - febrero'
WHERE title LIKE '%Korean Government Scholarship%' OR title LIKE '%KGSP%';

UPDATE opportunities SET call_frequency = 'Anual - abril'
WHERE title LIKE '%MEXT Scholarship%';

UPDATE opportunities SET call_frequency = 'Anual - noviembre'
WHERE title LIKE '%Stipendium Hungaricum%';

UPDATE opportunities SET call_frequency = 'Anual - febrero'
WHERE title LIKE '%Swedish Institute%';

UPDATE opportunities SET call_frequency = 'Anual - julio'
WHERE title LIKE '%Pierre Elliott Trudeau%';

UPDATE opportunities SET call_frequency = 'Anual - marzo'
WHERE title LIKE '%Qatar Government%';

UPDATE opportunities SET call_frequency = 'Anual - agosto'
WHERE title LIKE '%Boren Awards%' OR title LIKE '%NSEP Boren%';

UPDATE opportunities SET call_frequency = 'Semestral - octubre/marzo'
WHERE title LIKE '%Benjamin A. Gilman%' OR title LIKE '%Gilman International%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre'
WHERE title LIKE '%Fund for Education Abroad%' OR title LIKE '%FEA%';

UPDATE opportunities SET call_frequency = 'Anual - diciembre'
WHERE title LIKE '%Amgen Scholars%';

UPDATE opportunities SET call_frequency = 'Anual - julio'
WHERE title LIKE '%Mitacs Globalink%';

UPDATE opportunities SET call_frequency = 'Anual - varía'
WHERE title LIKE '%Mastercard Foundation%';

UPDATE opportunities SET call_frequency = 'Anual - octubre'
WHERE title LIKE '%Erasmus Mundus%' OR title LIKE '%Europubhealth%';

UPDATE opportunities SET call_frequency = 'Semestral - noviembre/abril'
WHERE title LIKE '%Queen Elizabeth Commonwealth%';

UPDATE opportunities SET call_frequency = 'Anual - octubre'
WHERE title LIKE '%Humphrey Fellowship%' OR title LIKE '%Hubert H. Humphrey%';

UPDATE opportunities SET call_frequency = 'Anual - junio'
WHERE title LIKE '%Churchill Scholarship%' OR title LIKE '%Winston Churchill%';

UPDATE opportunities SET call_frequency = 'Anual - marzo'
WHERE title LIKE '%Islamic Development Bank%' OR title LIKE '%IsDB%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre'
WHERE title LIKE '%Stamps Scholarship%';

UPDATE opportunities SET call_frequency = 'Anual - varía'
WHERE title LIKE '%Soros Justice%';

UPDATE opportunities SET call_frequency = 'Anual - marzo'
WHERE title LIKE '%Kaohsiung Medical University Scholarship%';

UPDATE opportunities SET call_frequency = 'Anual - varía'
WHERE title LIKE '%Amirana Scholarship%';

UPDATE opportunities SET call_frequency = 'Anual - febrero'
WHERE title LIKE '%Karolinska%Global Master%';

UPDATE opportunities SET call_frequency = 'Anual - diciembre'
WHERE title LIKE '%Bloomberg Fellows%';

UPDATE opportunities SET call_frequency = 'Anual - abril'
WHERE title LIKE '%SBW Berlin%';

UPDATE opportunities SET call_frequency = 'Anual - abril'
WHERE title LIKE '%Rosa Luxemburg%';

UPDATE opportunities SET call_frequency = 'Anual - enero'
WHERE title LIKE '%Nottingham Developing%';

UPDATE opportunities SET call_frequency = 'Anual - varía'
WHERE title LIKE '%Harvard Chan%' OR title LIKE '%Duke-NUS%' OR title LIKE '%UQ Medical%' OR title LIKE '%Juan Beckmann%' OR title LIKE '%UCL IMPACT%';

UPDATE opportunities SET call_frequency = 'Anual - enero'
WHERE title LIKE '%Becas UNAM al Extranjero%';

UPDATE opportunities SET call_frequency = 'Anual - febrero'
WHERE title LIKE '%SECIHTI%' OR title LIKE '%CONAHCYT%' OR title LIKE '%CONACYT%';

UPDATE opportunities SET call_frequency = 'Anual - agosto'
WHERE title LIKE '%Beca Carlos Slim%';

UPDATE opportunities SET call_frequency = 'Anual - marzo'
WHERE title LIKE '%Becas OEA%';

UPDATE opportunities SET call_frequency = 'Anual - varía'
WHERE title LIKE '%Becas Antorchas%';

UPDATE opportunities SET call_frequency = 'Contínua'
WHERE title LIKE '%Becas FUNED%' OR title LIKE '%Becas Santander%';

-- ============================================
-- INTERNSHIPS
-- ============================================

UPDATE opportunities SET call_frequency = 'Anual - septiembre/octubre'
WHERE title LIKE '%Google STEP%' OR title LIKE '%Google Summer Intern%';

UPDATE opportunities SET call_frequency = 'Anual - agosto/septiembre'
WHERE title LIKE '%Microsoft Explore%' OR title LIKE '%Microsoft University Intern%';

UPDATE opportunities SET call_frequency = 'Anual - agosto/diciembre'
WHERE title LIKE '%Meta Intern%';

UPDATE opportunities SET call_frequency = 'Anual - agosto/octubre'
WHERE title LIKE '%Apple Intern%' OR title LIKE '%NVIDIA Intern%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre/enero'
WHERE title LIKE '%Amazon Future Engineer%';

UPDATE opportunities SET call_frequency = 'Trimestral - primavera/verano/otoño'
WHERE title LIKE '%SpaceX Intern%';

UPDATE opportunities SET call_frequency = 'Anual - agosto'
WHERE title LIKE '%Goldman Sachs%';

UPDATE opportunities SET call_frequency = 'Anual - agosto/septiembre'
WHERE title LIKE '%JPMorgan%';

UPDATE opportunities SET call_frequency = 'Anual - enero/marzo'
WHERE title LIKE '%McKinsey%Intern%' OR title LIKE '%McKinsey Business Analyst%';

UPDATE opportunities SET call_frequency = 'Anual - junio/septiembre'
WHERE title LIKE '%BCG%Intern%' OR title LIKE '%BCG Summer%';

UPDATE opportunities SET call_frequency = 'Semestral - marzo/agosto'
WHERE title LIKE '%Bain%Intern%';

UPDATE opportunities SET call_frequency = 'Semestral - febrero/julio'
WHERE title LIKE '%Deloitte Intern%';

UPDATE opportunities SET call_frequency = 'Anual - otoño'
WHERE title LIKE '%EY Intern%';

UPDATE opportunities SET call_frequency = 'Semestral - enero/julio'
WHERE (title LIKE '%World Bank Intern%' OR title LIKE '%WBG Pioneers%') AND type = 'internship';

UPDATE opportunities SET call_frequency = 'Contínua'
WHERE (title LIKE '%IMF Intern%' OR title LIKE '%UNICEF Intern%' OR title LIKE '%UNDP Intern%' OR title LIKE '%PAHO Intern%' OR title LIKE '%FAO Intern%') AND type = 'internship';

UPDATE opportunities SET call_frequency = 'Trimestral - noviembre/febrero/mayo/agosto'
WHERE title LIKE '%WHO Intern%';

UPDATE opportunities SET call_frequency = 'Semestral - abril/octubre'
WHERE title LIKE '%ILO Intern%';

UPDATE opportunities SET call_frequency = 'Semestral - enero/julio'
WHERE title LIKE '%UNESCO Intern%';

UPDATE opportunities SET call_frequency = 'Semestral - enero/junio'
WHERE title LIKE '%IDB Intern%' OR title LIKE '%Inter-American Development%';

UPDATE opportunities SET call_frequency = 'Semestral - febrero/segunda mitad'
WHERE title LIKE '%ADB Intern%' OR title LIKE '%Asian Development Bank%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre/enero'
WHERE title LIKE '%MIT Summer Research%' OR title LIKE '%MSRP%';

UPDATE opportunities SET call_frequency = 'Anual - octubre/enero'
WHERE title LIKE '%Broad Summer%';

UPDATE opportunities SET call_frequency = 'Anual - enero/febrero'
WHERE title LIKE '%Fred Hutch%';

UPDATE opportunities SET call_frequency = 'Anual - enero'
WHERE title LIKE '%Cold Spring Harbor%';

UPDATE opportunities SET call_frequency = 'Anual - enero/marzo'
WHERE title LIKE '%Gladstone%';

UPDATE opportunities SET call_frequency = 'Anual - diciembre/febrero'
WHERE title LIKE '%NIH Summer%' OR title LIKE '%NIH SIP%';

UPDATE opportunities SET call_frequency = 'Anual - enero/marzo'
WHERE title LIKE '%CDC Pathways%' OR title LIKE '%CDC Intern%';

UPDATE opportunities SET call_frequency = 'Contínua'
WHERE (title LIKE '%EMBL Intern%' OR title LIKE '%Pasteur Intern%') AND type = 'internship';

-- PhD Fellowships
UPDATE opportunities SET call_frequency = 'Anual - marzo/abril'
WHERE title LIKE '%Google PhD Fellowship%';

UPDATE opportunities SET call_frequency = 'Anual - mayo/junio'
WHERE title LIKE '%Microsoft Research PhD%';

UPDATE opportunities SET call_frequency = 'Anual - octubre/noviembre'
WHERE title LIKE '%IBM PhD Fellowship%';

UPDATE opportunities SET call_frequency = 'Anual - agosto/septiembre'
WHERE title LIKE '%Meta PhD Fellowship%';

UPDATE opportunities SET call_frequency = 'Anual - octubre'
WHERE title LIKE '%DeepMind PhD%';

UPDATE opportunities SET call_frequency = 'Anual - febrero/julio/noviembre'
WHERE title LIKE '%Wellcome Trust%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre/octubre'
WHERE title LIKE '%HHMI%' OR title LIKE '%Howard Hughes%';

UPDATE opportunities SET call_frequency = 'Anual - agosto/diciembre'
WHERE title LIKE '%NIH Oxford-Cambridge%';

-- Summer programs
UPDATE opportunities SET call_frequency = 'Anual - octubre/enero (early action: octubre, regular: enero)'
WHERE title LIKE '%YYGS%' OR title LIKE '%Yale Young Global%';

UPDATE opportunities SET call_frequency = 'Anual - diciembre/abril'
WHERE title LIKE '%Harvard Summer School%' OR title LIKE '%Harvard SSP%';

UPDATE opportunities SET call_frequency = 'Anual - marzo'
WHERE title LIKE '%Stanford Pre-Collegiate%';

UPDATE opportunities SET call_frequency = 'Anual - octubre/diciembre'
WHERE title LIKE '%MIT RSI%' OR title LIKE '%Research Science Institute%';

UPDATE opportunities SET call_frequency = 'Anual - noviembre/mayo'
WHERE title LIKE '%LSE Summer%';

UPDATE opportunities SET call_frequency = 'Anual - febrero/mayo'
WHERE title LIKE '%Oxford Summer%';

UPDATE opportunities SET call_frequency = 'Anual - diciembre/junio'
WHERE title LIKE '%Cambridge Summer%' OR title LIKE '%Cambridge International Summer%';

UPDATE opportunities SET call_frequency = 'Anual - octubre/diciembre'
WHERE title LIKE '%Telluride%' OR title LIKE '%TASS%';

UPDATE opportunities SET call_frequency = 'Contínua'
WHERE title LIKE '%National Geographic%Explorers%';

-- Bootcamps and skills programs
UPDATE opportunities SET call_frequency = 'Contínua'
WHERE title LIKE '%NPower%';

UPDATE opportunities SET call_frequency = 'Semestral - enero/agosto'
WHERE title LIKE '%Year Up%';

UPDATE opportunities SET call_frequency = 'Contínua'
WHERE title LIKE '%Per Scholas%' OR title LIKE '%MicroMentor%' OR title LIKE '%ADPList%' OR title LIKE '%Score%';

UPDATE opportunities SET call_frequency = 'Anual - julio'
WHERE title LIKE '%GitHub Campus Experts%';

UPDATE opportunities SET call_frequency = 'Contínua'
WHERE title LIKE '%Microsoft Learn%Ambassadors%';

-- International summits and awards
UPDATE opportunities SET call_frequency = 'Anual - junio/octubre (becas); cumbre: noviembre'
WHERE title LIKE '%One Young World%';

UPDATE opportunities SET call_frequency = 'Anual - septiembre/febrero'
WHERE title LIKE '%Hult Prize%' AND type <> 'course';

UPDATE opportunities SET call_frequency = 'Bianual'
WHERE title LIKE '%Rolex Awards%';

UPDATE opportunities SET call_frequency = 'Anual - enero/junio'
WHERE title LIKE '%Zayed Sustainability%';

UPDATE opportunities SET call_frequency = 'Anual - febrero/abril'
WHERE title LIKE '%Global Change Award%' OR title LIKE '%H&M Foundation%';

-- Everything else not yet set
UPDATE opportunities SET call_frequency = 'Anual - consultar convocatoria'
WHERE call_frequency IS NULL;