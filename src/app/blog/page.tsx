import Link from "next/link";
import Image from "next/image";
import { PostType } from "./types";
import { apollo } from "@/lib/apollo";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import PostCard from "./postCard";

async function getAllPosts() {
  const { data: posts, loading } = await apollo.query({
    query: gql`
      query {
        portfolioPostCollection {
          items {
            titulo
            fechaDeEntrada
            sys {
              id
            }
            featureImage {
              url
            }
            tags
          }
        }
      }
    `,
  });

  return posts.portfolioPostCollection.items as PostType[];
}

async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="p-6">
      <p className="mb-2 uppercase font-semibold opacity-60">
        # Todos los posts
      </p>
      <section className="grid grid-cols-1 divide-y-2 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </section>
    </main>
  );
}

export default BlogPage;
