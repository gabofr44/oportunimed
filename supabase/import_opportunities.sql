-- ============================================
-- Import ~180 Opportunities from CSV
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- Scholarship/Beca Opportunities
-- ============================================
INSERT INTO opportunities (title, institution, location, type, funding, description, link, deadline, tags, is_featured) VALUES
('Fulbright Foreign Student Program', 'Various', 'United States', 'scholarship', true, 'For graduate students, young professionals & artists from abroad to study in the U.S.', 'https://foreign.fulbrightonline.org/', '2026-10-13T23:59:00Z', ARRAY['Fellowship', 'Graduate'], false),
('Hubert Humphrey Fellowship Program', 'Various', 'United States', 'scholarship', true, 'For experienced professionals from designated countries to strengthen leadership skills.', 'https://www.humphreyfellowship.org/', '2026-10-01T23:59:00Z', ARRAY['Fellowship', 'Professional'], false),
('Chevening Scholarships', 'Various', 'United Kingdom', 'scholarship', true, 'UK government global scholarship for future leaders.', 'https://www.chevening.org/scholarships/', '2026-11-05T23:59:00Z', ARRAY['Fellowship', 'Leadership'], true),
('Marshall Scholarships', 'Various', 'United Kingdom', 'scholarship', true, 'For intellectually distinguished young Americans to study in the UK.', 'https://www.marshallscholarship.org/', '2026-09-23T23:59:00Z', ARRAY['Fellowship', 'Graduate'], false),
('Rhodes Scholarships', 'Various', 'United Kingdom', 'scholarship', true, 'For outstanding students worldwide to study at Oxford.', 'https://www.rhodeshouse.ox.ac.uk/scholarships/', '2026-10-01T23:59:00Z', ARRAY['Fellowship', 'Graduate'], true),
('Gates Cambridge Scholarships', 'Various', 'United Kingdom', 'scholarship', true, 'For outstanding postgraduate study at Cambridge.', 'https://www.gatescambridge.org/', '2026-10-14T23:59:00Z', ARRAY['Fellowship', 'Graduate'], false),
('DAAD Scholarships', 'DAAD', 'Germany', 'scholarship', true, 'German Academic Exchange Service scholarships for international students.', 'https://www.daad.de/en/', '2026-10-15T23:59:00Z', ARRAY['Scholarship', 'Germany'], false),
('Swiss Government Excellence Scholarships', 'Swiss Confederation', 'Switzerland', 'scholarship', true, 'For foreign researchers and artists with a master degree.', 'https://www.sbfi.admin.ch/', '2026-12-01T23:59:00Z', ARRAY['Research', 'Switzerland'], false),
('Turkish Government Scholarship (Türkiye Burslari)', 'Republic of Turkiye', 'Turkey', 'scholarship', true, 'Comprehensive scholarship for international students at all levels.', 'https://www.turkiyeburslari.gov.tr/', '2026-02-20T23:59:00Z', ARRAY['Scholarship', 'Turkey'], false),
('Eiffel Excellence Scholarship', 'Various', 'France', 'scholarship', true, 'For international students enrolled in French institutions.', 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence', '2026-01-10T23:59:00Z', ARRAY['Scholarship', 'France'], false),
('Chinese Government Scholarship', 'China Scholarship Council', 'China', 'scholarship', true, 'Full scholarship for international students to study in China.', 'https://www.campuschina.org/', '2026-04-15T23:59:00Z', ARRAY['Scholarship', 'China'], false),
('Korean Government Scholarship Program (KGSP)', 'National Institute for International Education', 'South Korea', 'scholarship', true, 'Full scholarship for international students to study in Korea.', 'https://www.studyinkorea.go.kr/', '2026-03-01T23:59:00Z', ARRAY['Scholarship', 'South Korea'], false),
('MEXT Scholarship (Japanese Government)', 'Ministry of Education, Culture, Sports, Science and Technology', 'Japan', 'scholarship', true, 'Full scholarship for international students to study in Japan.', 'https://www.studyinjapan.go.jp/en/smap-stopj-applications-scholarship.html', '2026-04-26T23:59:00Z', ARRAY['Scholarship', 'Japan'], true),
('Schwarzman Scholars Program', 'Tsinghua University', 'China', 'scholarship', true, 'Fully-funded master''s at Tsinghua University focused on leadership.', 'https://www.schwarzmanscholars.org/', '2026-09-19T23:59:00Z', ARRAY['Masters', 'Leadership'], false),
('Knight-Hennessy Scholars', 'Stanford University', 'United States', 'scholarship', true, 'Full funding for graduate study at Stanford.', 'https://knight-hennessy.stanford.edu/', '2026-10-08T23:59:00Z', ARRAY['Graduate', 'Leadership'], true),
('Clarendon Fund Scholarships', 'University of Oxford', 'United Kingdom', 'scholarship', true, 'Major scholarship at Oxford covering fees and living costs.', 'https://www.clarendon.ox.ac.uk/', '2026-01-07T23:59:00Z', ARRAY['Graduate', 'Oxford'], false),
('Commonwealth Scholarships', 'Commonwealth Scholarship Commission', 'United Kingdom', 'scholarship', true, 'For students from Commonwealth countries to study in the UK.', 'https://cscuk.fcdo.gov.uk/', '2026-12-01T23:59:00Z', ARRAY['Fellowship', 'Commonwealth'], false),
('Australia Awards Scholarships', 'Australian Government', 'Australia', 'scholarship', true, 'Full scholarships for students from developing countries.', 'https://www.dfat.gov.au/people-to-people/australia-awards', '2026-04-30T23:59:00Z', ARRAY['Scholarship', 'Australia'], false),
('New Zealand Scholarships (NZSS)', 'New Zealand Ministry of Foreign Affairs', 'New Zealand', 'scholarship', true, 'Full scholarships for students from eligible countries.', 'https://www.nzaid.govt.nz/scholarships/', '2026-03-01T23:59:00Z', ARRAY['Scholarship', 'New Zealand'], false),
('Gates Millennium Scholars Program', 'Gates Foundation', 'United States', 'scholarship', true, 'Full scholarship for outstanding minority students.', 'https://www.gmsp.org/', '2026-09-15T23:59:00Z', ARRAY['Scholarship', 'Minority'], false),
('Coca-Cola Scholars Program', 'Coca-Cola Scholars Foundation', 'United States', 'scholarship', true, 'Scholarship for outstanding high school seniors.', 'https://www.coca-colascholarsfoundation.org/', '2026-10-31T23:59:00Z', ARRAY['Scholarship', 'Undergraduate'], false),
('Jack Kent Cooke Foundation College Scholarship', 'JKCF', 'United States', 'scholarship', true, 'Scholarship for high-achieving students with financial need.', 'https://www.jkcf.org/our-scholarships/', '2026-11-18T23:59:00Z', ARRAY['Scholarship', 'Undergraduate'], false),
('Barry Goldwater Scholarship', 'Goldwater Foundation', 'United States', 'scholarship', true, 'Scholarship for STEM undergraduates planning research careers.', 'https://goldwater.scholarsapply.org/', '2026-01-31T23:59:00Z', ARRAY['Scholarship', 'STEM'], false),
('Paul & Daisy Soros Fellowships', 'PDSF', 'United States', 'scholarship', true, 'Fellowships for immigrants and children of immigrants.', 'https://www.pdsoros.org/', '2026-10-26T23:59:00Z', ARRAY['Fellowship', 'Immigrants'], false),
('Hertz Foundation Fellowship', 'Hertz Foundation', 'United States', 'scholarship', true, 'Fellowship for PhD students in applied physical, biological, and engineering sciences.', 'https://www.hertzfoundation.org/the-fellowship/', '2026-10-21T23:59:00Z', ARRAY['Fellowship', 'STEM'], false),
('Ford Foundation Fellowship Programs', 'Ford Foundation', 'United States', 'scholarship', true, 'Fellowships for PhD students and postdocs committed to diversity.', 'https://sites.nationalacademies.org/pga/fordfellowships/', '2026-12-18T23:59:00Z', ARRAY['Fellowship', 'Diversity'], false),
('Soros Justice Fellowships', 'Open Society Foundations', 'United States', 'scholarship', true, 'Fellowships for individuals working on criminal justice reform.', 'https://www.opensocietyfoundations.org/grants-making/initiatives/soros-justice-fellowships', '2026-06-01T23:59:00Z', ARRAY['Fellowship', 'Justice'], false),
('Winston Churchill Foundation Scholarship', 'Churchill Foundation', 'United Kingdom', 'scholarship', true, 'For outstanding American students to pursue PhD at Cambridge.', 'https://www.churchillscholarship.org/', '2026-11-03T23:59:00Z', ARRAY['Scholarship', 'PhD'], false),
('GEM Fellowship', 'GEM', 'United States', 'scholarship', true, 'Fellowship for underrepresented minority students in STEM.', 'https://www.gemfellowship.org/', '2026-10-01T23:59:00Z', ARRAY['Fellowship', 'STEM'], false),
('Society of Women Engineers Scholarship', 'SWE', 'United States', 'scholarship', true, 'Scholarships for women pursuing engineering degrees.', 'https://swe.org/scholarships/', '2026-05-01T23:59:00Z', ARRAY['Scholarship', 'Women'], false),
('SMART Scholarship (DoD)', 'U.S. Department of Defense', 'United States', 'scholarship', true, 'Full scholarship for STEM students who commit to DoD employment.', 'https://smartscholarship.org/', '2026-12-01T23:59:00Z', ARRAY['Scholarship', 'STEM'], false),
('Stamps Scholarship at Emory University', 'Emory University', 'United States', 'scholarship', true, 'Full scholarship covering tuition, room, board, and enrichment funds.', 'https://financial.emory.edu/stamps/index.html', '2026-11-01T23:59:00Z', ARRAY['Scholarship', 'Undergraduate'], false),
('Open Society Foundations Scholarships', 'Open Society Foundations', 'Various', 'scholarship', true, 'Scholarships for students from disadvantaged backgrounds.', 'https://www.opensocietyfoundations.org/grants-making/education', '2026-06-01T23:59:00Z', ARRAY['Scholarship', 'Social Justice'], false),
('Aga Khan Foundation International Scholarship Programme', 'AKF', 'Various', 'scholarship', true, 'Scholarships for students from developing countries.', 'https://www.akdn.org/our-agencies/aga-khan-foundation', '2026-03-15T23:59:00Z', ARRAY['Scholarship', 'Development'], false),
('Rotary Foundation Global Grant Scholarships', 'Rotary International', 'Various', 'scholarship', true, 'Scholarships for graduate-level study abroad.', 'https://www.rotary.org/en/our-programs/grants', '2026-06-30T23:59:00Z', ARRAY['Scholarship', 'Graduate'], false),
('World Bank Scholarship Program', 'World Bank', 'Various', 'scholarship', true, 'Scholarships for graduate studies in development-related fields.', 'https://www.worldbank.org/en/about/careers/programs-and-internships/joint-japan-world-bank-graduate-scholarship-program', '2026-04-15T23:59:00Z', ARRAY['Scholarship', 'Development'], false),
('OPEC Fund Scholarship Program', 'OPEC Fund', 'Various', 'scholarship', true, 'Scholarships for students from developing member countries.', 'https://www.opecfund.org/', '2026-06-30T23:59:00Z', ARRAY['Scholarship', 'Development'], false),
('Islamic Development Bank Scholarships', 'IsDB', 'Various', 'scholarship', true, 'Scholarships for students from member countries.', 'https://www.isdb.org/', '2026-06-30T23:59:00Z', ARRAY['Scholarship', 'Islamic World'], false),
('Talent Scholarship at TU Delft', 'TU Delft', 'Netherlands', 'scholarship', true, 'Scholarships for talented international students.', 'https://www.tudelft.nl/en/education/financial-matters/scholarships', '2026-04-01T23:59:00Z', ARRAY['Scholarship', 'Netherlands'], false),
('Holland Scholarship', 'Dutch Ministry of Education', 'Netherlands', 'scholarship', true, 'Scholarship for non-EEA international students.', 'https://www.studyinholland.nl/finances/scholarships', '2026-02-01T23:59:00Z', ARRAY['Scholarship', 'Netherlands'], false),
('Orange Knowledge Programme (Netherlands)', 'Nuffic', 'Netherlands', 'scholarship', true, 'Scholarships for mid-career professionals from developing countries.', 'https://www.nuffic.nl/en/orange-knowledge-programme-okp', '2026-03-01T23:59:00Z', ARRAY['Scholarship', 'Professional'], false),
('Marshall Aid Commissions', 'British Government', 'United Kingdom', 'scholarship', true, 'For American students to pursue graduate study in the UK.', 'https://www.marshallscholarship.org/', '2026-09-23T23:59:00Z', ARRAY['Scholarship', 'UK'], false),
('Pierre Elliott Trudeau Foundation Doctoral Scholarships', 'Pierre Elliott Trudeau Foundation', 'Canada', 'scholarship', true, 'For outstanding doctoral candidates studying social and human sciences.', 'https://www.trudeaufoundation.ca/scholarships/doctors', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Canada'], false),

-- ============================================
-- Internship Opportunities
-- ============================================
('McKinsey & Company Summer Internship', 'McKinsey & Company', 'United States', 'internship', false, '10-week paid internship in management consulting.', 'https://www.mckinsey.com/careers/internships', '2026-06-30T23:59:00Z', ARRAY['Consulting', 'Business'], false),
('Boston Consulting Group (BCG) Internship', 'Boston Consulting Group', 'United States', 'internship', false, 'Paid internship in strategy consulting.', 'https://careers.bcg.com/internships', '2026-06-30T23:59:00Z', ARRAY['Consulting', 'Strategy'], false),
('Bain & Company Internship', 'Bain & Company', 'United States', 'internship', false, 'Summer internship in management consulting.', 'https://www.bain.com/careers/find-a-role/internships/', '2026-06-30T23:59:00Z', ARRAY['Consulting', 'Management'], false),
('Google STEP Internship', 'Google', 'United States', 'internship', true, '12-week internship for first and second-year undergraduate students.', 'https://buildyourfuture.withgoogle.com/programs/step', '2026-05-01T23:59:00Z', ARRAY['Technology', 'Software'], false),
('Microsoft Explore Internship', 'Microsoft', 'United States', 'internship', true, '12-week program for freshmen and sophomores to explore engineering roles.', 'https://careers.microsoft.com/us/en/usinternshipprogram', '2026-09-15T23:59:00Z', ARRAY['Technology', 'Engineering'], false),
('Amazon Future Engineer Internship', 'Amazon', 'United States', 'internship', true, 'Paid computer science internship with mentorship.', 'https://www.amazonfutureengineer.com/', '2026-10-15T23:59:00Z', ARRAY['Technology', 'Computer Science'], false),
('Goldman Sachs Summer Analyst Program', 'Goldman Sachs', 'United States', 'internship', false, '10-week internship in finance and banking.', 'https://www.goldmansachs.com/careers/students/programs/', '2026-05-15T23:59:00Z', ARRAY['Finance', 'Banking'], false),
('JPMorgan Chase Internship Program', 'JPMorgan Chase', 'United States', 'internship', false, 'Paid internship in various finance and technology roles.', 'https://careers.jpmorgan.com/us/en/students/internships', '2026-06-01T23:59:00Z', ARRAY['Finance', 'Technology'], false),
('Deloitte Internship Program', 'Deloitte', 'United States', 'internship', false, 'Internship in audit, consulting, financial advisory, risk, and tax.', 'https://apply.deloitte.com/careers/StudentOpportunities', '2026-06-15T23:59:00Z', ARRAY['Consulting', 'Audit'], false),
('PwC Internship Program', 'PricewaterhouseCoopers', 'United States', 'internship', false, 'Internship opportunities across audit, tax, and advisory services.', 'https://www.pwc.com/us/en/careers/students/internships.html', '2026-06-15T23:59:00Z', ARRAY['Consulting', 'Accounting'], false),
('EY Internship Program', 'Ernst & Young', 'United States', 'internship', false, 'Internship in assurance, consulting, strategy, and transactions.', 'https://careers.ey.com/ey/internships', '2026-06-15T23:59:00Z', ARRAY['Consulting', 'Accounting'], false),
('KPMG Internship Program', 'KPMG', 'United States', 'internship', false, 'Internship in audit, tax, and advisory services.', 'https://jobs.kpmg.com/early-careers/internships', '2026-06-15T23:59:00Z', ARRAY['Consulting', 'Audit'], false),
('World Bank Internship Program', 'World Bank Group', 'United States', 'internship', true, 'Paid internship for graduate students in economics, finance, and development.', 'https://www.worldbank.org/en/about/careers/programs-and-internships/internship', '2026-03-31T23:59:00Z', ARRAY['Development', 'Economics'], false),
('IMF Internship Program', 'International Monetary Fund', 'United States', 'internship', true, 'Paid internship for graduate students in economics and related fields.', 'https://www.imf.org/en/About/Recruitment/IMF-Internship-Program', '2026-03-01T23:59:00Z', ARRAY['Economics', 'Finance'], false),
('UN Internship Programme', 'United Nations', 'Various', 'internship', false, 'Internship opportunities across UN agencies worldwide.', 'https://careers.un.org/lbw/home.aspx?viewtype=SJ', '2026-12-31T23:59:00Z', ARRAY['International', 'Diplomacy'], false),
('European Commission Traineeship (Blue Book)', 'European Commission', 'Belgium', 'internship', true, 'Paid traineeship in EU institutions.', 'https://op.europa.eu/en/home', '2026-03-15T23:59:00Z', ARRAY['EU', 'Policy'], false),
('CERN Technical Student Programme', 'CERN', 'Switzerland', 'internship', true, 'Paid internship for physics, engineering, and computing students.', 'https://careers.cern/students', '2026-10-31T23:59:00Z', ARRAY['Physics', 'Engineering'], false),
('European Space Agency (ESA) Internship', 'European Space Agency', 'Various', 'internship', true, 'Internship in space science and engineering.', 'https://www.esa.int/About_Us/Careers_at_ESA/Traineeships', '2026-03-15T23:59:00Z', ARRAY['Space', 'Engineering'], false),
('NASA Internship Program', 'NASA', 'United States', 'internship', true, 'Internship opportunities across NASA centers.', 'https://intern.nasa.gov/', '2026-03-01T23:59:00Z', ARRAY['Space', 'Science'], false),
('NATO Internship Programme', 'NATO', 'Belgium', 'internship', false, 'Internship at NATO Headquarters and agencies.', 'https://www.nato.int/cps/en/natohq/topics_114903.htm', '2026-03-15T23:59:00Z', ARRAY['Security', 'International'], false),
('WHO Internship Programme', 'World Health Organization', 'Switzerland', 'internship', true, 'Internship for students in public health and related fields.', 'https://www.who.int/about/careers/internships', '2026-06-30T23:59:00Z', ARRAY['Health', 'Public Health'], false),
('UNICEF Internship Programme', 'UNICEF', 'Various', 'internship', true, 'Internship for students in international development and children''s rights.', 'https://www.unicef.org/careers/internships', '2026-12-31T23:59:00Z', ARRAY['Development', 'Children'], false),
('UNDP Internship Programme', 'UNDP', 'Various', 'internship', true, 'Internship for students in sustainable development.', 'https://www.undp.org/internships', '2026-12-31T23:59:00Z', ARRAY['Development', 'Sustainability'], false),
('FAO Internship Programme', 'FAO', 'Italy', 'internship', true, 'Internship for students in agriculture and food security.', 'https://www.fao.org/employment/internships/en/', '2026-12-31T23:59:00Z', ARRAY['Agriculture', 'Food Security'], false),
('UNESCO Internship Programme', 'UNESCO', 'France', 'internship', true, 'Internship for students in education, science, and culture.', 'https://www.unesco.org/en/careers/internships', '2026-12-31T23:59:00Z', ARRAY['Education', 'Culture'], false),
('Inter-American Development Bank Internship', 'IDB', 'United States', 'internship', true, 'Internship for graduate students in economics and development.', 'https://www.iadb.org/en/careers/internships', '2026-06-30T23:59:00Z', ARRAY['Development', 'Economics'], false),
('Asian Development Bank Internship', 'ADB', 'Philippines', 'internship', true, 'Internship for graduate students in development-related fields.', 'https://www.adb.org/careers/internships', '2026-03-15T23:59:00Z', ARRAY['Development', 'Finance'], false),

-- ============================================
-- Research/Doctorate Opportunities
-- ============================================
('PhD at MIT', 'Massachusetts Institute of Technology', 'United States', 'research', true, 'PhD programs across all engineering and science disciplines.', 'https://www.mit.edu/academics/graduate/', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Engineering'], false),
('PhD at Stanford University', 'Stanford University', 'United States', 'research', true, 'PhD programs in humanities, sciences, engineering, and social sciences.', 'https://gradadmissions.stanford.edu/', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Sciences'], false),
('PhD at University of Cambridge', 'University of Cambridge', 'United Kingdom', 'research', true, 'Research degrees across all faculties.', 'https://www.graduate.study.cam.ac.uk/', '2026-12-03T23:59:00Z', ARRAY['PhD', 'UK'], false),
('PhD at University of Oxford', 'University of Oxford', 'United Kingdom', 'research', true, 'Research degrees at the world''s oldest English-speaking university.', 'https://www.ox.ac.uk/admissions/graduate/', '2026-01-07T23:59:00Z', ARRAY['PhD', 'UK'], false),
('PhD at Caltech', 'California Institute of Technology', 'United States', 'research', true, 'PhD in engineering and applied sciences.', 'https://www.admissions.caltech.edu/graduate', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Sciences'], false),
('PhD at University of Toronto', 'University of Toronto', 'Canada', 'research', true, 'PhD programs across diverse fields.', 'https://www.sgs.utoronto.ca/programs/', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Canada'], false),
('PhD at LMU Munich', 'Ludwig Maximilian University', 'Germany', 'research', true, 'PhD positions across humanities, sciences, and medicine.', 'https://www.en.uni-muenchen.de/students/doctorate', '2026-11-30T23:59:00Z', ARRAY['PhD', 'Germany'], false),
('PhD at National University of Singapore (NUS)', 'NUS', 'Singapore', 'research', true, 'PhD programs in engineering, sciences, and social sciences.', 'https://www.grad.nus.edu.sg/programmes/', '2026-12-15T23:59:00Z', ARRAY['PhD', 'Singapore'], false),
('PhD at Seoul National University', 'SNU', 'South Korea', 'research', true, 'PhD programs in various disciplines.', 'https://gs.snu.ac.kr/eng/', '2026-11-30T23:59:00Z', ARRAY['PhD', 'South Korea'], false),
('Postdoc at Max Planck Institutes', 'Max Planck Society', 'Germany', 'research', true, 'Postdoctoral positions across research institutes in Germany.', 'https://www.mpg.de/careers/postdoc', '2026-12-31T23:59:00Z', ARRAY['Postdoc', 'Germany'], false),
('Postdoc at Howard Hughes Medical Institute', 'HHMI', 'United States', 'research', true, 'Postdoctoral research in biomedical sciences.', 'https://www.hhmi.org/careers/postdoctoral-researchers', '2026-12-31T23:59:00Z', ARRAY['Postdoc', 'Biomedical'], false),
('EMBO Postdoctoral Fellowships', 'EMBO', 'Europe', 'research', true, 'Postdoctoral fellowships for life scientists in Europe.', 'https://www.embo.org/programs/fellowships/', '2026-10-01T23:59:00Z', ARRAY['Postdoc', 'Life Sciences'], false),
('Marie Skłodowska-Curie Actions (MSCA)', 'European Commission', 'Europe', 'research', true, 'Postdoctoral fellowships for researchers of any nationality.', 'https://ec.europa.eu/info/research-and-innovation/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe/', '2026-09-11T23:59:00Z', ARRAY['Postdoc', 'EU'], false),
('Wellcome Trust Fellowships', 'Wellcome', 'United Kingdom', 'research', true, 'Fellowships for researchers in biomedical science and medical humanities.', 'https://wellcome.org/grants/funding-for-people-in-different-career-stages', '2026-12-01T23:59:00Z', ARRAY['Postdoc', 'UK'], false),
('SNSF Postdoc.Mobility', 'Swiss National Science Foundation', 'Switzerland', 'research', true, 'Postdoctoral fellowships for mobility to/from Switzerland.', 'https://www.snf.ch/en/apply-for-funding/programmes/postdoc-mobility', '2026-12-01T23:59:00Z', ARRAY['Postdoc', 'Switzerland'], false),
('JSPS Postdoctoral Fellowship', 'Japan Society for the Promotion of Science', 'Japan', 'research', true, 'Postdoctoral fellowships for researchers to work in Japan.', 'https://www.jsps.go.jp/en/e-postdoc/', '2026-04-15T23:59:00Z', ARRAY['Postdoc', 'Japan'], false),
('Postdoc at CERN', 'CERN', 'Switzerland', 'research', true, 'Postdoctoral positions in particle physics and related fields.', 'https://careers.cern/positions', '2026-12-31T23:59:00Z', ARRAY['Postdoc', 'Physics'], false),
('Postdoc at ESA', 'European Space Agency', 'Various', 'research', true, 'Postdoctoral positions in space science and engineering.', 'https://www.esa.int/About_Us/Careers_at_ESA/Postdoctoral programmes', '2026-12-31T23:59:00Z', ARRAY['Postdoc', 'Space'], false),
('Postdoc at EMBL', 'European Molecular Biology Laboratory', 'Germany', 'research', true, 'Postdoctoral positions in molecular biology.', 'https://www.embl.org/jobs/', '2026-12-31T23:59:00Z', ARRAY['Postdoc', 'Biology'], false),
('Postdoc at IAS Princeton', 'Institute for Advanced Study', 'United States', 'research', true, 'Postdoctoral positions in theoretical physics and mathematics.', 'https://www.ias.edu/schools/mathematics', '2026-12-01T23:59:00Z', ARRAY['Postdoc', 'Theoretical'], false),
('Postdoc at Perimeter Institute', 'Perimeter Institute', 'Canada', 'research', true, 'Postdoctoral positions in theoretical physics.', 'https://perimeterinstitute.ca/careers', '2026-12-01T23:59:00Z', ARRAY['Postdoc', 'Physics'], false),
('Postdoc at MPI for Informatics', 'Max Planck Institute for Informatics', 'Germany', 'research', true, 'Postdoctoral positions in computer science.', 'https://www.mpi-inf.mpg.de/home/', '2026-12-31T23:59:00Z', ARRAY['Postdoc', 'Computer Science'], false),
('Google PhD Fellowship Program', 'Google', 'Various', 'research', true, 'Fellowships for outstanding PhD students in computer science and related fields.', 'https://research.google/outreach/phd-fellowship/', '2026-12-01T23:59:00Z', ARRAY['PhD', 'Computer Science'], false),
('Facebook Fellowship Program', 'Meta', 'Online', 'research', true, 'Fellowships for PhD students in computer science and related fields.', 'https://research.fb.com/fellowship/', '2026-10-01T23:59:00Z', ARRAY['PhD', 'Technology'], false),
('Microsoft Research PhD Fellowship', 'Microsoft', 'United States', 'research', true, 'Fellowships for outstanding PhD students in computer science.', 'https://www.microsoft.com/en-us/research/academic-program/phd-fellowship/', '2026-10-15T23:59:00Z', ARRAY['PhD', 'Technology'], false),
('IBM PhD Fellowship Award', 'IBM', 'Various', 'research', true, 'Fellowships for outstanding PhD students in areas aligned with IBM research.', 'https://www.ibm.com/academic/topic/phd-fellowship', '2026-10-01T23:59:00Z', ARRAY['PhD', 'Technology'], false),
('NVIDIA Graduate Fellowship', 'NVIDIA', 'United States', 'research', true, 'Fellowships for PhD students in GPU computing.', 'https://www.nvidia.com/en-us/research/', '2026-12-01T23:59:00Z', ARRAY['PhD', 'AI'], false),
('Qualcomm Innovation Fellowship', 'Qualcomm', 'United States', 'research', true, 'Fellowships for PhD students in electrical and computer engineering.', 'https://www.qualcomm.com/invention/research/fellowships', '2026-10-01T23:59:00Z', ARRAY['PhD', 'Engineering'], false),
('Intel PhD Fellowship', 'Intel', 'United States', 'research', true, 'Fellowships for PhD students in electrical and computer engineering.', 'https://www.intel.com/content/www/us/en/corporate-responsibility/intel-phd-fellowship.html', '2026-10-01T23:59:00Z', ARRAY['PhD', 'Engineering'], false),

-- ============================================
-- Course/Program Opportunities
-- ============================================
('Coursera Online Courses', 'Coursera', 'Online', 'course', false, 'Thousands of courses from top universities and companies.', 'https://www.coursera.org/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Courses'], false),
('edX Online Courses', 'edX', 'Online', 'course', false, 'Online courses from Harvard, MIT, and other top institutions.', 'https://www.edx.org/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Courses'], false),
('FutureLearn Courses', 'FutureLearn', 'Online', 'course', false, 'Online courses from leading universities and organizations.', 'https://www.futurelearn.com/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Courses'], false),
('Udacity Nanodegree Programs', 'Udacity', 'Online', 'course', false, 'Online programs in AI, data science, programming, and more.', 'https://www.udacity.com/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Technology'], false),
('Google Digital Garage Courses', 'Google', 'Online', 'course', true, 'Free online courses on digital skills and career development.', 'https://learndigital.withgoogle.com/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Digital Skills'], false),
('MIT OpenCourseWare', 'MIT', 'Online', 'course', true, 'Free MIT course materials online.', 'https://ocw.mit.edu/', '2026-12-31T23:59:00Z', ARRAY['Online', 'MIT'], false),
('Harvard Online Courses', 'Harvard University', 'Online', 'course', false, 'Online courses and programs from Harvard.', 'https://online-learning.harvard.edu/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Harvard'], false),
('Khan Academy', 'Khan Academy', 'Online', 'course', true, 'Free courses on math, science, computing, and more.', 'https://www.khanacademy.org/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Free'], false),
('LinkedIn Learning Courses', 'LinkedIn Learning', 'Online', 'course', false, 'Professional courses on business, technology, and creative skills.', 'https://www.linkedin.com/learning/', '2026-12-31T23:59:00Z', ARRAY['Online', 'Professional'], false),
('Apple Developer Academy', 'Apple', 'Italy', 'course', true, 'Training program for app development and entrepreneurship.', 'https://developeracademy.apple.com/', '2026-09-30T23:59:00Z', ARRAY['Technology', 'iOS'], false),
('Google Summer of Code', 'Google', 'Online', 'course', true, 'Program for students to contribute to open source projects.', 'https://summerofcode.withgoogle.com/', '2026-04-02T23:59:00Z', ARRAY['Open Source', 'Programming'], false),
('Microsoft Learn Student Ambassadors', 'Microsoft', 'Online', 'course', true, 'Community program for students passionate about technology.', 'https://studentambassadors.microsoft.com/', '2026-12-31T23:59:00Z', ARRAY['Technology', 'Community'], false),
('AWS Educate', 'Amazon Web Services', 'Online', 'course', true, 'Free cloud computing resources and training for students.', 'https://aws.amazon.com/education/awseducate/', '2026-12-31T23:59:00Z', ARRAY['Cloud', 'Technology'], false),
('DataCamp for Classrooms', 'DataCamp', 'Online', 'course', true, 'Free access to data science courses for educators and students.', 'https://www.datacamp.com/universities', '2026-12-31T23:59:00Z', ARRAY['Data Science', 'Online'], false),
('IBM SkillsBuild', 'IBM', 'Online', 'course', true, 'Free technology education and credentials.', 'https://skillsbuild.org/', '2026-12-31T23:59:00Z', ARRAY['Technology', 'AI'], false),
('Cisco Networking Academy', 'Cisco', 'Online', 'course', true, 'IT and cybersecurity courses with certification.', 'https://www.netacad.com/', '2026-12-31T23:59:00Z', ARRAY['Networking', 'Cybersecurity'], false),
('FreeCodeCamp', 'freeCodeCamp', 'Online', 'course', true, 'Free coding bootcamp and certification.', 'https://www.freecodecamp.org/', '2026-12-31T23:59:00Z', ARRAY['Programming', 'Free'], false),
('Codecademy', 'Codecademy', 'Online', 'course', false, 'Interactive coding courses in various languages.', 'https://www.codecademy.com/', '2026-12-31T23:59:00Z', ARRAY['Programming', 'Online'], false),
('LeetCode', 'LeetCode', 'Online', 'course', false, 'Platform for coding interview preparation.', 'https://leetcode.com/', '2026-12-31T23:59:00Z', ARRAY['Programming', 'Interviews'], false),
('The Odin Project', 'The Odin Project', 'Online', 'course', true, 'Free full-stack web development curriculum.', 'https://www.theodinproject.com/', '2026-12-31T23:59:00Z', ARRAY['Web Development', 'Free'], false),

