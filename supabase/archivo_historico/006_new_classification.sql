-- Migration: Add new types and subtype column
-- ============================================

-- 1. Add new enum values to opportunity_type
-- PostgreSQL doesn't allow adding multiple values at once easily
ALTER TYPE opportunity_type ADD VALUE IF NOT EXISTS 'internado_ss';
ALTER TYPE opportunity_type ADD VALUE IF NOT EXISTS 'event';

-- 2. Add subtype column
ALTER TABLE opportunities 
ADD COLUMN IF NOT EXISTS subtype TEXT DEFAULT NULL;

-- 3. Add index for subtype filtering
CREATE INDEX IF NOT EXISTS idx_opportunities_subtype ON opportunities(subtype);

-- 4. Update existing opportunities with correct types
-- Move "Servicio Social" and "Internado" programs to internado_ss type
UPDATE opportunities SET type = 'internado_ss', subtype = 'servicio_social' WHERE
  title ILIKE '%Servicio Social%' OR
  title ILIKE '%Internado%' OR
  title ILIKE '%internado%';

-- Specific corrections for internado_ss
UPDATE opportunities SET type = 'internado_ss', subtype = 'internado_pregrado' WHERE
  title ILIKE '%Internado Médico%' OR title ILIKE '%Rotación Clínica%';

UPDATE opportunities SET type = 'internado_ss', subtype = 'servicio_social' WHERE
  title ILIKE '%Servicio Social%';

-- Move events/congresses/conferences/hackathons/competitions/exchanges to event type
UPDATE opportunities SET type = 'event', subtype = 'congress' WHERE
  title ILIKE '%Congreso%' OR
  title ILIKE '%Simposio%' OR
  title ILIKE '%Reunión%' OR
  title ILIKE '%Foro de Investigación%' OR
  title ILIKE '%Sesiones Estatutarias%' OR
  title ILIKE '%Semana del Cerebro%';

UPDATE opportunities SET type = 'event', subtype = 'hackathon' WHERE
  title ILIKE '%Hackathon%' OR title ILIKE '%Hack%MIT%' OR
  title ILIKE '%TreeHacks%' OR title ILIKE '%PennApps%' OR
  title ILIKE '%CalHacks%' OR title ILIKE '%MLH%';

UPDATE opportunities SET type = 'event', subtype = 'competition' WHERE
  title ILIKE '%Olympiad%' OR title ILIKE '%Olympiad%' OR
  title ILIKE '%ICPC%' OR title ILIKE '%Imagine Cup%' OR
  title ILIKE '%Hult Prize%' OR title ILIKE '%IMO%' OR
  title ILIKE '%Competition%' OR title ILIKE '%Concurso%';

UPDATE opportunities SET type = 'event', subtype = 'conference' WHERE
  title ILIKE '%Grace Hopper%' OR title ILIKE '%TED%' OR
  title ILIKE '%Young World%' OR title ILIKE '%Summit%';

UPDATE opportunities SET type = 'event', subtype = 'exchange' WHERE
  (title ILIKE '%Intercambio%' OR title ILIKE '%SCOPE%' OR
   title ILIKE '%SCORE%' OR title ILIKE '%SCONE%' OR
   title ILIKE '%Erasmus%' OR title ILIKE '%Rotary Youth%' OR
   title ILIKE '%Intercambio%' OR title ILIKE '%Education Abroad%')
  AND type != 'scholarship';

-- Scholarship subtypes
UPDATE opportunities SET subtype = 'full_scholarship' WHERE
  type = 'scholarship' AND (
  title ILIKE '%Fulbright%' OR title ILIKE '%Chevening%' OR
  title ILIKE '%Rhodes%' OR title ILIKE '%Gates Cambridge%' OR
  title ILIKE '%Schwarzman%' OR title ILIKE '%Knight-Hennessy%' OR
  title ILIKE '%Commonwealth%' OR title ILIKE '%Australia Awards%' OR
  title ILIKE '%Erasmus Mundus%' OR title ILIKE '%Europubhealth%' OR
  title ILIKE '%Amgen%' OR title ILIKE '%Mastercard%' OR
  title ILIKE '%Stipendium%' OR title ILIKE '%Qatar%' OR
  title ILIKE '%Kaohsiung%' OR title ILIKE '%Duke-NUS%' OR
  title ILIKE '%SBW%' OR title ILIKE '%Queen Elizabeth%');

