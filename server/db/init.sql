CREATE TABLE users (
    u_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    hmac CHAR(64),
    salt CHAR(32),
    email VARCHAR(255) NOT NULL,
    notifications TINYINT,
    q1 INTEGER,
    q2 INTEGER,
    q3 INTEGER,
    q4 INTEGER,
    q5 INTEGER,
    q6 INTEGER,
    q7 INTEGER,
    q8 INTEGER,
    q9 INTEGER,
    q10 INTEGER
);
