import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [insights, setInsights] = useState([]);
  const [subscriptionDistribution, setSubscriptionDistribution] = useState([]);
  const [riskUsers, setRiskUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/metrics")
      .then((response) => response.json())
      .then((data) => setMetrics(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:5001/api/insights")
      .then((response) => response.json())
      .then((data) => setInsights(data))
      .catch((error) => console.error(error));

      fetch("http://localhost:5001/api/risk-users")
      .then((response) => response.json())
      .then((data) => setRiskUsers(data))
      .catch((error) => console.error(error));
      fetch("http://localhost:5001/api/subscription-distribution")
      .then((response) => response.json())
      .then((data) => setSubscriptionDistribution(data))
      .catch((error) => console.error(error));
  }, []);

  if (!metrics) {
    return <h2>Loading analytics...</h2>;
  }

  const dashboardMetrics = [
    {
      title: "Total Revenue",
      value: `${metrics.totalRevenue} €`,
      description: "Successful payments",
    },
    {
      title: "Failed Payments",
      value: metrics.failedPayments,
      description: "Payment issues detected",
    },
    {
      title: "Premium Subscribers",
      value: metrics.premiumSubscribers,
      description: "Users on Premium plan",
    },
    {
      title: "Churn Risk Users",
      value: metrics.churnRiskUsers,
      description: "Repeated failed payments",
    },
  ];
  const riskLevel =
  metrics.failedPayments >= 4
    ? "High Risk"
    : metrics.failedPayments >= 2
    ? "Medium Risk"
    : "Low Risk";

const riskColor =
  riskLevel === "High Risk"
    ? "#dc2626"
    : riskLevel === "Medium Risk"
    ? "#92400e"
    : "#166534";

const riskBackground =
  riskLevel === "High Risk"
    ? "#fee2e2"
    : riskLevel === "Medium Risk"
    ? "#fef3c7"
    : "#dcfce7";
const riskScore = Math.min(100, metrics.failedPayments * 20);

const riskScoreLabel =
  riskScore >= 80
    ? "Critical"
    : riskScore >= 50
    ? "Elevated"
    : "Stable";
const paymentStatusData = [
  {
    status: "Successful",
    count: metrics.successfulPayments,
  },
  {
    status: "Failed",
    count: metrics.failedPayments,
  },
];
const pieColors = ["#2563eb", "#f97316", "#22c55e"];

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1>Fitness Subscription Analytics Dashboard</h1>

      <p style={{ color: "#475569", maxWidth: "720px" }}>
        A lightweight product analytics prototype based on SQL-generated
        business metrics for a subscription-based fitness platform.
      </p>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginTop: "32px",
        }}
      >
        {dashboardMetrics.map((metric) => (
          <div
            key={metric.title}
            style={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "20px",
              minWidth: "210px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ margin: 0 }}>{metric.title}</h3>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: "16px 0 8px",
              }}
            >
              {metric.value}
            </p>
            <p style={{ color: "#64748b", margin: 0 }}>
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "36px",
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "24px",
        }}
      >
      <div
        style={{
          marginTop: "36px",
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "24px",
          maxWidth: "760px",   
        }}
      >
        <h2>Dynamic Risk Score</h2>
        <p style={{ color: "#64748b" }}>
           Calculated from the number of failed payment events in the database.
          </p>

          <div
            style={{
              width: "100%",
              height: "16px",
              backgroundColor: "#e5e7eb",
              borderRadius: "999px",
              overflow: "hidden",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                width: `${riskScore}%`,
                height: "100%",
                backgroundColor: riskColor,
              }}
            />
          </div>

          <p style={{ marginTop: "12px", fontWeight: "bold" }}>
            {riskScore}/100 — {riskScoreLabel}
          </p>
        </div>

       <div
          style={{
            marginTop: "36px",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "24px",
            maxWidth: "760px",
          }}
        >
        
        <h2>Payment Status Overview</h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={paymentStatusData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div> 
        <div
          style={{
            marginTop: "24px",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "24px",
            maxWidth: "760px",
          }}
        >
          <h2>Subscription Plan Distribution</h2>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={subscriptionDistribution}
                dataKey="subscriberCount"
                nameKey="planName"
                outerRadius={90}
                label
              >
                {subscriptionDistribution.map((entry, index) => (
                  <Cell key={entry.planName} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <h2>Business Insights</h2>
        <p
          style={{
            color: "#64748b",
            marginTop: "-8px",
            marginBottom: "20px",
          }}
        >
            Generated from live database metrics
        </p>
        <ul>
          {insights.map((insight) => (
            <li key={insight} style={{ marginBottom: "10px" }}>
              {insight}
            </li>
          ))}
        </ul>

        <span
          style={{
            backgroundColor: riskBackground,
            color: riskColor,
            padding: "6px 12px",
            borderRadius: "20px",
          }}
        >
          {riskLevel}
        </span>

        <h2>AI Recommendations</h2>

        <ul>
          <li>Contact users with repeated payment failures.</li>
          <li>Offer payment method update reminders.</li>
          <li>Promote Premium plan benefits to Basic users.</li>
        </ul>
        <h2>Top Risk Users</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "12px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                User
              </th>

              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                Failed Payments
              </th>
            </tr>
          </thead>

          <tbody>
            {riskUsers.map((user) => (
              <tr key={user.name}>
                <td style={{ padding: "10px" }}>{user.name}</td>
                <td style={{ padding: "10px" }}>{user.failedPayments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}