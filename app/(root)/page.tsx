import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="">
      <h1>home page</h1>
      <UserButton afterSignOutUrl="/" />
    </main>
  )
}