-- ============================================
-- Summer School Opportunities
-- ============================================
('CERN Summer Student Programme', 'CERN', 'Switzerland', 'course', true, '8-week program for physics and engineering students.', 'https://careers.cern/programs/summer-student-programme', '2026-03-01T23:59:00Z', ARRAY['Physics', 'Summer'], false),
('DAAD Summer Schools in Germany', 'DAAD', 'Germany', 'course', false, 'Summer courses at German universities for international students.', 'https://www.daad.de/en/study-and-research-in-germany/courses-in-germany/', '2026-01-15T23:59:00Z', ARRAY['Summer', 'Germany'], false),
('London School of Economics Summer School', 'LSE', 'United Kingdom', 'course', false, 'Intensive summer courses in social sciences.', 'https://www.lse.ac.uk/study-at-lse/summer-schools', '2026-02-28T23:59:00Z', ARRAY['Summer', 'Social Sciences'], false),
('MIT Summer Research Program (MSRP)', 'MIT', 'United States', 'course', true, 'Summer research program for underrepresented students.', 'https://msrp.mit.edu/', '2026-02-15T23:59:00Z', ARRAY['Research', 'Summer'], false),
('Stanford Pre-Collegiate Studies', 'Stanford University', 'United States', 'course', false, 'Summer academic programs for high school students.', 'https://precollegiate.stanford.edu/', '2026-04-01T23:59:00Z', ARRAY['Summer', 'High School'], false),
('Oxford Summer Courses', 'Various', 'United Kingdom', 'course', false, 'Summer courses at Oxford for adults and high school students.', 'https://www.oxfordsummercourses.com/', '2026-03-01T23:59:00Z', ARRAY['Summer', 'UK'], false),
('Cambridge International Summer Programme', 'University of Cambridge', 'United Kingdom', 'course', false, 'Summer courses at Cambridge.', 'https://www.ice.cam.ac.uk/courses/international-summer-programme', '2026-03-15T23:59:00Z', ARRAY['Summer', 'UK'], false),
('Yale Young Global Scholars', 'Yale University', 'United States', 'course', false, 'Summer academic and leadership program for high school students.', 'https://yygs.yale.edu/', '2026-01-10T23:59:00Z', ARRAY['Summer', 'Leadership'], false),
('Harvard Summer School', 'Harvard University', 'United States', 'course', false, 'Summer courses for college students and pre-college students.', 'https://summer.harvard.edu/', '2026-03-01T23:59:00Z', ARRAY['Summer', 'Harvard'], false),
('Berkeley Summer Sessions', 'UC Berkeley', 'United States', 'course', false, 'Summer courses across various disciplines.', 'https://summer.berkeley.edu/', '2026-04-01T23:59:00Z', ARRAY['Summer', 'Berkeley'], false),

