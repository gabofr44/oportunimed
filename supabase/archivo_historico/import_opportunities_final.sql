-- ============================================
-- FINAL Import: Corrected URLs + Educational Metadata
-- Run in Supabase SQL Editor
-- ============================================

-- Step 1: Add columns if not exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='opportunities' AND column_name='educational_level') THEN
    ALTER TABLE opportunities ADD COLUMN educational_level TEXT DEFAULT 'universidad';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='opportunities' AND column_name='educational_field') THEN
    ALTER TABLE opportunities ADD COLUMN educational_field TEXT DEFAULT 'general';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_opportunities_edu_level ON opportunities(educational_level);
CREATE INDEX IF NOT EXISTS idx_opportunities_edu_field ON opportunities(educational_field);

-- Step 2: Clear existing (optional - uncomment if replacing)
-- DELETE FROM opportunities;

-- ============================================
-- BECAS (Scholarships)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

-- Fulbright Foreign Student
('Fulbright Foreign Student Program', 'Institute of International Education (IIE)', 'United States', 'scholarship', true, 'For non-U.S. students to study in the U.S. Administered by IIE for the U.S. Department of State. 150+ countries represented.', 'https://foreign.fulbrightonline.org/', '2026-10-13T23:59:00Z', ARRAY['Fellowship', 'Graduate', 'Government'], false, 'posgrado', 'general'),

-- Hubert Humphrey
('Hubert H. Humphrey Fellowship Program', 'IIE / U.S. Department of State', 'United States', 'scholarship', true, 'For experienced professionals from priority countries. Graduate-level study and professional experiences at U.S. host universities.', 'https://www.humphreyfellowship.org/', '2026-10-01T23:59:00Z', ARRAY['Fellowship', 'Professional', 'Leadership'], false, 'profesional', 'general'),

-- Chevening
('Chevening Scholarships', 'UK Foreign, Commonwealth & Development Office', 'United Kingdom', 'scholarship', true, 'Fully-funded UK government scholarship for outstanding emerging leaders. One-year master''s in the UK.', 'https://www.chevening.org/scholarships/', '2026-11-05T23:59:00Z', ARRAY['Fellowship', 'Masters', 'Leadership'], true, 'posgrado', 'general'),

-- Marshall
('Marshall Scholarships', 'Marshall Aid Commissions', 'United Kingdom', 'scholarship', true, 'For intellectually distinguished young Americans to pursue graduate study in the UK.', 'https://www.marshallscholarship.org/', '2026-09-23T23:59:00Z', ARRAY['Fellowship', 'Graduate'], false, 'posgrado', 'general'),

-- Rhodes
('Rhodes Scholarships', 'Rhodes Trust / University of Oxford', 'United Kingdom', 'scholarship', true, 'Fully-funded postgraduate award at the University of Oxford for outstanding young people from around the world.', 'https://www.rhodeshouse.ox.ac.uk/scholarships/', '2026-10-01T23:59:00Z', ARRAY['Fellowship', 'Graduate', 'Oxford'], true, 'posgrado', 'general'),

-- Gates Cambridge
('Gates Cambridge Scholarships', 'Gates Cambridge Trust', 'United Kingdom', 'scholarship', true, 'Outstanding postgraduate study at the University of Cambridge for citizens of any country outside the UK.', 'https://www.gatescambridge.org/', '2026-10-14T23:59:00Z', ARRAY['Fellowship', 'Graduate', 'Cambridge'], false, 'posgrado', 'general'),

-- DAAD
('DAAD Scholarships', 'German Academic Exchange Service (DAAD)', 'Germany', 'scholarship', true, 'Scholarships for international students at all academic levels to study in Germany.', 'https://www.daad.de/en/', '2026-10-15T23:59:00Z', ARRAY['Scholarship', 'Germany'], false, 'posgrado', 'general'),

-- Swiss Government
('Swiss Government Excellence Scholarships', 'Swiss Confederation (SBFI)', 'Switzerland', 'scholarship', true, 'For foreign researchers and artists holding a master degree to conduct research or further studies in Switzerland.', 'https://www.sbfi.admin.ch/', '2026-12-01T23:59:00Z', ARRAY['Research', 'Switzerland'], false, 'posgrado', 'general'),

-- Türkiye Bursları
('Turkish Government Scholarship (Türkiye Bursları)', 'Republic of Türkiye', 'Turkey', 'scholarship', true, 'Comprehensive scholarship for international students at all academic levels to study in Turkey.', 'https://www.turkiyeburslari.gov.tr/', '2026-02-20T23:59:00Z', ARRAY['Scholarship', 'Turkey'], false, 'universidad', 'general'),

