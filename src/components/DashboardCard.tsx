import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number;
  description: string;
}

export default function DashboardCard({ title, value, description }: DashboardCardProps) {
  return (
    <article className="card summary-card">
      <h3>{title}</h3>
      <p className="summary-value">{value}</p>
      <p className="summary-description">{description}</p>
    </article>
  );
}
