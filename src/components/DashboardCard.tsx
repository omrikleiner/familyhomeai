import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number;
  description: string;
  icon?: string;
}

export default function DashboardCard({ title, value, description, icon }: DashboardCardProps) {
  return (
    <article className="card summary-card">
      <div className="summary-top">
        <h3>{title}</h3>
        {icon && (
          <span className="summary-icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>
      <p className="summary-value">{value}</p>
      <p className="summary-description">{description}</p>
    </article>
  );
}
