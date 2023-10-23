import {TypePortfolioPost, TypePortfolioPostSkeleton} from "@/lib/types";
import PostCard from "./postCard";
import { client } from "@/lib/contentful";

const getAllPosts = async () => {
  const {items} = await client.getEntries<TypePortfolioPostSkeleton>({content_type: "portfolioPost"});

  return items;
};

async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="p-6">
      <p className="mb-2 uppercase font-semibold opacity-60">
        # Todos los posts
      </p>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: TypePortfolioPost<any, any>, index:number) => (
          <PostCard post={post} key={index} />
        ))}
      </section>
    </main>
  );
}

export default BlogPage;