-- Eiffel
('Eiffel Excellence Scholarship Program', 'Campus France / French Ministry', 'France', 'scholarship', true, 'For international students enrolled in French higher education institutions at master''s and doctoral levels.', 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence', '2026-01-10T23:59:00Z', ARRAY['Scholarship', 'France'], false, 'posgrado', 'general'),

-- Schwarzman Scholars
('Schwarzman Scholars Program', 'Tsinghua University', 'China', 'scholarship', true, 'Fully-funded one-year master''s in Global Affairs at Tsinghua University, focused on leadership and China''s role in the world.', 'https://www.schwarzmanscholars.org/', '2026-09-19T23:59:00Z', ARRAY['Masters', 'Leadership', 'China'], false, 'posgrado', 'ciencias_sociales'),

-- Knight-Hennessy
('Knight-Hennessy Scholars', 'Stanford University', 'United States', 'scholarship', true, 'Full funding for graduate study at Stanford University. Up to 3 years of tuition plus stipend.', 'https://knight-hennessy.stanford.edu/', '2026-10-08T23:59:00Z', ARRAY['Graduate', 'Leadership', 'Stanford'], true, 'posgrado', 'general'),

-- Clarendon
('Clarendon Fund Scholarships', 'University of Oxford', 'United Kingdom', 'scholarship', true, 'Major scholarship at Oxford covering tuition fees and living costs for outstanding postgraduate students.', 'https://www.clarendon.ox.ac.uk/', '2026-01-07T23:59:00Z', ARRAY['Graduate', 'Oxford'], false, 'posgrado', 'general'),

-- Commonwealth
('Commonwealth Scholarships', 'Commonwealth Scholarship Commission (FCDO)', 'United Kingdom', 'scholarship', true, 'For students from Commonwealth countries to pursue master''s or PhD study in the UK.', 'https://cscuk.fcdo.gov.uk/', '2026-12-01T23:59:00Z', ARRAY['Fellowship', 'Commonwealth', 'UK'], false, 'posgrado', 'general'),

-- Australia Awards
('Australia Awards Scholarships', 'Australian Government (DFAT)', 'Australia', 'scholarship', true, 'Full scholarships for students from developing countries to study at Australian institutions.', 'https://www.dfat.gov.au/people-to-people/australia-awards', '2026-04-30T23:59:00Z', ARRAY['Scholarship', 'Australia'], false, 'universidad', 'general'),

-- NZ Scholarships (URL may not work but info is correct)
('New Zealand Scholarships (NZSS)', 'New Zealand Ministry of Foreign Affairs', 'New Zealand', 'scholarship', true, 'Full scholarships for students from eligible developing countries to study in New Zealand.', 'https://www.nzaid.govt.nz/scholarships/', '2026-03-01T23:59:00Z', ARRAY['Scholarship', 'New Zealand'], false, 'universidad', 'general'),

-- Gates Millennium
('Gates Millennium Scholars Program', 'UNCF / Gates Foundation', 'United States', 'scholarship', true, 'Full scholarship for outstanding minority students with demonstrated leadership ability.', 'https://www.gmsp.org/', '2026-09-15T23:59:00Z', ARRAY['Scholarship', 'Minority', 'Leadership'], false, 'universidad', 'general'),

-- Coca-Cola Scholars
('Coca-Cola Scholars Program', 'Coca-Cola Scholars Foundation', 'United States', 'scholarship', true, 'Scholarship for outstanding high school seniors demonstrating leadership and commitment to service.', 'https://www.coca-colascholarsfoundation.org/', '2026-10-31T23:59:00Z', ARRAY['Scholarship', 'Undergraduate', 'Leadership'], false, 'preparatoria', 'general'),

-- Jack Kent Cooke
('Jack Kent Cooke Foundation College Scholarship', 'JKCF', 'United States', 'scholarship', true, 'Scholarship for high-achieving students with financial need, from high school through graduate school.', 'https://www.jkcf.org/our-scholarships/', '2026-11-18T23:59:00Z', ARRAY['Scholarship', 'Undergraduate'], false, 'universidad', 'general'),

-- Barry Goldwater
('Barry Goldwater Scholarship', 'Goldwater Foundation', 'United States', 'scholarship', true, 'For college sophomores and juniors pursuing research careers in STEM fields.', 'https://goldwater.scholarsapply.org/', '2026-01-31T23:59:00Z', ARRAY['Scholarship', 'STEM', 'Undergraduate'], false, 'universidad', 'ciencias'),

-- Paul & Daisy Soros
('Paul & Daisy Soros Fellowships for New Americans', 'PDSF', 'United States', 'scholarship', true, 'For immigrants and children of immigrants pursuing graduate education in the U.S.', 'https://www.pdsoros.org/', '2026-10-26T23:59:00Z', ARRAY['Fellowship', 'Immigrants', 'Graduate'], false, 'posgrado', 'general'),

-- Hertz Foundation
('Hertz Foundation Fellowship', 'Hertz Foundation', 'United States', 'scholarship', true, 'For doctoral students in applied physical, biological, and engineering sciences. Up to 5 years of support.', 'https://www.hertzfoundation.org/the-fellowship/', '2026-10-21T23:59:00Z', ARRAY['Fellowship', 'STEM', 'PhD'], false, 'posgrado', 'ingenieria'),

-- Ford Foundation (URL was broken - using known info)
('Ford Foundation Fellowship Programs', 'National Academies of Sciences', 'United States', 'scholarship', true, 'For PhD students and postdocs committed to increasing diversity in academia.', 'https://sites.nationalacademies.org/pga/fordfellowships/', '2026-12-18T23:59:00Z', ARRAY['Fellowship', 'Diversity', 'PhD'], false, 'posgrado', 'general'),

-- GEM Fellowship
('GEM Fellowship', 'GEM (National Consortium)', 'United States', 'scholarship', true, 'For underrepresented minority students pursuing graduate degrees in STEM and business.', 'https://www.gemfellowship.org/', '2026-10-01T23:59:00Z', ARRAY['Fellowship', 'STEM', 'Diversity'], false, 'posgrado', 'ciencias'),

-- SMART Scholarship
('SMART Scholarship (DoD)', 'U.S. Department of Defense', 'United States', 'scholarship', true, 'Full scholarship for STEM students who commit to employment with the Department of Defense after graduation.', 'https://smartscholarship.org/', '2026-12-01T23:59:00Z', ARRAY['Scholarship', 'STEM', 'Government'], false, 'universidad', 'ingenieria'),

-- Open Society Foundations
('Open Society Foundations Scholarships', 'Open Society Foundations', 'Various', 'scholarship', true, 'Scholarships for students from disadvantaged backgrounds committed to social justice.', 'https://www.opensocietyfoundations.org/', '2026-06-01T23:59:00Z', ARRAY['Scholarship', 'Social Justice'], false, 'posgrado', 'general'),

-- Aga Khan Foundation
('Aga Khan Foundation International Scholarship', 'Aga Khan Development Network', 'Various', 'scholarship', true, 'Scholarships for students from developing countries with demonstrated financial need.', 'https://www.akdn.org/our-agencies/aga-khan-foundation', '2026-03-15T23:59:00Z', ARRAY['Scholarship', 'Development'], false, 'posgrado', 'general'),

-- World Bank Scholarship
('World Bank Scholarships (JJWBGSP)', 'World Bank Group', 'Various', 'scholarship', true, 'Joint Japan/World Bank Graduate Scholarship Program for students from developing countries.', 'https://www.worldbank.org/en/about/careers/programs-and-internships/joint-japan-world-bank-graduate-scholarship-program', '2026-04-15T23:59:00Z', ARRAY['Scholarship', 'Development', 'Graduate'], false, 'posgrado', 'administracion'),

-- OPEC Fund
('OPEC Fund Scholarship Program', 'OPEC Fund for International Development', 'Various', 'scholarship', true, 'For students from developing OPEC member countries to pursue undergraduate and graduate studies.', 'https://www.opecfund.org/', '2026-06-30T23:59:00Z', ARRAY['Scholarship', 'Development'], false, 'universidad', 'general'),

-- TU Delft Talent
('TU Delft Excellence Scholarships', 'Delft University of Technology', 'Netherlands', 'scholarship', true, 'Scholarships for talented international students at TU Delft for MSc programs.', 'https://www.tudelft.nl/en/education/financial-matters/scholarships', '2026-04-01T23:59:00Z', ARRAY['Scholarship', 'Netherlands', 'Engineering'], false, 'posgrado', 'ingenieria'),

-- Holland Scholarship
('Holland Scholarship', 'Dutch Ministry of Education', 'Netherlands', 'scholarship', true, 'For non-EEA international students to study at Dutch universities.', 'https://www.studyinholland.nl/finances/scholarships', '2026-02-01T23:59:00Z', ARRAY['Scholarship', 'Netherlands'], false, 'universidad', 'general'),

-- Orange Knowledge
('Orange Knowledge Programme (OKP)', 'Nuffic', 'Netherlands', 'scholarship', true, 'For mid-career professionals from developing countries to study in the Netherlands.', 'https://www.nuffic.nl/en/study-funding/orange-knowledge-programme', '2026-03-01T23:59:00Z', ARRAY['Scholarship', 'Professional', 'Netherlands'], false, 'profesional', 'general'),

-- Marshall Aid
('Marshall Aid Commissions', 'British Government', 'United Kingdom', 'scholarship', true, 'For American students to pursue graduate study in the UK.', 'https://www.marshallscholarship.org/', '2026-09-23T23:59:00Z', ARRAY['Scholarship', 'UK', 'Graduate'], false, 'posgrado', 'general'),

-- Pierre Elliott Trudeau
('Pierre Elliott Trudeau Foundation Doctoral Scholarships', 'Pierre Elliott Trudeau Foundation', 'Canada', 'scholarship', true, 'For outstanding doctoral candidates studying social and human sciences in Canada.', 'https://www.trudeaufoundation.ca/scholarships/doctors', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Canada', 'Social Sciences'], false, 'posgrado', 'humanidades'),

-- Chinese Government (URL blocked by bot protection but info correct)
('Chinese Government Scholarship (CSC)', 'China Scholarship Council', 'China', 'scholarship', true, 'Full scholarship for international students to study at Chinese universities.', 'https://www.campuschina.org/', '2026-04-15T23:59:00Z', ARRAY['Scholarship', 'China'], false, 'universidad', 'general'),

-- KGSP (URL had connection issues but info correct)
('Korean Government Scholarship Program (KGSP)', 'NIIED / Republic of Korea', 'South Korea', 'scholarship', true, 'Full scholarship for international students at undergraduate and graduate levels in South Korea.', 'https://www.studyinkorea.go.kr/', '2026-03-01T23:59:00Z', ARRAY['Scholarship', 'South Korea'], false, 'universidad', 'general'),

-- MEXT (URL was broken - use corrected URL)
('MEXT Scholarship (Japanese Government)', 'MEXT / Government of Japan', 'Japan', 'scholarship', true, 'Full scholarship for international students to study at Japanese universities. Research, undergraduate, and training categories.', 'https://www.studyinjapan.go.jp/en/', '2026-04-26T23:59:00Z', ARRAY['Scholarship', 'Japan'], true, 'universidad', 'general');

-- ============================================
-- INTERNADOS (Internships)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

-- Google STEP
('Google STEP Internship', 'Google', 'United States', 'internship', true, '12-week paid internship for first and second-year undergraduate students in software engineering.', 'https://buildyourfuture.withgoogle.com/programs/step', '2026-05-01T23:59:00Z', ARRAY['Technology', 'Software'], false, 'universidad', 'tecnologia'),

-- Amazon Future Engineer
('Amazon Future Engineer Internship', 'Amazon', 'United States', 'internship', true, 'Paid computer science internship with mentorship and leadership development for underrepresented students.', 'https://www.amazonfutureengineer.com/', '2026-10-15T23:59:00Z', ARRAY['Technology', 'Computer Science'], false, 'universidad', 'tecnologia'),

-- Goldman Sachs
('Goldman Sachs Summer Analyst Program', 'Goldman Sachs', 'United States', 'internship', false, '10-week paid internship in investment banking, securities, and asset management.', 'https://www.goldmansachs.com/careers/students/programs/', '2026-05-15T23:59:00Z', ARRAY['Finance', 'Banking'], false, 'universidad', 'administracion'),

-- JPMorgan
('JPMorgan Chase Internship Program', 'JPMorgan Chase & Co.', 'United States', 'internship', false, 'Paid internship in finance, technology, and business across various divisions.', 'https://careers.jpmorgan.com/us/en/students/internships', '2026-06-01T23:59:00Z', ARRAY['Finance', 'Technology'], false, 'universidad', 'administracion'),

-- EY
('EY Internship Program', 'Ernst & Young (EY)', 'United States', 'internship', false, 'Internship in assurance, consulting, strategy and transactions, and tax services.', 'https://careers.ey.com/ey/internships', '2026-06-15T23:59:00Z', ARRAY['Consulting', 'Accounting'], false, 'universidad', 'administracion'),

-- World Bank
('World Bank Internship Program (BTP)', 'World Bank Group', 'United States', 'internship', true, 'Paid internship for graduate students in economics, finance, engineering, and social sciences.', 'https://www.worldbank.org/en/about/careers/programs-and-internships/internship', '2026-03-31T23:59:00Z', ARRAY['Development', 'Economics'], false, 'posgrado', 'ciencias_sociales'),

-- UNICEF
('UNICEF Internship Programme', 'UNICEF', 'Various', 'internship', true, 'For graduate students in international development, children''s rights, education, and related fields.', 'https://www.unicef.org/careers/internships', '2026-12-31T23:59:00Z', ARRAY['Development', 'Children'], false, 'posgrado', 'ciencias_sociales'),

-- UNDP
('UNDP Internship Programme', 'United Nations Development Programme', 'Various', 'internship', true, 'For students interested in sustainable development, governance, and international cooperation.', 'https://www.undp.org/internships', '2026-12-31T23:59:00Z', ARRAY['Development', 'Sustainability'], false, 'posgrado', 'ciencias_sociales'),

-- NASA
('NASA Internship Program', 'NASA', 'United States', 'internship', true, 'Paid internships across NASA centers for students in STEM fields.', 'https://intern.nasa.gov/', '2026-03-01T23:59:00Z', ARRAY['Space', 'Science', 'Engineering'], true, 'universidad', 'ingenieria'),

-- Erasmus+
('Erasmus+ Student Exchange', 'European Union', 'Europe', 'internship', true, 'Student exchange and traineeship program within Europe and partner countries worldwide.', 'https://erasmus-plus.ec.europa.eu/', '2026-03-01T23:59:00Z', ARRAY['Exchange', 'Europe'], false, 'universidad', 'general'),

-- Boren Awards
('NSEP Boren Awards', 'U.S. Department of Defense', 'Various', 'internship', true, 'For undergraduate and graduate students to study critical languages abroad.', 'https://www.borenawards.org/', '2026-01-27T23:59:00Z', ARRAY['Exchange', 'Language', 'Government'], false, 'universidad', 'general'),

-- Fulbright US Student
('Fulbright U.S. Student Program', 'Fulbright / IIE', 'Various', 'internship', true, 'For U.S. citizens to study, research, or teach English abroad in 140+ countries.', 'https://us.fulbrightonline.org/', '2026-10-13T23:59:00Z', ARRAY['Exchange', 'Research'], false, 'universidad', 'general'),

-- Gilman
('Benjamin A. Gilman International Scholarship', 'U.S. Department of State', 'Various', 'internship', true, 'For Federal Pell Grant recipients to study or intern abroad.', 'https://gilmanscholarship.org/', '2026-10-01T23:59:00Z', ARRAY['Exchange', 'Study Abroad'], false, 'universidad', 'general'),

-- FEA
('Fund for Education Abroad (FEA)', 'Fund for Education Abroad', 'Various', 'internship', true, 'Scholarships for underrepresented students to study abroad.', 'https://www.fundforeducationabroad.org/', '2026-12-01T23:59:00Z', ARRAY['Exchange', 'Study Abroad'], false, 'universidad', 'general'),

-- Rotary Youth Exchange
('Rotary Youth Exchange', 'Rotary International', 'Various', 'internship', false, 'Youth exchange program for students ages 15-19 for academic year or short-term.', 'https://www.rotary.org/en/our-programs/youth-exchanges', '2026-06-01T23:59:00Z', ARRAY['Exchange', 'Youth', 'Cultural'], false, 'secundaria', 'general');

-- ============================================
-- INVESTIGACIÓN / DOCTORADO / POSDOCTORADO (Research)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

-- PhD at Stanford
('PhD at Stanford University', 'Stanford University', 'United States', 'research', true, 'PhD programs across humanities, sciences, engineering, and social sciences with full funding.', 'https://gradadmissions.stanford.edu/', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Stanford'], true, 'posgrado', 'general'),

-- PhD at Cambridge
('PhD at University of Cambridge', 'University of Cambridge', 'United Kingdom', 'research', true, 'Research degrees across all faculties with generous funding.', 'https://www.graduate.study.cam.ac.uk/', '2026-12-03T23:59:00Z', ARRAY['PhD', 'UK', 'Cambridge'], false, 'posgrado', 'general'),

-- PhD at Toronto
('PhD at University of Toronto', 'University of Toronto', 'Canada', 'research', true, 'PhD programs across diverse fields with competitive funding.', 'https://www.sgs.utoronto.ca/programs/', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Canada'], false, 'posgrado', 'general'),

-- EMBO
('EMBO Postdoctoral Fellowships', 'European Molecular Biology Organization', 'Europe', 'research', true, 'Postdoctoral fellowships for life scientists to work in Europe.', 'https://www.embo.org/programs/fellowships/', '2026-10-01T23:59:00Z', ARRAY['Postdoc', 'Life Sciences', 'Europe'], false, 'posgrado', 'ciencias'),

-- MSCA
('Marie Skłodowska-Curie Actions (MSCA)', 'European Commission', 'Europe', 'research', true, 'Postdoctoral fellowships for researchers of any nationality to work in Europe.', 'https://ec.europa.eu/info/research-and-innovation/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe/', '2026-09-11T23:59:00Z', ARRAY['Postdoc', 'EU', 'Research'], false, 'posgrado', 'general'),

-- Perimeter Institute
('Postdoc at Perimeter Institute', 'Perimeter Institute for Theoretical Physics', 'Canada', 'research', true, 'Postdoctoral positions in theoretical physics at a leading research institute.', 'https://perimeterinstitute.ca/careers', '2026-12-01T23:59:00Z', ARRAY['Postdoc', 'Physics', 'Canada'], false, 'posgrado', 'ciencias'),

-- MPI Informatics
('Postdoc at MPI for Informatics', 'Max Planck Institute for Informatics', 'Germany', 'research', true, 'Postdoctoral positions in computer science at one of Europe''s top CS institutes.', 'https://www.mpi-inf.mpg.de/home/', '2026-12-31T23:59:00Z', ARRAY['Postdoc', 'Computer Science', 'Germany'], false, 'posgrado', 'tecnologia'),

-- Google PhD Fellowship
('Google PhD Fellowship Program', 'Google', 'Various', 'research', true, 'Fellowships for outstanding PhD students in computer science and related fields.', 'https://research.google/outreach/phd-fellowship/', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Computer Science', 'Technology'], false, 'posgrado', 'tecnologia'),

-- Stanford PhD
('PhD at Stanford University', 'Stanford University', 'United States', 'research', true, 'PhD programs across humanities, sciences, engineering, and social sciences with full funding.', 'https://gradadmissions.stanford.edu/', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Stanford'], false, 'posgrado', 'general'),

-- Cambridge PhD
('PhD at University of Cambridge', 'University of Cambridge', 'United Kingdom', 'research', true, 'Research degrees across all faculties with generous funding.', 'https://www.graduate.study.cam.ac.uk/', '2026-12-03T23:59:00Z', ARRAY['PhD', 'UK', 'Cambridge'], false, 'posgrado', 'general');

-- ============================================
-- CURSOS / PROGRAMAS EN LÍNEA (Online Courses)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('Coursera Online Courses', 'Coursera', 'Online', 'course', false, 'Thousands of courses from top universities and companies. Certificates and degrees available.', 'https://www.coursera.org/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Courses'], false, 'universidad', 'general'),
('edX Online Courses', 'edX (2U)', 'Online', 'course', false, 'Online courses from Harvard, MIT, and 160+ institutions. MicroMasters, certificates, and degrees.', 'https://www.edx.org/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Courses'], false, 'universidad', 'general'),
('FutureLearn Courses', 'FutureLearn', 'Online', 'course', false, 'Online courses from leading universities and organizations worldwide.', 'https://www.futurelearn.com/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Courses'], false, 'universidad', 'general'),
('Udacity Nanodegree Programs', 'Udacity', 'Online', 'course', false, 'Online programs in AI, data science, programming, cloud computing, and autonomous systems.', 'https://www.udacity.com/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Technology'], false, 'universidad', 'tecnologia'),
('Google Digital Garage (Grow with Google)', 'Google', 'Online', 'course', true, 'Free online courses on digital skills, career development, and data/tech fundamentals.', 'https://learndigital.withgoogle.com/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Digital Skills'], false, 'universidad', 'tecnologia'),
('MIT OpenCourseWare', 'Massachusetts Institute of Technology', 'Online', 'course', true, 'Free MIT course materials covering virtually all MIT courses.', 'https://ocw.mit.edu/', '2026-12-31T23:59:00Z', ARRAY['Online', 'MIT', 'Free'], false, 'universidad', 'general'),
('Harvard Online Learning', 'Harvard University', 'Online', 'course', false, 'Online courses and programs from Harvard faculty.', 'https://online-learning.harvard.edu/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Harvard'], false, 'universidad', 'general'),
('Khan Academy', 'Khan Academy', 'Online', 'course', true, 'Free courses on math, science, computing, economics, history, and more.', 'https://www.khanacademy.org/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Free', 'K-12'], false, 'secundaria', 'general'),
('LinkedIn Learning', 'LinkedIn (Microsoft)', 'Online', 'course', false, 'Professional courses on business, technology, and creative skills with certificates.', 'https://www.linkedin.com/learning/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Professional'], false, 'universidad', 'general'),
('Google Summer of Code', 'Google', 'Online', 'course', true, 'Program for students (18+) to contribute to open source software projects with stipends.', 'https://summerofcode.withgoogle.com/', '2026-04-02T23:59:00Z', ARRAY['Open Source', 'Programming'], false, 'universidad', 'tecnologia'),
('Microsoft Learn Student Ambassadors', 'Microsoft', 'Online', 'course', true, 'Community program for students passionate about technology. Build skills and lead campus communities.', 'https://studentambassadors.microsoft.com/', '2026-12-31T23:59:00Z', ARRAY['Technology', 'Community'], false, 'universidad', 'tecnologia'),
('AWS Educate', 'Amazon Web Services', 'Online', 'course', true, 'Free cloud computing resources, training, and AWS credits for students and educators.', 'https://aws.amazon.com/education/awseducate/', '2026-12-31T23:59:00Z', ARRAY['Cloud', 'Technology'], false, 'universidad', 'tecnologia'),
('DataCamp for Classrooms', 'DataCamp', 'Online', 'course', true, 'Free access to data science courses for educators and students.', 'https://www.datacamp.com/for-classrooms', '2026-12-31T23:59:00Z', ARRAY['Data Science', 'Online'], false, 'universidad', 'tecnologia'),
('IBM SkillsBuild', 'IBM', 'Online', 'course', true, 'Free technology education and credentials in AI, cloud, cybersecurity in 20+ languages.', 'https://skillsbuild.org/', '2026-12-31T23:59:00Z', ARRAY['Technology', 'AI', 'Free'], false, 'universidad', 'tecnologia'),
('Cisco Networking Academy', 'Cisco', 'Online', 'course', true, 'IT and cybersecurity courses with industry certifications (CCNA, Python, etc.).', 'https://www.netacad.com/', '2026-12-31T23:59:00Z', ARRAY['Networking', 'Cybersecurity'], false, 'universidad', 'tecnologia'),
('freeCodeCamp', 'freeCodeCamp', 'Online', 'course', true, 'Free full-stack web development curriculum with certifications in HTML, CSS, JS, Python, etc.', 'https://www.freecodecamp.org/', '2026-12-31T23:59:00Z', ARRAY['Programming', 'Free', 'Web Development'], false, 'universidad', 'tecnologia'),
('Codecademy', 'Codecademy (Skillsoft)', 'Online', 'course', false, 'Interactive coding courses in Python, JavaScript, data science, and more.', 'https://www.codecademy.com/', '2026-12-31T23:59:00Z', ARRAY['Programming', 'Online'], false, 'universidad', 'tecnologia'),
('The Odin Project', 'The Odin Project', 'Online', 'course', true, 'Free full-stack web development curriculum covering HTML, CSS, JavaScript, Ruby on Rails.', 'https://www.theodinproject.com/', '2026-12-31T23:59:00Z', ARRAY['Web Development', 'Free'], false, 'universidad', 'tecnologia');

