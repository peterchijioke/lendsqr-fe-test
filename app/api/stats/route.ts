import { NextResponse } from "next/server";
import { userService, User } from "@/services/userService";

export interface Stat {
  label: string;
  value: string;
  transform?: string;
}

export interface StatsResponse {
  data: Stat[];
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export async function GET() {
  try {
    const users: User[] = await userService.getUsers();

    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "active").length;

    const usersWithLoans = users.filter(
      (user) =>
        user.education?.loanRepayment !== undefined &&
        user.education.loanRepayment > 0
    ).length;

    const usersWithSavings = users.filter(
      (user) => user.balance && parseFloat(user.balance.replace(/[^0-9.-]/g, "")) > 0
    ).length;

    const stats: Stat[] = [
      {
        label: "USERS",
        value: formatNumber(totalUsers??0),
      },
      {
        label: "ACTIVE USERS",
        value: formatNumber(activeUsers??0),
      },
      {
        label: "USERS WITH LOANS",
        value: formatNumber(usersWithLoans || 0),
      },
      {
        label: "USERS WITH SAVINGS",
        value: formatNumber(usersWithSavings || 0),
      },
    ];

    return NextResponse.json({ data: stats });
  } catch (error) {
    console.error("Error fetching stats:", error);

  

    return NextResponse.json({ data: [] });
  }
}
