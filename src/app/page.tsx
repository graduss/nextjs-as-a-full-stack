import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <div className="flex gap-4">
    <Link href={'/sign-up'}>SignUp</Link>
    <Link href={'/sign-in'}>SignIn</Link>
  </div>
}
