\c cosmicblog_dev

INSERT INTO users (first_name, last_name, email, password)
VALUES 
('Tester', 'Test', 'testme@gmail.com', 'testing1');

INSERT INTO posts (title, description, image, tags, super_interest, interest_level, uploaded_at, user_id)
VALUES
('Horse Head Nebula image', 'I took this picture last night, amazing right?', 'https://c02.purpledshub.com/uploads/sites/48/2019/02/HH2-c9a96eb-e1607609381136.jpg', 'nebula, cosmos, space, telescope, image', true, 4.5, TIMESTAMP '2023-11-19 14:29:00', '1'),
('The Crab Nebula', 'Look what I took a few nights ago after processing it.', 'https://www.cnet.com/a/img/resize/a6df346b60026929e542476cff82beebaccd1b1c/hub/2015/04/20/a3741879-b2da-4a4f-8c3c-1baae1be697f/25th-gallery-090.jpg?auto=webp&fit=crop&height=675&width=1200', 'nebula, space, telescope, image', false, 9, TIMESTAMP '2023-11-19 14:31:00', '1'),
('Pluto fly by!', 'I was adjusting my telescope and look what I caught!', 'https://media.cnn.com/api/v1/images/stellar/prod/150514133216-pluto-charon-color-image-new-horizons.jpg?q=w_1600,h_900,x_0,y_0,c_fill/h_618', 'planet, solar system, space, telescope, image', true, 10, TIMESTAMP '2023-11-19 14:44:00', '1'),
('Andromeda galaxy!!!', 'The universe is full of amazing wonders like this one, look at Andromeda.', 'https://c02.purpledshub.com/uploads/sites/48/2020/10/Photograph-Andromeda-Galaxy-7636391.jpg?webp=1', 'galaxy, beautiful, space, telescope, image', false, 5.5, TIMESTAMP '2023-11-19 14:29:00', '1'),
('Planet question', 'What are your thoughts on exo-planets? Do you think we found one that houses life and we don''t know it yet?', '', 'planets, question, cosmos, chat, discussion', true, 7.8, TIMESTAMP '2023-11-19 14:53:00', '1');

INSERT INTO comments (comment, commented_at, post_id, user_id)
VALUES
  ('This is a great post!', TIMESTAMP '2023-11-19 15:00:00', 1, 1),
  ('Nice picture!', TIMESTAMP '2023-11-19 15:15:00', 2, 1),
  ('I have a question about this.', TIMESTAMP '2023-11-19 15:30:00', 1, 1),
  ('Another comment here.', TIMESTAMP '2023-11-19 16:00:00', 2, 1);