UPDATE opportunities SET subtype = 'government' WHERE
  type = 'scholarship' AND subtype IS NULL AND (
  title ILIKE '%Government%' OR title ILIKE '%MEXT%' OR
  title ILIKE '%KGSP%' OR title ILIKE '%DAAD%' OR
  title ILIKE '%Swiss Government%' OR title ILIKE '%Turkish%' OR
  title ILIKE '%Chinese Government%' OR title ILIKE '%Swedish%' OR
  title ILIKE '%Eiffel%' OR title ILIKE '%SECIHTI%' OR
  title ILIKE '%OEA%' OR title ILIKE '%Santander%' OR
  title ILIKE '%UNAM%' OR title ILIKE '%BBVA%' OR title ILIKE '%FUNED%');

UPDATE opportunities SET subtype = 'fellowship' WHERE
  type = 'scholarship' AND subtype IS NULL AND (
  title ILIKE '%Fellowship%' OR title ILIKE '%Fellowship%' OR
  title ILIKE '%Hubert Humphrey%' OR title ILIKE '%Marshall%' OR
  title ILIKE '%Paul & Daisy%' OR title ILIKE '%Hertz%' OR
  title ILIKE '%Ford Foundation%' OR title ILIKE '%GEM%' OR
  title ILIKE '%Trudeau%' OR title ILIKE '%Bloomberg%' OR
  title ILIKE '%Juan Beckmann%');

UPDATE opportunities SET subtype = 'need_based' WHERE
  type = 'scholarship' AND subtype IS NULL AND (
  title ILIKE '%Open Society%' OR title ILIKE '%Aga Khan%' OR
  title ILIKE '%Gates Millennium%' OR title ILIKE '%Jack Kent Cooke%');

UPDATE opportunities SET subtype = 'merit_based' WHERE
  type = 'scholarship' AND subtype IS NULL AND (
  title ILIKE '%Coca-Cola%' OR title ILIKE '%Barry Goldwater%' OR
  title ILIKE '%Clarendon%' OR title ILIKE '%Karolinska%' OR
  title ILIKE '%Amirana%' OR title ILIKE '%Nottingham%' OR
  title ILIKE '%UCL IMPACT%' OR title ILIKE '%Carlos Slim%' OR
  title ILIKE '%Rosa Luxemburg%' OR title ILIKE '%Mitacs%');

UPDATE opportunities SET subtype = 'travel_grant' WHERE
  type = 'scholarship' AND subtype IS NULL AND
  (title ILIKE '%Travel%' OR title ILIKE '%Young Explorers%');

-- Internship subtypes
UPDATE opportunities SET subtype = 'corporate' WHERE
  type = 'internship' AND (
  title ILIKE '%Google%' OR title ILIKE '%Microsoft%' OR
  title ILIKE '%Meta%' OR title ILIKE '%Apple%' OR
  title ILIKE '%NVIDIA%' OR title ILIKE '%Amazon%' OR
  title ILIKE '%SpaceX%' OR title ILIKE '%Goldman%' OR
  title ILIKE '%JPMorgan%');

UPDATE opportunities SET subtype = 'consulting' WHERE
  type = 'internship' AND (
  title ILIKE '%McKinsey%' OR title ILIKE '%BCG%' OR
  title ILIKE '%Bain%' OR title ILIKE '%Deloitte%' OR
  title ILIKE '%EY%' OR title ILIKE '%Internship Program%');

UPDATE opportunities SET subtype = 'un_international' WHERE
  type = 'internship' AND (
  title ILIKE '%World Bank%' OR title ILIKE '%IMF%' OR
  title ILIKE '%UNICEF%' OR title ILIKE '%UNDP%' OR
  title ILIKE '%WHO%' OR title ILIKE '%PAHO%' OR
  title ILIKE '%ILO%' OR title ILIKE '%FAO%' OR
  title ILIKE '%IDB%' OR title ILIKE '%ADB%' OR
  title ILIKE '%OECD%');

UPDATE opportunities SET subtype = 'research_internship' WHERE
  type = 'internship' AND (
  title ILIKE '%NASA%' OR title ILIKE '%CERN%' OR
  title ILIKE '%ESA%' OR title ILIKE '%Max Planck%' OR
  title ILIKE '%NIH%' OR title ILIKE '%CDC%' OR
  title ILIKE '%Harvard Global%');

-- Research subtypes
UPDATE opportunities SET subtype = 'phd' WHERE
  type = 'research' AND (
  title ILIKE '%PhD%' OR title ILIKE '%Doctorado%' OR
  title ILIKE '%Maestría%' OR title ILIKE '%Maestria%');

UPDATE opportunities SET subtype = 'postdoc' WHERE
  type = 'research' AND (
  title ILIKE '%Postdoc%' OR title ILIKE '%Postdoctoral%' OR
  title ILIKE '%EMBO%' OR title ILIKE '%MSCA%' OR
  title ILIKE '%Perimeter%' OR title ILIKE '%MPI%' OR
  title ILIKE '%Max Planck%' OR title ILIKE '%Wellcome%' OR
  title ILIKE '%Career Research%' OR title ILIKE '%HFSP%' OR
  title ILIKE '%JSPS%');

