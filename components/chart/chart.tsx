"use client";

import styles from "./chart.module.scss";

interface LocationData {
  city: string;
  users: number;
}

const locationData: LocationData[] = [
  { city: "Lagos", users: 1200 },
  { city: "Abuja", users: 900 },
  { city: "Kano", users: 700 },
  { city: "Port Harcourt", users: 550 },
  { city: "Ibadan", users: 450 },
  { city: "Benin", users: 350 },
  { city: "Enugu", users: 280 },
  { city: "Delta", users: 220 },
];

const maxUsers = Math.max(...locationData.map((d) => d.users));

export default function LocationChart() {
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Users by Location</h3>
      <div className={styles.chart}>
        {locationData.map((data, index) => (
          <div key={data.city} className={styles.barWrapper}>
            <div
              className={styles.bar}
              style={{
                height: `${(data.users / maxUsers) * 100}%`,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <span className={styles.barValue}>{data.users}</span>
            </div>
            <span className={styles.barLabel}>{data.city}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
