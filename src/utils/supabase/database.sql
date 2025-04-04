create table users (
  id INT generated always as identity primary key,
  name VARCHAR(20) not null,
  email VARCHAR(255) unique not null,
  password VARCHAR(255) not null
);

CREATE TABLE posts (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL,
  text VARCHAR(280) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