-- ============================================
-- Short Program Opportunities
-- ============================================
('Yale Young Global Scholars', 'Yale University', 'United States', 'course', false, 'Two-week academic and leadership program for high school students.', 'https://yygs.yale.edu/', '2026-01-10T23:59:00Z', ARRAY['Short Program', 'Leadership'], false),
('Telluride Association Summer Seminar (TASS)', 'Telluride Association', 'United States', 'course', true, 'Free six-week seminar for high school students.', 'https://www.tellurideassociation.org/programs/telluride-association-summer-seminar-tass/', '2026-10-15T23:59:00Z', ARRAY['Short Program', 'Free'], false),
('Research Science Institute (RSI)', 'MIT', 'United States', 'course', true, 'Free six-week program combining scientific theory and hands-on research.', 'https://www.centerforrays.org/', '2026-02-15T23:59:00Z', ARRAY['Short Program', 'Research'], false),
('Garcia Center Summer Research Program', 'University of Michigan', 'United States', 'course', true, 'Summer research for underrepresented students in engineering.', 'https://me.engin.umich.edu/programs/undergraduate/garcia-research-scholars/', '2026-03-01T23:59:00Z', ARRAY['Short Program', 'Engineering'], false),
('Clark Scholars Program', 'Texas Tech University', 'United States', 'course', true, 'Intensive seven-week research program for high school seniors.', 'https://www.depts.ttu.edu/clarkscholars/', '2026-02-01T23:59:00Z', ARRAY['Short Program', 'Research'], false),
('COSMOS at UC', 'University of California', 'United States', 'course', false, 'Four-week intensive STEM program for high school students.', 'https://cosmos.ucsc.edu/', '2026-03-15T23:59:00Z', ARRAY['Short Program', 'STEM'], false),

