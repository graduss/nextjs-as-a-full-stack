import Link from "next/link";
import { cookies } from 'next/headers'
import { getUserByToken } from "@/feature/users/services/user";
import LogOut from "@/feature/users/components/LogOut/LogOut";
import UserAvatar from "@/feature/users/components/UserAvatar/UserAvatar";
import NewPost from "@/feature/posts/components/NewPost/NewPost";
import { jwtSign } from "@/services/jwt.service";

async function getCurrentUser() {
  const jwtToken = cookies().get('jwttoken');
  if (!jwtToken || !jwtToken.value) return null;

  try {
    const user = await getUserByToken(jwtToken.value);
    return user;
  } catch (e) {
    return null;
  }
}

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex gap-4 justify-end">
        {user ? (
          <>
            <UserAvatar user={user} />
            <LogOut />
          </>
        ) : (
          <>
            <Link href={'/sign-in'}>SignIn</Link>
            <Link href={'/sign-up'}>SignUp</Link>
          </>
        )}
      </div>
      {user && (
        <>
          <NewPost csrfToken={await jwtSign({}, {expiresIn: 10 * 60})} />
        </>
      )}
    </>
  );
}
