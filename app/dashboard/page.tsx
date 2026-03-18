import StatsCard from "../../components/stats-card/stats-card";
import LocationChart from "../../components/chart/chart";
import TransactionsTable from "../../components/transactions-table/transactions-table";
import styles from "./dashboard.module.scss";

export default async function DashboardPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Dashboard</h1>

      <div className={styles.statsGrid}>
        <StatsCard
          title="Total Active Loans"
          value="₦454,000,000"
          icon="💰"
          isActive
        />
        <StatsCard
          title="Active Loans"
          value="Active"
          icon="📋"
        />
        <StatsCard
          title="Total Disbursed"
          value="₦1,456,000"
          icon="💳"
        />
        <StatsCard
          title="Customers"
          value="4,500"
          icon="👥"
        />
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.chartSection}>
          <LocationChart />
        </div>
        <div className={styles.tableSection}>
          <TransactionsTable />
        </div>
      </div>
    </>
  );
}