-- ============================================
-- Conference Opportunities
-- ============================================
('ACM Student Research Competition', 'ACM', 'Various', 'course', false, 'Research competition for undergraduate and graduate students.', 'https://www.acm.org/conferences/src', '2026-06-01T23:59:00Z', ARRAY['Conference', 'Research'], false),
('Grace Hopper Celebration', 'AnitaB.org', 'United States', 'course', false, 'World''s largest gathering of women technologists.', 'https://ghc.anitab.org/', '2026-04-01T23:59:00Z', ARRAY['Conference', 'Technology'], false),
('IEEE conferences', 'IEEE', 'Various', 'course', false, 'Technical conferences across all areas of engineering and technology.', 'https://www.ieee.org/conferences/index.html', '2026-12-31T23:59:00Z', ARRAY['Conference', 'Engineering'], false),
('TED conferences', 'TED', 'Various', 'course', false, 'Conferences on technology, entertainment, and design.', 'https://www.ted.com/events', '2026-12-31T23:59:00Z', ARRAY['Conference', 'Innovation'], false),
('World Economic Forum Events', 'WEF', 'Various', 'course', false, 'Events bringing together leaders from business, government, and academia.', 'https://www.weforum.org/events', '2026-12-31T23:59:00Z', ARRAY['Conference', 'Leadership'], false),

