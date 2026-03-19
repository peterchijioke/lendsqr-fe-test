import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface User {
  organization: string;
}

function getOrganizations(): { id: number; name: string }[] {
  const filePath = path.join(process.cwd(), "data", "mock-users.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const users: User[] = JSON.parse(fileContents);
  
  const organisations = [...new Set(users.map(user => user.organization))];
  
  return organisations.sort().map((name, index) => ({
    id: index + 1,
    name,
  }));
}

export async function GET() {
  const organisations = getOrganizations();

  return NextResponse.json({
    data: organisations,
  });
}
