-- Version corregida de 017: primero quita el default, cambia el tipo,
-- y le pone un default nuevo ya en formato lista

ALTER TABLE opportunities ALTER COLUMN educational_level DROP DEFAULT;

ALTER TABLE opportunities
  ALTER COLUMN educational_level TYPE TEXT[]
  USING (CASE WHEN educational_level IS NULL THEN NULL ELSE ARRAY[educational_level] END);

ALTER TABLE opportunities ALTER COLUMN educational_level SET DEFAULT ARRAY['universidad'];

CREATE INDEX IF NOT EXISTS idx_opportunities_educational_level_gin
  ON opportunities USING GIN (educational_level);

-- Verificacion: deberia mostrar el tipo de dato como ARRAY/text[]
SELECT column_name, data_type, udt_name
FROM information_schema.columns
WHERE table_name = 'opportunities' AND column_name = 'educational_level';