-- ============================================
-- Workshop Opportunities
-- ============================================
('Google DevFest', 'Google', 'Various', 'course', false, 'Community-led developer events hosted by Google Developer Groups.', 'https://developers.google.com/community/devfest', '2026-12-31T23:59:00Z', ARRAY['Workshop', 'Technology'], false),
('MLH Fellowship', 'Major League Hacking', 'Online', 'course', true, 'Paid remote fellowship for aspiring software engineers.', 'https://fellowship.mlh.io/', '2026-10-01T23:59:00Z', ARRAY['Fellowship', 'Programming'], false),
('GitHub Campus Experts', 'GitHub', 'Online', 'course', true, 'Training program to empower student leaders in technology.', 'https://education.github.com/', '2026-06-01T23:59:00Z', ARRAY['Workshop', 'Leadership'], false),
('Outreachy', 'Software Freedom Conservancy', 'Online', 'course', true, 'Paid internships in free software and open source.', 'https://www.outreachy.org/', '2026-02-01T23:59:00Z', ARRAY['Workshop', 'Open Source'], false),
('Girlscript Summer of Code', 'Girlscript Foundation', 'Online', 'course', true, 'Open source program for beginners.', 'https://gssoc.girlscript.tech/', '2026-03-15T23:59:00Z', ARRAY['Workshop', 'Open Source'], false),
('Hacktoberfest', 'DigitalOcean', 'Online', 'course', true, 'Open source challenge during October.', 'https://hacktoberfest.com/', '2026-10-31T23:59:00Z', ARRAY['Workshop', 'Open Source'], false),

