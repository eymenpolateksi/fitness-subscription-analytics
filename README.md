# Fitness Subscription Analytics Dashboard

A full-stack analytics dashboard built with React, Express.js, SQLite, and SQL-based business metrics.

## Overview

This project simulates a lightweight product analytics dashboard for a subscription-based fitness platform.

The dashboard retrieves business metrics from a SQLite database through a custom Express API and visualizes them using React and Recharts.

The goal is to demonstrate:

- SQL analytics queries
- Backend API development
- React dashboard design
- Data visualization
- Product analytics thinking

---

## Tech Stack

### Frontend

- React
- Recharts
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- SQLite

---

## Features

### KPI Dashboard

- Total Revenue
- Failed Payments
- Premium Subscribers
- Churn Risk Users

### Business Insights

Insights generated directly from SQL queries:

- User payment behavior
- Subscription distribution
- Revenue analysis

### Data Visualizations

#### Payment Status Overview

Bar chart comparing:

- Successful payments
- Failed payments

#### Subscription Plan Distribution

Pie chart displaying:

- Premium users
- Basic users

### Dynamic Risk Score

Risk level is calculated automatically based on failed payment events:

| Failed Payments | Risk Level |
|---------------|-----------|
| 0 - 1 | Low |
| 2 - 3 | Medium |
| 4 - 5 | High |
| > 5 | Critical |

### Top Risk Users

Displays users with the highest number of failed payments.

---

## Project Structure

```text
fitness-subscription-analytics/
│
├── backend/
│   ├── server.js
│   ├── setup.sql
│   ├── queries.sql
│   └── fitness_platform.db
│
├── src/
│   ├── AnalyticsDashboard.js
│   ├── App.js
│   └── ...
│
├── public/
│
├── package.json
└── README.md
```

---

## API Endpoints

### Metrics

```http
GET /api/metrics
```

Example Response:

```json
{
  "totalRevenue": 149.97,
  "failedPayments": 4,
  "premiumSubscribers": 3,
  "churnRiskUsers": 1,
  "successfulPayments": 3
}
```

---

### Insights

```http
GET /api/insights
```

Example Response:

```json
[
  "Anna has 4 failed payments and should be flagged for follow-up.",
  "Premium is the most common subscription plan in the sample data.",
  "Successful payments generated 149.97 € in total revenue."
]
```

---

## Installation

### Backend

```bash
cd backend

npm install

node server.js
```

Backend runs on:

```text
http://localhost:5001
```

### Frontend

```bash
npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Learning Outcomes

This project demonstrates:

- SQL aggregation queries
- Relational database design
- REST API development
- React state management
- Data visualization with Recharts
- Analytics dashboard design

---

## Author

Eymen Polat Ekşi

M.Sc. Computer Science
Humboldt-Universität zu Berlin