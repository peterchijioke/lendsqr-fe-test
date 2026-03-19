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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const user = users.find((u) => u.id === id);
  
  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ data: user });
}
