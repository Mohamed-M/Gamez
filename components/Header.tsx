import Link from "next/link";
import { PiGameControllerFill } from "react-icons/pi";

export default function Header() {
  return (
    <header className="sticky top-0">
      <div className="container-md flex justify-between items-center mx-auto py-5 px-7 bg-white text-red-700 shadow-xl">
        <div>
          <Link className="text-3xl font-bold uppercase flex items-center" href="/">
            <PiGameControllerFill /> 
            <span className="ml-3">Gamez</span>
          </Link>
        </div>
        <div className="flex space-x-7">
          <Link href="/">Home</Link>
          <Link href="/chat">AI Chat</Link>
          <Link href="/my-gamez">My Gamez</Link>
        </div>
      </div>
    </header>
  )
}