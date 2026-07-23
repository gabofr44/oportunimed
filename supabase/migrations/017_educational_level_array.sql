-- Convierte educational_level de TEXT (un solo valor) a TEXT[] (varios niveles)
-- para permitir que una oportunidad aplique a mas de un nivel educativo
-- (ej. "pregrado y posgrado" en vez de forzar a elegir solo uno)

ALTER TABLE opportunities
  ALTER COLUMN educational_level TYPE TEXT[]
  USING (CASE WHEN educational_level IS NULL THEN NULL ELSE ARRAY[educational_level] END);

-- Indice para filtrar eficientemente por nivel dentro del arreglo
CREATE INDEX IF NOT EXISTS idx_opportunities_educational_level_gin
  ON opportunities USING GIN (educational_level);
