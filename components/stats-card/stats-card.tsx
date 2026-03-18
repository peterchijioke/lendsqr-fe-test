import styles from "./stats-card.module.scss";

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  isActive?: boolean;
}

export default function StatsCard({ title, value, icon, isActive }: StatsCardProps) {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ""}`}>
      <div className={styles.iconWrapper}>
        <span>{icon}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
}
