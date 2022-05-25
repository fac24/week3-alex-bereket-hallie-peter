BEGIN;

DROP TABLE IF EXISTS users, posts, sessions CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- CASCADE means delete the post if the author gets deleted
  text_content TEXT 
);

CREATE TABLE sessions (
    sid TEXT PRIMARY KEY,
    data JSON NOT NULL
);

INSERT INTO sessions (sid, data) VALUES 
('potatoe1234', '{"carb":"veggie"}');


INSERT INTO users (username, email, password) VALUES
  ('Henry8', 'henry8@gmail.co.uk', 'pan565656A');

INSERT INTO posts (user_id, text_content) VALUES
  (1, 'When life gives you potatoes, HASH YOUR PASSWORD, and hide your cookie.')
;

COMMIT;