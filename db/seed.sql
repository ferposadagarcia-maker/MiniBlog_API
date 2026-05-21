TRUNCATE TABLE posts, authors RESTART IDENTITY CASCADE;

INSERT INTO authors (name, email, bio) VALUES
('Milan Kundera', 'milan@kundera.cz', 'Escritor checo, autor de La insoportable levedad del ser. Explora el existencialismo y la condición humana.'),
('José Saramago', 'jose@saramago.pt', 'Premio Nobel de Literatura. Conocido por su estilo único y obras como Ensayo sobre la ceguera.'),
('Gabriel García Márquez', 'gabo@macondo.co', 'Padre del realismo mágico y autor de Cien años de soledad.'),
('Alejandra Pizarnik', 'alejandra@pizarnik.ar', 'Poeta argentina cuya obra destaca por su profundidad lírica y temas de soledad y muerte.');

INSERT INTO posts (author_id, title, content, published) VALUES
(1, 'La levedad vs El peso', '¿Qué debemos elegir? ¿El peso de la responsabilidad o la levedad de la libertad absoluta?', true),
(2, 'La ceguera blanca', 'Un análisis sobre cómo las sociedades pierden la humanidad cuando dejan de verse los unos a los otros.', true),
(3, 'El tiempo en Macondo', 'En la literatura, el tiempo no es una línea recta, sino un círculo que se repite eternamente.', true),
(4, 'El silencio de las palabras', 'Escribir es intentar nombrar lo que no tiene nombre, bordear el abismo del silencio.', true),
(1, 'La inmortalidad', 'Un breve ensayo sobre cómo dejamos huella en los demás a través de los gestos.', false);

INSERT INTO comments (post_id, author_id, content) VALUES
(1, 2, 'Kundera, me parece un análisis fascinante.'),
(2, 1, 'Saramago, coincido plenamente en tu visión de la ceguera social.');