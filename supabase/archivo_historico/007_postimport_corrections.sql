-- Post-import corrections: fix Mexico-specific entries' types and subtypes

-- Congresos, Simposios, Reuniones → event / congress
UPDATE opportunities SET type = 'event', subtype = 'congress' WHERE
  type = 'course' AND (
  title ILIKE '%Congreso%' OR
  title ILIKE '%Simposio%' OR
  title ILIKE '%Reunión%' OR
  title ILIKE '%Foro de Investigación%' OR
  title ILIKE '%Sesiones Estatutarias%' OR
  title ILIKE '%Semana del Cerebro%'
);

-- Servicio Social → internado_ss / servicio_social
UPDATE opportunities SET type = 'internado_ss', subtype = 'servicio_social' WHERE
  title ILIKE '%Servicio Social%';

-- AMMEF Intercambios Nacionales → event / exchange
UPDATE opportunities SET type = 'event', subtype = 'exchange' WHERE
  title LIKE 'AMMEF - Intercambios Nacionales SCONE';

-- AMMEF Intercambios Internacionales → event / exchange
UPDATE opportunities SET type = 'event', subtype = 'exchange' WHERE
  title LIKE 'AMMEF - Intercambios Internacionales SCOPE/SCORE';

-- Rotary Youth Exchange → event / exchange
UPDATE opportunities SET type = 'event', subtype = 'exchange' WHERE
  title LIKE 'Rotary Youth Exchange';

-- Mission Brain Student Chapters → event / student_chapter
UPDATE opportunities SET type = 'event', subtype = 'student_chapter' WHERE
  title LIKE 'Mission Brain Student Chapters';

-- SIGN Chapter → event / student_chapter
UPDATE opportunities SET type = 'event', subtype = 'student_chapter' WHERE
  title LIKE 'SIGN Chapter México (Neurología)';

-- SMEC → event / student_chapter
UPDATE opportunities SET type = 'event', subtype = 'student_chapter' WHERE
  title LIKE 'SMEC - Sociedad Mexicana de Estudiantes en Cardiología';

-- COSMOS UC → course / summer_school
UPDATE opportunities SET type = 'course', subtype = 'summer_school' WHERE
  title LIKE 'COSMOS UC (para estudiantes mexicanos)';

-- Verify results
SELECT type, count(*) FROM opportunities GROUP BY type ORDER BY type;
SELECT subtype, count(*) FROM opportunities WHERE subtype IS NOT NULL GROUP BY subtype ORDER BY subtype;