-- ============================================
-- Competition Opportunities
-- ============================================
('International Mathematical Olympiad (IMO)', 'IMO', 'Various', 'course', false, 'World championship mathematics competition for high school students.', 'https://www.imo-official.org/', '2026-07-01T23:59:00Z', ARRAY['Competition', 'Mathematics'], false),
('International Physics Olympiad (IPhO)', 'IPhO', 'Various', 'course', false, 'World championship physics competition for high school students.', 'https://www.icho-official.org/', '2026-07-01T23:59:00Z', ARRAY['Competition', 'Physics'], false),
('ACM International Collegiate Programming Contest (ICPC)', 'ACM', 'Various', 'course', false, 'Global programming competition for university students.', 'https://icpc.global/', '2026-12-01T23:59:00Z', ARRAY['Competition', 'Programming'], false),
('International Biology Olympiad (IBO)', 'IBO', 'Various', 'course', false, 'World championship biology competition for high school students.', 'https://www.ibo-info.org/', '2026-07-01T23:59:00Z', ARRAY['Competition', 'Biology'], false),
('International Chemistry Olympiad (IChO)', 'IChO', 'Various', 'course', false, 'World championship chemistry competition for high school students.', 'https://www.icho36.org/', '2026-07-01T23:59:00Z', ARRAY['Competition', 'Chemistry'], false),
('International Olympiad in Informatics (IOI)', 'IOI', 'Various', 'course', false, 'World championship computing competition for high school students.', 'https://www.ioi.org/', '2026-08-01T23:59:00Z', ARRAY['Competition', 'Informatics'], false),
('Microsoft Imagine Cup', 'Microsoft', 'Online', 'course', true, 'Technology competition for student entrepreneurs.', 'https://imaginecup.microsoft.com/', '2026-03-01T23:59:00Z', ARRAY['Competition', 'Technology'], false),
('Google Code Jam', 'Google', 'Online', 'course', false, 'Global programming competition.', 'https://codingcompetitions.withgoogle.com/codejam', '2026-04-01T23:59:00Z', ARRAY['Competition', 'Programming'], false),
('TopCoder Open', 'TopCoder', 'Online', 'course', false, 'Competitive programming and development competitions.', 'https://www.topcoder.com/', '2026-12-31T23:59:00Z', ARRAY['Competition', 'Programming'], false),
('International Economics Olympiad (IEO)', 'IEO', 'Various', 'course', false, 'World championship economics competition for high school students.', 'https://www.ieo-official.org/', '2026-07-01T23:59:00Z', ARRAY['Competition', 'Economics'], false),
('Hult Prize', 'Hult Prize Foundation', 'Online', 'course', false, 'Social entrepreneurship competition for university students.', 'https://www.hultprize.org/', '2026-03-01T23:59:00Z', ARRAY['Competition', 'Entrepreneurship'], false),

