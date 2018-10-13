CREATE TABLE users (
    u_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    hash CHAR(60),
    email VARCHAR(255) NOT NULL,
    notifications TINYINT
);
