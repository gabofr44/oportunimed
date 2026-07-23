-- Rastrea si ya se envio un recordatorio de deadline para cada favorito,
-- para no mandar el mismo correo todos los dias
ALTER TABLE saved_opportunities ADD COLUMN IF NOT EXISTS reminder_sent_at TIMESTAMPTZ;