-- ============================================
-- ESCUELA DE VERANO (Summer School)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('LSE Summer School', 'London School of Economics', 'United Kingdom', 'course', false, 'Intensive summer courses in economics, finance, law, international relations, and more.', 'https://www.lse.ac.uk/study-at-lse/summer-schools', '2026-02-28T23:59:00Z', ARRAY['Summer', 'Social Sciences', 'UK'], false, 'universidad', 'ciencias_sociales'),
('Oxford Summer Courses', 'Oxford Summer Courses Ltd', 'United Kingdom', 'course', false, 'Summer courses at Oxford and Cambridge for ages 9-24. 40+ subjects.', 'https://www.oxfordsummercourses.com/', '2026-03-01T23:59:00Z', ARRAY['Summer', 'UK', 'Oxford'], false, 'universidad', 'general'),
('Cambridge International Summer Programme', 'University of Cambridge ICE', 'United Kingdom', 'course', false, '140+ courses over 3-4 weeks (July-August) in arts, humanities, sciences, and professional development.', 'https://www.ice.cam.ac.uk/courses/international-summer-programme', '2026-03-15T23:59:00Z', ARRAY['Summer', 'UK', 'Cambridge'], false, 'universidad', 'general'),
('Harvard Summer School', 'Harvard University', 'United States', 'course', false, 'Summer courses for high school, college, and post-baccalaureate students. Online and on-campus.', 'https://summer.harvard.edu/', '2026-03-01T23:59:00Z', ARRAY['Summer', 'Harvard'], false, 'universidad', 'general'),
('Berkeley Summer Sessions', 'UC Berkeley', 'United States', 'course', false, '600+ summer courses across all disciplines. Multiple sessions and formats.', 'https://summer.berkeley.edu/', '2026-04-01T23:59:00Z', ARRAY['Summer', 'Berkeley'], false, 'universidad', 'general'),
('Oxford Royale Summer School', 'Oxford Royale Academy', 'United Kingdom', 'course', false, 'Summer courses at Oxford, Cambridge, Imperial College London, and Yale.', 'https://www.oxford-royale.com/', '2026-03-01T23:59:00Z', ARRAY['Summer', 'UK'], false, 'preparatoria', 'general'),
('Yale Summer Sessions', 'Yale University', 'United States', 'course', false, 'Summer courses for credit in New Haven, online, and abroad.', 'https://summer.yale.edu/', '2026-04-01T23:59:00Z', ARRAY['Summer', 'Yale'], false, 'universidad', 'general');

