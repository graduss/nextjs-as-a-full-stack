import { TUserOut } from "@/feature/users/types";
import { getForUser } from "../../services/post.service";

async function getOun(user: TUserOut) {
  return getForUser(user.id);
}

export default async function PostList({ user }: { user: TUserOut }) {
  const posts = await getOun(user);
  
  return (
    <section className="mt-4 flex flex-col gap-4">
      {posts.map((p) => (
        <article className="artical" key={p.id}>
          <h2>{p.title}</h2>
          <time>{p.updatedAt.toDateString()}</time>
          <address>by&nbsp; <a rel="author">{user.username}</a></address>
          <pre>{p.content}</pre>
        </article>
      ))}
    </section>
  )
}