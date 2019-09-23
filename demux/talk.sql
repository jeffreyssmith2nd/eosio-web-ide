CREATE TABLE ${schema~}.talk (
  id int PRIMARY KEY,
  reply_to int NOT NULL,
  user_name text NOT NULL,
  content text NOT NULL
);