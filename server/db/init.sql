CREATE TABLE users (
    u_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    hmac CHAR(64),
    salt CHAR(32),
    email VARCHAR(255) NOT NULL,
    notifications TINYINT
);
