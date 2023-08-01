import { apollo } from "@/lib/apollo";
import { gql } from "@apollo/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PostType } from "@/pages/blog/types";

export async function getStaticProps() {
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
          }
        }
      }
    `,
  });

  return await {
    props: {
      posts: posts.portfolioPostCollection.items,
      loading,
    },
  };
}

function BlogPage({ posts }: { posts: PostType[] }) {
  return (
    <main>
      <nav className="border items-center border-fore sticky top-0 bg-back z-30 inline-flex w-full h-24">
        <Link
          className="group border-r border-fore h-full grid aspect-square place-items-center"
          href="/"
        >
          <span className="group-hover:-translate-x-2 transition">&lt;-</span>
        </Link>

        <h1
          id="nav-title"
          className="font-migra uppercase text-3xl leading-none p-6"
        >
          Blog posts
        </h1>
      </nav>

      <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => {
          const fecha = new Date(post.fechaDeEntrada);
          return (
            <Link
              key={index}
              className="group cursor-pointer p-6 border border-fore rounded-3xl hover:ring-4 ring-accent-2 transition"
              href={"blog/" + post.sys.id}
            >
              <p className="uppercase text-xl">
                {post.titulo} <span className="float-right"> -&gt; </span>
              </p>
              <p className="text-sm mt-1 opacity-50">
                {fecha.toLocaleDateString("es-ar", { dateStyle: "medium" })}
              </p>
              <Image
                priority={true}
                src={post.featureImage.url}
                height={200}
                width={500}
                alt="blogpost picture"
                className="w-full rounded-xl border border-fore mt-3"
              />
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default BlogPage;
