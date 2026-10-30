import type { DashboardStats } from "../../types/dashboard.types";
import styles from "./StatsPanel.module.css";

// 🔴 TODO: Accept stats prop (DashboardStats) and use its properties dynamically
// colors to use: #3498db, #e67e22, #2ecc71, #e74c3c
type StatsPanelProps = {
  stats: DashboardStats;
}

export function StatsPanel({stats}: StatsPanelProps) {
  const hours = stats.avgResolutionTimeSeconds / 3600;
  const minutes = (stats.avgResolutionTimeSeconds % 3600) / 60; 

  return (
    <div className={styles.grid}>
      {/* // 🔴 TODO: refer to dashboard.png, render StatCard components */}
      {/* <div>Placeholder, replace this with StatCard components</div> */}
      <StatCard 
      title="Total Ticket"
      value={stats.totalTickets}
      color="#3498db"
      />
      <StatCard 
      title="Open Ticket"
      value={stats.openTickets}
      color="#e67e22"
      />
      <StatCard 
      title="Avg Resolution Time"
      value={`${hours}h ${minutes}m`}
      color="#2ecc71"
      />
      <StatCard 
      title="SLA Breaches"
      value={stats.slaBreachCount}
      color="#e74c3c"
      />
    </div>
  );
}

// Do not modify
function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className={styles.card} style={{ borderLeft: `4px solid ${color}` }}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardValue}>{value}</div>
    </div>
  );
}
