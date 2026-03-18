import styles from "./transactions-table.module.scss";

interface Transaction {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateAdded: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

const transactions: Transaction[] = [
  {
    id: "1",
    organization: "Lendsqr",
    username: "Adedeji",
    email: "adedeji@lendsqr.com",
    phone: "+234 808 999 9999",
    dateAdded: "May 15, 2020 10:30 AM",
    status: "Active",
  },
  {
    id: "2",
    organization: "Lendsqr",
    username: "Adesuwa",
    email: "adesuwa@lendsqr.com",
    phone: "+234 807 888 8888",
    dateAdded: "May 14, 2020 09:15 AM",
    status: "Active",
  },
  {
    id: "3",
    organization: "Lendsqr",
    username: "Chidi",
    email: "chidi@lendsqr.com",
    phone: "+234 806 777 7777",
    dateAdded: "May 13, 2020 04:45 PM",
    status: "Pending",
  },
  {
    id: "4",
    organization: "Lendsqr",
    username: "Ngozi",
    email: "ngozi@lendsqr.com",
    phone: "+234 805 666 6666",
    dateAdded: "May 12, 2020 11:20 AM",
    status: "Inactive",
  },
  {
    id: "5",
    organization: "Lendsqr",
    username: "Emeka",
    email: "emeka@lendsqr.com",
    phone: "+234 804 555 5555",
    dateAdded: "May 11, 2020 03:30 PM",
    status: "Blacklisted",
  },
];

const statusClass: Record<Transaction["status"], string> = {
  Active: styles.statusActive,
  Inactive: styles.statusInactive,
  Pending: styles.statusPending,
  Blacklisted: styles.statusBlacklisted,
};

export default function TransactionsTable() {
  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.tableTitle}>Recent Transactions</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date Added</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.organization}</td>
                <td>{transaction.username}</td>
                <td>{transaction.email}</td>
                <td>{transaction.phone}</td>
                <td>{transaction.dateAdded}</td>
                <td>
                  <span
                    className={`${styles.status} ${statusClass[transaction.status]}`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
