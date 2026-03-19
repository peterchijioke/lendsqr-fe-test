import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { User } from "@/services/userService";

function getUsers(): User[] {
  const filePath = path.join(process.cwd(), "data", "mock-users.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const users: User[] = JSON.parse(fileContents);
  return users;
}

const users = getUsers();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const organization = searchParams.get("organization") || "";
  const status = searchParams.get("status") || "";
  const username = searchParams.get("username") || "";
  const name = searchParams.get("name") || "";
  
  let filteredUsers = [...users];
  
    if (organization) {
    filteredUsers = filteredUsers.filter(u => u.organization.toLowerCase() === organization.toLowerCase());
  }
  if (status) {
    filteredUsers = filteredUsers.filter(u => u.status.toLowerCase() === status.toLowerCase());
  }
  if (username) {
    filteredUsers = filteredUsers.filter(u => 
      u.username.toLowerCase().includes(username.toLowerCase())
    );
  }
  if (name) {
    filteredUsers = filteredUsers.filter(u => 
      u.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  
  const total = filteredUsers.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);
  
  return NextResponse.json({
    data: paginatedUsers,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
}
