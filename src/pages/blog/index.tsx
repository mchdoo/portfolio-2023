import { apollo } from "@/lib/apollo";
import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
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
            tags
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
      <nav className="items-center border-fore sticky top-0 bg-back z-30 inline-flex w-full">
        <Link className="group h-full grid p-6 place-items-center" href="/">
          <span className="group-hover:-translate-x-2 transition">&lt;-</span>
        </Link>

        <h1
          id="nav-title"
          className="font-migra-italic text-4xl leading-none p-6"
        >
          Blog
        </h1>
      </nav>

      <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => {
          const [fecha, setFecha] = useState('—');

          useEffect(() => {
            setFecha(
              new Date(post.fechaDeEntrada).toLocaleDateString("es-ar", {
                dateStyle: "medium",
              })
            );
          }, []);

          return (
            <Link
              key={index}
              className="group cursor-pointer p-6 border border-fore hover:ring-4 ring-accent-2 transition"
              href={"blog/" + post.sys.id}
            >
              <div className="flex gap-1 mb-1 self-center">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="w-fit text-xs uppercase text-accent-2"
                  >
                    {tag}
                    {index !== post.tags.length - 1 && ", "}
                  </span>
                ))}
              </div>

              <h2 className="uppercase text-xl">
                {post.titulo} <span className="float-right"> -&gt; </span>
              </h2>

              <h5 className="text-sm mt-1 flex opacity-50 justify-between">
                {fecha}
              </h5>

              <Image
                priority={true}
                src={post.featureImage.url}
                height={200}
                width={500}
                alt="blogpost picture"
                className="w-full shadow-md hover:shadow-xl transition rounded-xl border border-fore mt-3"
              />
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default BlogPage;
