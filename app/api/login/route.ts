import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const loginResponse = {
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: "65f02d6c9d92",
        firstName: "Akpan",
        lastName: "Okon",
        username: "admin_admin",
        email: "okon@sqr.com",
        organization: "LendSqr",
        tier: 2,
        accountNumber: "1029384756",
        bankName: "GTBank",
        status: "active",
      },
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.payload.signature",
    },
  };

  return NextResponse.json(loginResponse);
}
