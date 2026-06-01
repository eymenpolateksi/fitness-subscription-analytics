# Fitness Subscription Analytics Dashboard

A lightweight full-stack analytics dashboard built with React, Express.js, SQLite, and SQL.

The project simulates a subscription-based fitness platform and demonstrates how business metrics can be generated from a relational database, exposed through REST APIs, and visualized in a React dashboard.

## Live Demo

Deployment in progress.
---

## Features

* SQLite relational database
* SQL analytics queries
* Express.js REST API
* React analytics dashboard
* Revenue tracking
* Failed payment monitoring
* Premium subscriber analysis
* Churn risk detection
* Business insights generation
* Dynamic risk assessment
* Top risk users table

---

## Tech Stack

### Frontend

* React
* JavaScript (ES6)
* CSS

### Backend

* Node.js
* Express.js

### Database

* SQLite

---

## Dashboard Metrics

The dashboard calculates and visualizes:

### Total Revenue

Generated from successful payments.

### Failed Payments

Tracks unsuccessful payment attempts.

### Premium Subscribers

Counts active Premium plan users.

### Churn Risk Users

Identifies users with multiple failed payment attempts.

---

## API Endpoints

### Metrics

GET /api/metrics

Returns:

```json
{
  "totalRevenue": 149.97,
  "failedPayments": 4,
  "premiumSubscribers": 3,
  "churnRiskUsers": 1
}
```

### Insights

GET /api/insights

Returns AI-style business insights generated from database metrics.

### Risk Users

GET /api/risk-users

Returns users ranked by failed payment count.

---

## Project Architecture

SQLite Database
↓
SQL Queries
↓
Express API
↓
React Dashboard

---

## Example Business Insights

* Anna has 4 failed payments and should be flagged for follow-up.
* Premium is the most common subscription plan in the sample data.
* Successful payments generated 149.97 € in total revenue.

---

## Learning Goals

This project was built to practice:

* SQL querying
* Relational database design
* Backend API development
* React state management
* Data visualization
* Full-stack application architecture

---

## Author

Eymen Polat Ekşi

Industrial Engineering Graduate | M.Sc. Computer Science Student at Humboldt University of Berlin
