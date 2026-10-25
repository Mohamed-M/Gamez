import Link from "next/link";

export default function HeaderComponent() {
  return (
    <header>
      <div className="container">
        <div>
          <Link href="/">Videoz</Link>
        </div>
        <div>
          <Link href="/home">Home</Link>
          <Link href="/back-log">My Backlog</Link>
        </div>
      </div>
    </header>
  )
}