
/*users + subscriptions + payments */
SELECT
    u.name,
    s.plan_name,
    p.status,
    p.amount
FROM users u
JOIN subscriptions s
ON u.id = s.user_id
JOIN payments p
ON u.id = p.user_id;




SELECT
    u.name,
    COUNT(*) AS failed_payments
FROM payments p
JOIN users u
ON p.user_id = u.id
WHERE p.status = 'failed'
GROUP BY u.name;


SELECT
    SUM(amount) AS total_revenue
FROM payments
WHERE status = 'success';


SELECT
    COUNT(*) AS premium_users
FROM subscriptions
WHERE plan_name = 'Premium';

SELECT
    country,
    COUNT(*) AS users
FROM users
GROUP BY country;