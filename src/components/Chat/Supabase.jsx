import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qjfhwryjkkohunrcxlvs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZmh3cnlqa2tvaHVucmN4bHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNDI2OTMsImV4cCI6MjA1MTgxODY5M30.QayRpV62G0DJmpQ_TAfcuRrGQTVIaZCJ8KN6Ngqx4eo"
);