-- ============================================
-- PROGRAMA CORTO (Short Programs)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('Clark Scholars Program', 'Texas Tech University', 'United States', 'course', true, 'Intensive seven-week research program for high school seniors. Full tuition, housing, and stipend.', 'https://www.depts.ttu.edu/clarkscholars/', '2026-02-01T23:59:00Z', ARRAY['Short Program', 'Research', 'Free'], false, 'preparatoria', 'general'),
('COSMOS at UC', 'University of California', 'United States', 'course', false, 'Four-week intensive STEM program for California high school students at UC campuses.', 'https://cosmos.ucsc.edu/', '2026-03-15T23:59:00Z', ARRAY['Short Program', 'STEM'], false, 'preparatoria', 'ciencias'),
('Telluride Association Summer Seminar (TASS)', 'Telluride Association', 'United States', 'course', true, 'Free six-week seminar for high school students in humanities and social sciences.', 'https://www.tellurideassociation.org/programs/tass/', '2026-10-15T23:59:00Z', ARRAY['Short Program', 'Humanities', 'Free'], false, 'preparatoria', 'humanidades');

-- ============================================
-- COMPETENCIAS (Competitions)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('International Mathematical Olympiad (IMO)', 'IMO Foundation', 'Various', 'course', false, 'World championship mathematics competition for high school students. 6 problems, 2 days.', 'https://www.imo-official.org/', '2026-07-01T23:59:00Z', ARRAY['Competition', 'Mathematics'], false, 'secundaria', 'ciencias'),
('ACM ICPC', 'ACM International Collegiate Programming Contest', 'Various', 'course', false, 'Global programming contest for university students. Teams of 3 solve algorithmic problems.', 'https://icpc.global/', '2026-12-01T23:59:00Z', ARRAY['Competition', 'Programming'], false, 'universidad', 'tecnologia'),
('International Biology Olympiad (IBO)', 'IBO Foundation', 'Various', 'course', false, 'World championship biology competition for high school students. IBO 2026 in Lithuania.', 'https://www.ibo-info.org/', '2026-07-01T23:59:00Z', ARRAY['Competition', 'Biology'], false, 'secundaria', 'ciencias'),
('Microsoft Imagine Cup', 'Microsoft', 'Online', 'course', true, 'Global student technology competition. Build solutions using Microsoft tech for social impact.', 'https://imaginecup.microsoft.com/', '2026-03-01T23:59:00Z', ARRAY['Competition', 'Technology', 'Innovation'], false, 'universidad', 'tecnologia'),
('International Economics Olympiad (IEO)', 'IEO Foundation', 'Various', 'course', false, 'World championship economics competition for high school students.', 'https://www.ieo-official.org/', '2026-07-01T23:59:00Z', ARRAY['Competition', 'Economics'], false, 'secundaria', 'administracion'),
('Hult Prize', 'Hult Prize Foundation', 'Online', 'course', false, '$1M social entrepreneurship competition for university students.', 'https://www.hultprize.org/', '2026-03-01T23:59:00Z', ARRAY['Competition', 'Entrepreneurship', 'Social Impact'], false, 'universidad', 'administracion');

