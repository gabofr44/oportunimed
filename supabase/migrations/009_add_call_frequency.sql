-- Migration 009: Add call_frequency column for tracking when opportunities recur
ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS call_frequency TEXT DEFAULT NULL;

COMMENT ON COLUMN opportunities.call_frequency IS 'Describes the historical recurring pattern of this opportunity (e.g., "Anual - enero", "Semestral", "Contínua", "Única")';