-- ============================================
-- Exchange Opportunities
-- ============================================
('Erasmus+ Student Exchange', 'European Union', 'Europe', 'internship', true, 'Student exchange program within Europe and partner countries.', 'https://erasmus-plus.ec.europa.eu/', '2026-03-01T23:59:00Z', ARRAY['Exchange', 'Europe'], false),
('NSEP Boren Awards', 'U.S. Department of Defense', 'Various', 'internship', true, 'Scholarships for intensive language study and study abroad.', 'https://www.borenawards.org/', '2026-01-27T23:59:00Z', ARRAY['Exchange', 'Language'], false),
('Fulbright U.S. Student Program', 'Fulbright', 'Various', 'internship', true, 'Study, research, or English teaching abroad.', 'https://us.fulbrightonline.org/', '2026-10-13T23:59:00Z', ARRAY['Exchange', 'Research'], false),
('Gilman Scholarship', 'U.S. Department of State', 'Various', 'internship', true, 'Scholarship for Federal Pell Grant recipients to study abroad.', 'https://gilmanscholarship.org/', '2026-10-01T23:59:00Z', ARRAY['Exchange', 'Study Abroad'], false),
('Fund for Education Abroad', 'FEA', 'Various', 'internship', true, 'Scholarships for underrepresented students to study abroad.', 'https://www.fundforeducationabroad.org/', '2026-12-01T23:59:00Z', ARRAY['Exchange', 'Study Abroad'], false),
('Critical Language Scholarship (CLS)', 'U.S. Department of State', 'Various', 'internship', true, 'Intensive summer language program for American students.', 'https://clsprogram.clsp.org/', '2026-11-15T23:59:00Z', ARRAY['Exchange', 'Language'], false),
('NSLI-Y (National Security Language Initiative for Youth)', 'U.S. Department of State', 'Various', 'internship', true, 'Summer language immersion for American high school students.', 'https://www.nsli-y.org/', '2026-11-01T23:59:00Z', ARRAY['Exchange', 'Language'], false),
('AFS Intercultural Programs', 'AFS', 'Various', 'internship', false, 'International exchange programs for high school students.', 'https://www.afs.org/', '2026-03-01T23:59:00Z', ARRAY['Exchange', 'Cultural'], false),
('Rotary Youth Exchange', 'Rotary International', 'Various', 'internship', false, 'Youth exchange program for high school students.', 'https://www.rotary.org/en/our-programs/youth-exchanges', '2026-06-01T23:59:00Z', ARRAY['Exchange', 'Youth'], false),

-- ============================================
-- Professional Training Opportunities
-- ============================================
('Amazon Technical Academy', 'Amazon', 'United States', 'course', true, 'Training program for non-technical employees to transition into software engineering.', 'https://www.amazoncareers.com/amazon-technical-academy', '2026-06-01T23:59:00Z', ARRAY['Training', 'Technology'], false),
('Google Career Certificates', 'Google', 'Online', 'course', false, 'Professional certificates in data analytics, UX design, IT support, and project management.', 'https://grow.google/certificates/', '2026-12-31T23:59:00Z', ARRAY['Training', 'Professional'], false),
('Microsoft Leap Apprenticeship', 'Microsoft', 'United States', 'course', true, 'Technology apprenticeship program.', 'https://www.leap.microsoft.com/', '2026-09-01T23:59:00Z', ARRAY['Training', 'Technology'], false),
('Accenture Apprenticeship', 'Accenture', 'United States', 'course', false, 'Apprenticeship in technology and consulting.', 'https://www.accenture.com/us-en/careers/apprenticeship', '2026-06-01T23:59:00Z', ARRAY['Training', 'Consulting'], false),
('IBM Apprenticeship Program', 'IBM', 'United States', 'course', true, 'Apprenticeship in technology roles.', 'https://www.ibm.com/apprenticeships', '2026-06-01T23:59:00Z', ARRAY['Training', 'Technology'], false),
('Year Up', 'Year Up', 'United States', 'course', true, 'Professional training for young adults.', 'https://www.yearup.org/', '2026-03-01T23:59:00Z', ARRAY['Training', 'Professional'], false),
('Per Scholas', 'Per Scholas', 'United States', 'course', true, 'Free technology training for unemployed and underemployed adults.', 'https://perscholas.org/', '2026-06-01T23:59:00Z', ARRAY['Training', 'Technology'], false),
('NPower', 'NPower', 'United States', 'course', true, 'Free technology training for veterans and young adults from underserved communities.', 'https://npower.org/', '2026-06-01T23:59:00Z', ARRAY['Training', 'Technology'], false),

-- ============================================
-- Mentorship Opportunities
-- ============================================
('SCORE Mentorship Program', 'SCORE', 'United States', 'course', true, 'Free business mentoring and education.', 'https://www.score.org/', '2026-12-31T23:59:00Z', ARRAY['Mentorship', 'Business'], false),
('MicroMentor', 'MicroMentor', 'Online', 'course', true, 'Free mentor matching for entrepreneurs.', 'https://www.micromentor.org/', '2026-12-31T23:59:00Z', ARRAY['Mentorship', 'Entrepreneurship'], false),
('ADPList', 'ADPList', 'Online', 'course', true, 'Free mentorship from professionals worldwide.', 'https://adplist.org/', '2026-12-31T23:59:00Z', ARRAY['Mentorship', 'Free'], false),

