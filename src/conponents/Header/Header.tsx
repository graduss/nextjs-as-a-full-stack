import LogOut from "@/feature/users/components/LogOut/LogOut";
import UserAvatar from "@/feature/users/components/UserAvatar/UserAvatar";
import { getCurrentUserIfExist } from "@/utils";
import Link from "next/link";

export default async function Header() {
  const currentUser = await getCurrentUserIfExist();
  return (
    <div className="px-8 py-4 flex gap-4 justify-end">
        {currentUser ? (
          <>
            <UserAvatar user={currentUser} />
            <LogOut />
          </>
        ) : (
          <>
            <Link href={'/sign-in'}>SignIn</Link>
            <Link href={'/sign-up'}>SignUp</Link>
          </>
        )}
      </div>
  );
}