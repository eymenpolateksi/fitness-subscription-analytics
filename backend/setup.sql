DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    country TEXT
);

CREATE TABLE subscriptions (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    plan_name TEXT,
    monthly_price REAL
);


CREATE TABLE payments (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    amount REAL,
    status TEXT
);

INSERT INTO users (name, country)
VALUES
('Eymen', 'Germany'),
('Anna', 'Austria'),
('John', 'Germany');

INSERT INTO subscriptions (user_id, plan_name, monthly_price)
VALUES
(1, 'Premium', 49.99),
(2, 'Basic', 19.99),
(3, 'Premium', 49.99);

INSERT INTO payments (user_id, amount, status)
VALUES
(1, 49.99, 'success'),
(2, 19.99, 'failed'),
(3, 49.99, 'success'),
(2, 19.99, 'failed');