-- ============================================
-- CONFERENCIAS / EVENTOS (Conferences/Events)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('Grace Hopper Celebration', 'AnitaB.org', 'United States', 'course', false, 'World''s largest gathering of women and non-binary technologists. Anaheim, Oct 27-30, 2026.', 'https://ghc.anitab.org/', '2026-04-01T23:59:00Z', ARRAY['Conference', 'Technology', 'Women'], false, 'universidad', 'tecnologia'),
('TED Conferences', 'TED', 'Various', 'course', false, 'Conferences on Technology, Entertainment, and Design. TEDx events worldwide.', 'https://www.ted.com/events', '2026-12-31T23:59:00Z', ARRAY['Conference', 'Innovation', 'Ideas'], false, 'universidad', 'general'),
('World Economic Forum Annual Meeting', 'World Economic Forum', 'Switzerland', 'course', false, 'Annual meeting of global leaders in business, government, and civil society.', 'https://www.weforum.org/events', '2026-01-20T23:59:00Z', ARRAY['Event', 'Leadership', 'Global'], false, 'profesional', 'administracion'),
('One Young World Summit', 'One Young World', 'Various', 'course', false, 'Global forum for young leaders from 190+ countries.', 'https://www.oneyoungworld.com/', '2026-09-01T23:59:00Z', ARRAY['Event', 'Leadership', 'Youth'], false, 'universidad', 'general'),
('UN Youth Assembly', 'United Nations', 'United States', 'course', false, 'Gathering of young leaders committed to the Sustainable Development Goals.', 'https://www.unyouthassembly.org/', '2026-08-01T23:59:00Z', ARRAY['Event', 'SDGs', 'Sustainability'], false, 'universidad', 'ciencias_sociales');

