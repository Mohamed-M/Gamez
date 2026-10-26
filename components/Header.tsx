import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div>
          <Link href="/">Gamez</Link>
        </div>
        <div>
          <Link href="/home">Home</Link>
          <Link href="/back-log">My Backlog</Link>
        </div>
      </div>
    </header>
  )
}