UPDATE opportunities SET subtype = 'research_fellowship' WHERE
  type = 'research' AND (
  title ILIKE '%Fellowship%' OR title ILIKE '%NSF%' OR
  title ILIKE '%Google PhD%' OR title ILIKE '%Fogarty%');

UPDATE opportunities SET subtype = 'clinical_fellowship' WHERE
  type = 'research' AND (
  title ILIKE '%EIS%' OR title ILIKE '%Epidemic%' OR
  title ILIKE '%OxCam%' OR title ILIKE '%Oxford-Cambridge%');

UPDATE opportunities SET subtype = 'summer_research' WHERE
  type = 'research' AND subtype IS NULL AND (
  title ILIKE '%Verano%' OR title ILIKE '%Summer%' OR
  title ILIKE '%MSRP%' OR title ILIKE '%Amgen%');

-- Course subtypes
UPDATE opportunities SET subtype = 'online' WHERE
  type = 'course' AND (
  title ILIKE '%Coursera%' OR title ILIKE '%edX%' OR
  title ILIKE '%FutureLearn%' OR title ILIKE '%Udacity%' OR
  title ILIKE '%OpenCourseWare%' OR title ILIKE '%Khan Academy%' OR
  title ILIKE '%LinkedIn%' OR title ILIKE '%freeCodeCamp%' OR
  title ILIKE '%Codecademy%' OR title ILIKE '%Odin%' OR
  title ILIKE '%Digital Garage%' OR title ILIKE '%SkillsBuild%' OR
  title ILIKE '%Networking%' OR title ILIKE '%MIT Universal%' OR
  title ILIKE '%Current University%' OR title ILIKE '%Campus Virtual%' OR
  title ILIKE '%UNAM en Coursera%' OR title ILIKE '%DataCamp%' OR
  title ILIKE '%AWS Educate%' OR title ILIKE '%Student Ambassadors%' OR
  title ILIKE '%Harvard Online%' OR title ILIKE '%Google Summer%');

UPDATE opportunities SET subtype = 'summer_school' WHERE
  type = 'course' AND (
  title ILIKE '%Summer School%' OR title ILIKE '%LSE Summer%' OR
  title ILIKE '%Harvard Summer%' OR title ILIKE '%Yale Young%' OR
  title ILIKE '%Summer Program%');

UPDATE opportunities SET subtype = 'short_program' WHERE
  type = 'course' AND (
  title ILIKE '%Clark%' OR title ILIKE '%Telluride%' OR
  title ILIKE '%COSMOS%' OR title ILIKE '%AI4ALL%' OR
  title ILIKE '%Stanford Pre%' OR title ILIKE '%Oxford Summer%');

UPDATE opportunities SET subtype = 'certification' WHERE
  type = 'course' AND (
  title ILIKE '%Career Certificate%' OR title ILIKE '%Nanodegree%' OR
  title ILIKE '%Google Career%' OR title ILIKE '%Year Up%');

UPDATE opportunities SET subtype = 'bootcamp' WHERE
  type = 'course' AND (
  title ILIKE '%App Academy%' OR title ILIKE '%General Assembly%');

UPDATE opportunities SET subtype = 'mentorship' WHERE
  type = 'course' AND (
  title ILIKE '%ADPList%' OR title ILIKE '%SCORE%' OR
  title ILIKE '%Mentor%' OR title ILIKE '%Mentorship%');

UPDATE opportunities SET subtype = 'mission_brain' WHERE
  (title ILIKE '%Mission Brain%');

UPDATE opportunities SET subtype = 'student_chapter' WHERE
  (title ILIKE '%SIGN%' OR title ILIKE '%SMEC%' OR
   title ILIKE '%AMMEF%' OR title ILIKE '%Chapter%' OR
   title ILIKE '%Student Chapter%');

-- IMSS and INSP courses
UPDATE opportunities SET subtype = 'online' WHERE
  type = 'course' AND (title ILIKE '%IMSS%' OR title ILIKE '%INSP%') AND subtype IS NULL;

-- If any events were missed, assign congress as default for event type
UPDATE opportunities SET subtype = 'congress' WHERE type = 'event' AND subtype IS NULL;

COMMENT ON COLUMN opportunities.subtype IS 'Subcategory within type: full_scholarship, fellowship, government, need_based, merit_based, travel_grant, corporate, un_international, consulting, tech, internado_pregrado, servicio_social, phd, postdoc, research_fellowship, clinical_fellowship, summer_research, winter_research, observership, online, certification, bootcamp, summer_school, short_program, mentorship, congress, hackathon, competition, conference, exchange';