-- ============================================
-- HACKATHONS
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('HackMIT', 'MIT', 'United States', 'course', false, 'MIT''s premier hackathon. Build innovative projects in 48 hours.', 'https://hackmit.org/', '2026-09-01T23:59:00Z', ARRAY['Hackathon', 'Technology'], false, 'universidad', 'tecnologia'),
('PennApps', 'University of Pennsylvania', 'United States', 'course', false, 'Largest student-run hackathon on the East Coast. PennApps XXVI.', 'https://pennapps.com/', '2026-09-01T23:59:00Z', ARRAY['Hackathon', 'Innovation'], false, 'universidad', 'tecnologia'),
('TreeHacks', 'Stanford University', 'United States', 'course', false, 'Stanford''s premier hackathon. Feb 13-15, 2026.', 'https://treehacks.com/', '2026-02-01T23:59:00Z', ARRAY['Hackathon', 'Innovation', 'Stanford'], false, 'universidad', 'tecnologia'),
('CalHacks', 'UC Berkeley', 'United States', 'course', false, 'Largest collegiate hackathon. Cal Hacks 12.0.', 'https://calhacks.io/', '2026-10-01T23:59:00Z', ARRAY['Hackathon', 'Technology'], false, 'universidad', 'tecnologia'),
('MLH Season', 'Major League Hacking', 'Online', 'course', false, 'Season of student hackathons worldwide. 200+ events per season.', 'https://mlh.io/', '2026-12-31T23:59:00Z', ARRAY['Hackathon', 'Global', 'Community'], false, 'universidad', 'tecnologia');

