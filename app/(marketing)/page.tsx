import MarketingClient from "@/components/marketing/MarketingClient";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function MarketingPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect('/dashboard');
  }
  return (
    <MarketingClient />
  )
}