-- ============================================
-- Bootcamp Opportunities
-- ============================================
('App Academy', 'App Academy', 'United States', 'course', false, 'Coding bootcamp with income share agreement.', 'https://www.appacademy.io/', '2026-12-31T23:59:00Z', ARRAY['Bootcamp', 'Coding'], false),
('Hack Reactor', 'Hack Reactor', 'United States', 'course', false, 'Coding bootcamp focused on full-stack JavaScript.', 'https://www.hackreactor.com/', '2026-12-31T23:59:00Z', ARRAY['Bootcamp', 'JavaScript'], false),
('General Assembly', 'General Assembly', 'Various', 'course', false, 'Coding, data science, and digital marketing bootcamps.', 'https://generalassemb.ly/', '2026-12-31T23:59:00Z', ARRAY['Bootcamp', 'Various'], false),
('Flatiron School', 'Flatiron School', 'Online', 'course', false, 'Coding bootcamps in software engineering, data science, and cybersecurity.', 'https://flatironschool.com/', '2026-12-31T23:59:00Z', ARRAY['Bootcamp', 'Coding'], false),
('Springboard', 'Springboard', 'Online', 'course', false, 'Online bootcamps in data science, UX design, and software engineering.', 'https://www.springboard.com/', '2026-12-31T23:59:00Z', ARRAY['Bootcamp', 'Online'], false),

-- ============================================
-- Hackathon Opportunities
-- ============================================
('HackMIT', 'MIT', 'United States', 'course', false, 'Premier hackathon at MIT.', 'https://hackmit.org/', '2026-09-01T23:59:00Z', ARRAY['Hackathon', 'Technology'], false),
('PennApps', 'University of Pennsylvania', 'United States', 'course', false, 'Largest student-run hackathon on the East Coast.', 'https://pennapps.com/', '2026-09-01T23:59:00Z', ARRAY['Hackathon', 'Innovation'], false),
('TreeHacks', 'Stanford University', 'United States', 'course', false, 'Stanford''s premier hackathon.', 'https://treehacks.com/', '2026-02-01T23:59:00Z', ARRAY['Hackathon', 'Innovation'], false),
('CalHacks', 'UC Berkeley', 'United States', 'course', false, 'Largest collegiate hackathon.', 'https://calhacks.io/', '2026-10-01T23:59:00Z', ARRAY['Hackathon', 'Technology'], false),

-- ============================================
-- High School Opportunities
-- ============================================
('Girls Who Code Summer Immersion Program', 'Girls Who Code', 'United States', 'course', true, 'Free summer program for high school girls interested in computer science.', 'https://girlswhocode.com/programs/summer-immersion-program', '2026-02-01T23:59:00Z', ARRAY['High School', 'Computer Science'], false),
('AI4ALL', 'AI4ALL', 'United States', 'course', true, 'Summer programs for underrepresented students in AI.', 'https://ai-4-all.org/', '2026-02-15T23:59:00Z', ARRAY['High School', 'AI'], false),
('NASA OSTEM Internship', 'NASA', 'United States', 'course', true, 'Internship for high school students in STEM fields.', 'https://intern.nasa.gov/', '2026-03-01T23:59:00Z', ARRAY['High School', 'Space'], false),

-- ============================================
-- Summer Program Opportunities
-- ============================================
('Oxford Royale Summer School', 'Oxford Royale Academy', 'United Kingdom', 'course', false, 'Summer courses at Oxford and Cambridge.', 'https://www.oxford-royale.com/', '2026-03-01T23:59:00Z', ARRAY['Summer Program', 'UK'], false),
('Cambridge International Summer Programme', 'University of Cambridge', 'United Kingdom', 'course', false, 'Summer courses at Cambridge.', 'https://www.ice.cam.ac.uk/courses/international-summer-programme', '2026-03-15T23:59:00Z', ARRAY['Summer Program', 'UK'], false),
('Yale Summer Sessions', 'Yale University', 'United States', 'course', false, 'Summer courses for credit.', 'https://summer.yale.edu/', '2026-04-01T23:59:00Z', ARRAY['Summer Program', 'Yale'], false),
('Columbia Summer Immersion', 'Columbia University', 'United States', 'course', false, 'Summer courses for high school students.', 'https://precollege.columbia.edu/', '2026-03-01T23:59:00Z', ARRAY['Summer Program', 'Columbia'], false),

-- ============================================
-- Travel Grant Opportunities
-- ============================================
('National Geographic Young Explorers Grant', 'National Geographic', 'Various', 'course', true, 'Grants for young explorers aged 18-25.', 'https://www.nationalgeographic.com/explorers/grants/', '2026-12-01T23:59:00Z', ARRAY['Travel Grant', 'Exploration'], false),
('Royal Geographical Society Grants', 'RGS', 'United Kingdom', 'course', false, 'Grants for geographical research and expeditions.', 'https://www.rgs.org/our-work/grants-and-fellowships/', '2026-12-01T23:59:00Z', ARRAY['Travel Grant', 'Geography'], false),
('The Explorer''s Passage Scholarships', 'TEP', 'Various', 'course', true, 'Scholarships for adventure travel programs.', 'https://explorerspassage.com/', '2026-06-01T23:59:00Z', ARRAY['Travel Grant', 'Adventure'], false),

-- ============================================
-- Event/Forum Opportunities
-- ============================================
('World Economic Forum Annual Meeting', 'WEF', 'Switzerland', 'course', false, 'Annual meeting of global leaders.', 'https://www.weforum.org/events/world-economic-forum-annual-meeting-2026', '2026-01-20T23:59:00Z', ARRAY['Event', 'Leadership'], false),
('Clinton Global Initiative University', 'CGI U', 'United States', 'course', false, 'Meeting of young leaders committed to making a difference.', 'https://www.clintonglobalinitiative.org/', '2026-03-01T23:59:00Z', ARRAY['Event', 'Social Impact'], false),
('One Young World Summit', 'One Young World', 'Various', 'course', false, 'Global forum for young leaders.', 'https://www.oneyoungworld.com/', '2026-09-01T23:59:00Z', ARRAY['Event', 'Leadership'], false),
('European Youth Event (EYE)', 'European Parliament', 'France', 'course', false, 'Event bringing together thousands of young Europeans.', 'https://www.europarl.europa.eu/eeyoungevent/', '2026-06-01T23:59:00Z', ARRAY['Event', 'Europe'], false),
('UN Youth Assembly', 'United Nations', 'United States', 'course', false, 'Gathering of young leaders committed to the SDGs.', 'https://www.unyouthassembly.org/', '2026-08-01T23:59:00Z', ARRAY['Event', 'Sustainability'], false);

-- ============================================
-- Verify Import
-- ============================================
SELECT COUNT(*) as total_opportunities FROM opportunities;
SELECT type, COUNT(*) as count FROM opportunities GROUP BY type;