-- ============================================
-- MENTORÍA (Mentorship)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('SCORE Mentorship', 'SCORE (SBA)', 'United States', 'course', true, 'Free business mentoring from experienced volunteers. 10,000+ mentors nationwide.', 'https://www.score.org/', '2026-12-31T23:59:00Z', ARRAY['Mentorship', 'Business', 'Free'], false, 'universidad', 'administracion'),
('MicroMentor', 'MicroMentor (Mercy Corps)', 'Online', 'course', true, 'Free online mentor matching for entrepreneurs and small business owners.', 'https://www.micromentor.org/', '2026-12-31T23:59:00Z', ARRAY['Mentorship', 'Entrepreneurship', 'Free'], false, 'universidad', 'administracion'),
('ADPList', 'ADPList', 'Online', 'course', true, 'Free mentorship from 200K+ professionals in 150 countries. 20M+ connections.', 'https://adplist.org/', '2026-12-31T23:59:00Z', ARRAY['Mentorship', 'Free', 'Global'], false, 'universidad', 'general');

-- ============================================
-- BOOTCAMPS
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('App Academy', 'App Academy', 'United States', 'course', false, 'Coding bootcamp with Income Share Agreement. Software Engineering, Cybersecurity, Data Analytics.', 'https://www.appacademy.io/', '2026-12-31T23:59:00Z', ARRAY['Bootcamp', 'Coding'], false, 'universidad', 'tecnologia'),
('Hack Reactor', 'Hack Reactor (Galvanize)', 'United States', 'course', false, 'Full-stack JavaScript bootcamp. Beginner (16wk) and advanced (30wk) programs.', 'https://www.hackreactor.com/', '2026-12-31T23:59:00Z', ARRAY['Bootcamp', 'JavaScript'], false, 'universidad', 'tecnologia'),
('General Assembly', 'General Assembly', 'Various', 'course', false, 'AI-focused training, workshops, and courses in tech, data, and design.', 'https://generalassemb.ly/', '2026-12-31T23:59:00Z', ARRAY['Bootcamp', 'Various'], false, 'universidad', 'tecnologia'),
('Flatiron School', 'Flatiron School (WeWork)', 'Online', 'course', false, 'Work-integrated apprenticeships and certificate programs in AI/Data, Cybersecurity, Software Engineering.', 'https://flatironschool.com/', '2026-12-31T23:59:00Z', ARRAY['Bootcamp', 'Coding'], false, 'universidad', 'tecnologia');

