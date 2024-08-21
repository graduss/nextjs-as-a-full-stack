import Link from "next/link";
import LogOut from "@/feature/users/components/LogOut/LogOut";
import UserAvatar from "@/feature/users/components/UserAvatar/UserAvatar";
import NewPost from "@/feature/posts/components/NewPost/NewPost";
import { jwtSign } from "@/services/jwt.service";
import { getCurrentUserIfExist } from "@/utils/api";
import PostList from "@/feature/posts/components/PostList/PostList";

export default async function Home() {
  const user = await getCurrentUserIfExist();

  return (
    user && (
      <>
        <PostList user={user} />
        <NewPost csrfToken={await jwtSign({}, {expiresIn: 10 * 60})} />
      </>
    )
  );
}
