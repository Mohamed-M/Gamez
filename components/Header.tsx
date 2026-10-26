import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container-md flex justify-between mx-auto p-10">
        <div>
          <Link href="/">Gamez</Link>
        </div>
        <div className="flex">
          <Link href="/">Home</Link>
          <Link href="/chat">AI Chat</Link>
          <Link href="/back-log">My Gamez</Link>
        </div>
      </div>
    </header>
  )
}