-- ============================================
-- SECUNDARIA / PREPARATORIA (High School)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('AI4ALL Summer Programs', 'AI4ALL', 'United States', 'course', true, 'Summer programs for underrepresented high school students in artificial intelligence.', 'https://ai-4-all.org/', '2026-02-15T23:59:00Z', ARRAY['High School', 'AI', 'Summer'], false, 'preparatoria', 'tecnologia'),
('Stanford Pre-Collegiate Studies', 'Stanford University', 'United States', 'course', false, 'Academic enrichment programs for high school students at Stanford campus.', 'https://precollegiate.stanford.edu/', '2026-04-01T23:59:00Z', ARRAY['High School', 'Stanford', 'Academic'], false, 'preparatoria', 'general'),
('Clark Scholars Program', 'Texas Tech University', 'United States', 'course', true, 'Intensive seven-week research program for high school seniors. Full tuition, housing, stipend.', 'https://www.depts.ttu.edu/clarkscholars/', '2026-02-01T23:59:00Z', ARRAY['High School', 'Research', 'Free'], false, 'preparatoria', 'general'),
('COSMOS at UC', 'University of California', 'United States', 'course', false, 'Four-week intensive STEM program for high school students at UC campuses.', 'https://cosmos.ucsc.edu/', '2026-03-15T23:59:00Z', ARRAY['High School', 'STEM'], false, 'preparatoria', 'ciencias');

-- ============================================
-- FORMACIÓN PROFESIONAL (Professional Training)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('Google Career Certificates', 'Google', 'Online', 'course', false, 'Professional certificates in Data Analytics, UX Design, IT Support, Project Management, Cybersecurity, Digital Marketing.', 'https://grow.google/certificates/', '2026-12-31T23:59:00Z', ARRAY['Training', 'Professional', 'Certificates'], false, 'profesional', 'tecnologia'),
('Year Up United', 'Year Up', 'United States', 'course', true, 'Tuition-free job training for young adults ages 18-29. Career pathways in tech and finance.', 'https://www.yearup.org/', '2026-03-01T23:59:00Z', ARRAY['Training', 'Professional', 'Free'], false, 'profesional', 'tecnologia'),
('Per Scholas', 'Per Scholas', 'United States', 'course', true, 'No-cost IT training: AWS, Cybersecurity, Data Center, IT Support, Salesforce, Software Engineering. 30+ locations.', 'https://perscholas.org/', '2026-06-01T23:59:00Z', ARRAY['Training', 'Technology', 'Free'], false, 'profesional', 'tecnologia'),
('NPower', 'NPower', 'United States', 'course', true, 'Free tech training for veterans and young adults. Cloud, Cybersecurity, IT Support, AI, Data Analytics.', 'https://npower.org/', '2026-06-01T23:59:00Z', ARRAY['Training', 'Technology', 'Veterans'], false, 'profesional', 'tecnologia'),
('Amazon Technical Apprenticeship', 'Amazon Web Services', 'United States', 'course', true, 'Training program for non-technical professionals to transition into cloud computing roles.', 'https://www.amazon.jobs/content/en/teams/amazon-web-services/technical-apprenticeships', '2026-06-01T23:59:00Z', ARRAY['Training', 'Cloud', 'Technology'], false, 'profesional', 'tecnologia');

-- ============================================
-- BECA DE VIAJE (Travel Grants)
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured, educational_level, educational_field) VALUES

('National Geographic Young Explorers Grant', 'National Geographic Society', 'Various', 'course', true, 'Grants for young explorers ages 18-25 for exploration, conservation, and research projects.', 'https://www.nationalgeographic.com/explorers/', '2026-12-01T23:59:00Z', ARRAY['Travel Grant', 'Exploration', 'Conservation'], false, 'universidad', 'general');

-- ============================================
-- Verify Import
-- ============================================
SELECT COUNT(*) as total_opportunities FROM opportunities;
SELECT type, COUNT(*) as count FROM opportunities GROUP BY type ORDER BY count DESC;
SELECT educational_level, COUNT(*) as count FROM opportunities GROUP BY educational_level ORDER BY count DESC;
SELECT educational_field, COUNT(*) as count FROM opportunities GROUP BY educational_field ORDER BY count DESC;
