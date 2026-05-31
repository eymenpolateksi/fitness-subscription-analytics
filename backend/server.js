const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());

console.log("Database path:", require("path").resolve("./fitness_platform.db"));
const db = new sqlite3.Database("./fitness_platform.db");


app.get("/api/risk-users", (req, res) => {
  db.all(
    `
    SELECT
      u.name,
      COUNT(*) AS failedPayments
    FROM payments p
    JOIN users u
      ON p.user_id = u.id
    WHERE p.status = 'failed'
    GROUP BY u.name
    ORDER BY failedPayments DESC
    `,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(rows);
    }
  );
});

app.get("/api/metrics", (req, res) => {
  const metrics = {};

  db.get(
    "SELECT SUM(amount) AS totalRevenue FROM payments WHERE status = 'success'",
    [],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      metrics.totalRevenue = row.totalRevenue || 0;

      db.get(
        "SELECT COUNT(*) AS failedPayments FROM payments WHERE status = 'failed'",
        [],
        (err, row) => {
          if (err) return res.status(500).json({ error: err.message });

          metrics.failedPayments = row.failedPayments;

          db.get(
            "SELECT COUNT(*) AS premiumSubscribers FROM subscriptions WHERE plan_name = 'Premium'",
            [],
            (err, row) => {
              if (err) return res.status(500).json({ error: err.message });

              metrics.premiumSubscribers = row.premiumSubscribers;

              db.get(
                `
                SELECT COUNT(*) AS churnRiskUsers
                FROM (
                  SELECT user_id
                  FROM payments
                  WHERE status = 'failed'
                  GROUP BY user_id
                  HAVING COUNT(*) >= 2
                )
                `,
                [],
                (err, row) => {
                  if (err) return res.status(500).json({ error: err.message });

                  metrics.churnRiskUsers = row.churnRiskUsers;

                  res.json(metrics);
                }
              );
            }
          );
        }
      );
    }
  );
});

app.get("/api/insights", (req, res) => {
  const insights = [];

  db.get(
    `
    SELECT u.name, COUNT(*) AS failedPayments
    FROM payments p
    JOIN users u
    ON p.user_id = u.id
    WHERE p.status = 'failed'
    GROUP BY u.name
    ORDER BY failedPayments DESC
    LIMIT 1
    `,
    [],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (row) {
        insights.push(
          `${row.name} has ${row.failedPayments} failed payments and should be flagged for follow-up.`
        );
      }

      db.get(
        `
        SELECT plan_name, COUNT(*) AS subscriberCount
        FROM subscriptions
        GROUP BY plan_name
        ORDER BY subscriberCount DESC
        LIMIT 1
        `,
        [],
        (err, row) => {
          if (err) return res.status(500).json({ error: err.message });

          if (row) {
            insights.push(
              `${row.plan_name} is the most common subscription plan in the sample data.`
            );
          }

          db.get(
            `
            SELECT SUM(amount) AS totalRevenue
            FROM payments
            WHERE status = 'success'
            `,
            [],
            (err, row) => {
              if (err) return res.status(500).json({ error: err.message });

              insights.push(
                `Successful payments generated ${row.totalRevenue} € in total revenue.`
              );

              res.json(insights);
            }
          );
        }
      );
    }
  );
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});