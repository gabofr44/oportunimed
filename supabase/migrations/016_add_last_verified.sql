-- Fecha de ultima verificacion manual de cada oportunidad (admin la marca)
ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ;
