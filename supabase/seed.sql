insert into public.interests (slug, label) values
  ('cine','Cine'), ('cafes','Cafés'), ('beauty','Beauty'), ('kpop','K-pop'), ('fotografia','Fotografía'),
  ('moda','Moda'), ('libros','Libros'), ('museos','Museos'), ('ceramica','Cerámica'), ('pilates','Pilates')
on conflict (slug) do nothing;

insert into public.profiles (id, display_name, birth_date, approximate_area, bio, verified) values
  ('10000000-0000-4000-8000-000000000001','Valeria','2002-05-10','San Borja','Cine, cafés y fotografía.',true),
  ('10000000-0000-4000-8000-000000000002','Mica','2001-03-14','Surco','Beauty, K-pop y brunch.',true),
  ('10000000-0000-4000-8000-000000000003','Alessia','2002-08-22','Miraflores','Libros, cerámica y museos.',true),
  ('10000000-0000-4000-8000-000000000004','Sofía','2003-11-02','Barranco','Arte, conciertos y cafés.',true),
  ('10000000-0000-4000-8000-000000000005','Daniela','2000-01-09','San Isidro','Pilates, restaurantes y moda.',true)
on conflict (id) do nothing;

insert into public.places (id, name, category, commercial_address, district, latitude, longitude, budget_min, budget_max, verification_status) values
  ('20000000-0000-4000-8000-000000000001','Café Lila','Cafetería','Av. Primavera 410 · ficticia','San Borja',-12.1041,-76.9992,20,45,'verified'),
  ('20000000-0000-4000-8000-000000000002','Matcha House','Cafetería','Calle Peonía 122 · ficticia','Miraflores',-12.1191,-77.0310,25,55,'verified'),
  ('20000000-0000-4000-8000-000000000003','Librería Central','Librería','Calle Aurora 220 · ficticia','Miraflores',-12.1170,-77.0280,0,80,'verified'),
  ('20000000-0000-4000-8000-000000000004','Estudio Rosa','Taller','Jr. Pistacho 88 · ficticia','San Isidro',-12.0970,-77.0370,60,120,'verified'),
  ('20000000-0000-4000-8000-000000000005','Centro Cultural Aurora','Centro cultural','Jr. Estrella 154 · ficticia','Barranco',-12.1483,-77.0217,15,40,'pending')
on conflict (id) do nothing;

