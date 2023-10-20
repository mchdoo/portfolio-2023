import { PostType } from "./types";
import { apollo } from "@/lib/apollo";
import { gql } from "@apollo/client";
import PostCard from "./postCard";
import { client } from "@/lib/contentful";

async function getAllPosts() {
  const posts = await client.getEntries({ content_type: "portfolioPost" });

  //@ts-ignore
  return posts.items as PostType[];
}

async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="p-6">
      <p className="mb-2 uppercase font-semibold opacity-60">
        # Todos los posts
      </p>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* <pre>{JSON.stringify(posts[0], null, 2)}</pre> */}

        {posts?.map((post, index) => (
          <PostCard post={post as PostType} key={index} />
        ))}
      </section>
    </main>
  );
}

export default BlogPage;
