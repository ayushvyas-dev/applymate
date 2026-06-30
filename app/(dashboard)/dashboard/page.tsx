import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/")
  }
  return (
    <div className=' flex-1 w-full h-full  border rounded-md'>
      This is dashboard
    </div>
  );
}
