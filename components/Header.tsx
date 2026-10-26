import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0">
      <div className="container-md flex justify-between items-baseline mx-auto p-5 bg-white text-red-700 shadow-xl">
        <div>
          <Link className="text-3xl font-bold uppercase" href="/">Gamez</Link>
        </div>
        <div className="flex space-x-7">
          <Link href="/">Home</Link>
          <Link href="/chat">AI Chat</Link>
          <Link href="/back-log">My Gamez</Link>
        </div>
      </div>
    </header>
  )
}