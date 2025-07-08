-- UDance Seed Data
-- Sample data for Buenos Aires dance community

-- Insert sample venues
INSERT INTO venues (name, address, neighborhood, capacity, contact_email, amenities) VALUES
('La Viruta', 'Armenia 1366, Buenos Aires', 'Palermo', 200, 'info@laviruta.com.ar', ARRAY['milonga', 'classes', 'bar', 'terrace']),
('Confitería Ideal', 'Suipacha 380, Buenos Aires', 'Centro', 150, 'ideal@ideal.com.ar', ARRAY['milonga', 'historic', 'cafe', 'shows']),
('Salón Canning', 'Scalabrini Ortiz 1331, Buenos Aires', 'Palermo', 120, 'canning@canning.com.ar', ARRAY['milonga', 'classes', 'air_conditioning']),
('Club Gricel', 'La Rioja 1180, Buenos Aires', 'San Cristóbal', 180, 'gricel@clubgricel.com.ar', ARRAY['milonga', 'classes', 'parking', 'historic']),
('Parakultural', 'Debaly 4950, Buenos Aires', 'Villa Urquiza', 100, 'para@parakultural.com.ar', ARRAY['classes', 'workshops', 'events', 'young_crowd']);

-- Insert sample events (using venue IDs that will be generated)
-- Note: In real implementation, you'd need to get the actual venue IDs first
INSERT INTO events (title, description, event_type, dance_style, location, date_time, duration_minutes, capacity, price, currency, is_free, skill_level, status) VALUES
('Tango Fundamentals', 'Learn the basic steps and embrace of Argentine Tango', 'class', 'Tango', 'La Viruta', NOW() + INTERVAL '2 days', 90, 30, 1500, 'ARS', false, 'beginner', 'published'),
('Milonga La Glorieta', 'Traditional milonga with live orchestra', 'milonga', 'Tango', 'Confitería Ideal', NOW() + INTERVAL '3 days', 240, 150, 2000, 'ARS', false, 'all', 'published'),
('Advanced Volcadas Workshop', 'Master the art of volcadas with maestros', 'workshop', 'Tango', 'Salón Canning', NOW() + INTERVAL '5 days', 120, 20, 3500, 'ARS', false, 'advanced', 'published'),
('Bachata Sensual Basics', 'Introduction to Bachata Sensual style', 'class', 'Bachata', 'Parakultural', NOW() + INTERVAL '1 day', 75, 25, 1200, 'ARS', false, 'beginner', 'published'),
('Salsa Social Night', 'Practice your salsa moves in a fun social environment', 'practice', 'Salsa', 'Club Gricel', NOW() + INTERVAL '4 days', 180, 80, 800, 'ARS', false, 'all', 'published'),
('Tango Festival Buenos Aires', '3-day intensive tango festival with international maestros', 'festival', 'Tango', 'Multiple Venues', NOW() + INTERVAL '10 days', 2880, 500, 15000, 'ARS', false, 'all', 'published');

INSERT INTO news (title, content, status, published_at, is_featured)
VALUES
('Bienvenidos a UDance', 'Primer artículo de la plataforma', 'published', NOW() - INTERVAL '1 day', true),
('Festival de Salsa 2025', 'Cobertura completa del festival', 'published', NOW() - INTERVAL '2 hours', false); 