DROP DATABASE IF EXISTS cosmicblog_dev;

CREATE DATABASE cosmicblog_dev;

\c cosmicblog_dev;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    image VARCHAR(255),
    tags VARCHAR(255),
    super_interest BOOLEAN,
    interest_level DECIMAL CHECK (interest_level >= 0 AND interest_level <= 10),
    uploaded_at BIGINT NOT NULL,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    commented_at BIGINT NOT NULL, 
    post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);
