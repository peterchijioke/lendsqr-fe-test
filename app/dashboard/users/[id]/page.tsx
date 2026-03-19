import UserDetailsClient from "@/components/user-details/user-details-client";
import { userService } from "@/services/userService";



interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const user = await userService.getUser(id);

  if (!user) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>User not found</h1>
        <a href="/dashboard/users">Back to Users</a>
      </div>
    );
  }

  
  const transformedUser = {
    name: user.name,
    id: user.id,
    tier: user.tier,
    balance: `₦${parseFloat(user.balance).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`,
    account: `${user.accountNumber}/${user.bankName}`,
    personal: {
      fullName: user.name,
      phone: user.personal.phoneNumber,
      email: user.personal.emailAddress,
      bvn: user.personal.bvn,
      gender: user.personal.gender,
      maritalStatus: user.personal.maritalStatus,
      children: user.personal.children,
      residenceType: user.personal.typeOfResidence,
    },
    employment: user.education
      ? {
          education: user.education.levelOfEducation || "N/A",
          status: user.education.employmentStatus || "N/A",
          sector: user.education.sectorOfEmployment || "N/A",
          duration: user.education.durationOfEmployment || "N/A",
          officeEmail: user.education.officeEmail || "N/A",
          monthlyIncome: typeof user.education.monthlyIncome === 'string' 
            ? user.education.monthlyIncome 
            : user.education.monthlyIncome 
              ? `₦${user.education.monthlyIncome.min?.toLocaleString("en-NG")}– ₦${user.education.monthlyIncome.max?.toLocaleString("en-NG")}`
              : "N/A",
          loanRepayment: typeof user.education.loanRepayment === 'string'
            ? user.education.loanRepayment
            : user.education.loanRepayment
              ? user.education.loanRepayment.toLocaleString("en-NG")
              : "N/A",
        }
      : {
          education: "N/A",
          status: "N/A",
          sector: "N/A",
          duration: "N/A",
          officeEmail: "N/A",
          monthlyIncome: "N/A",
          loanRepayment: "N/A",
        },
    socials: user.socials || {
      twitter: "N/A",
      facebook: "N/A",
      instagram: "N/A",
    },
    guarantors: user.guarantors.map((g) => ({
      fullName: g.fullName,
      phone: g.phoneNumber,
      email: g.emailAddress || "N/A",
      relationship: g.relationship,
    })),
  };

  return <UserDetailsClient user={transformedUser} />;
}
