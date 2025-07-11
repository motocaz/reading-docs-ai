import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { HomePage } from "@/components/home-page"

export default async function Home() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  return <HomePage />
}
