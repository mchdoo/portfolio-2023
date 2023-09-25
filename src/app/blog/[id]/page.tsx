import { apollo } from "@/lib/apollo";
import { PostType } from "@/app/blog/types";
import { gql } from "@apollo/client";
import { error } from "console";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Image from "next/image";
import Desarrollo from "./desarrollo";

async function fetchPost(id: string) {
  console.warn("id: ", id);

  const { data, error } = await apollo.query({
    query: gql`
      query GetPost($id: String!) {
        portfolioPost(id: $id) {
          titulo
          tags
          featureImage {
            url
          }
          fechaDeEntrada
          desarrollo {
            json
          }
        }
      }
    `,
    variables: { id },
  });

  console.log("error", error?.message);

  return data as { portfolioPost: PostType };
}

async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { portfolioPost: post } = await fetchPost(id);

  const fecha = new Date(post.fechaDeEntrada).toLocaleDateString("es-ar", {
    dateStyle: "full",
  });

  return (
    <main className="text-center">
      {post && (
        <main className="grid place-items-center p-3">
          <div className="flex gap-3 self-center  ">
            {post.tags.map((tag, index) => (
              <p
                key={index}
                className="cursor-pointer hover:-translate-y-1 transition w-fit font-semibold p-1 px-2 text-xs rounded-full bg-accent-2/20 uppercase text-accent-2"
              >
                {tag}
              </p>
            ))}
          </div>
          <h1 className="text-5xl font-migra mt-4">{post.titulo}</h1>
          <p className="opacity-50 text-sm">{fecha}</p>
          <Image
            alt={"Feature image " + post.titulo}
            src={post.featureImage.url}
            height={300}
            width={500}
            className="rounded-full my-5 border border-fore"
          />

          <Desarrollo document={post.desarrollo.json} />

          <p className="font-migra-italic text-3xl mt-10">···</p>
          <Link
            href={"/blog"}
            className="hover:underline underline-offset-4 font-migra-italic text-5xl opacity-80 mt-10 select-none mb-16"
          >
            El fín
          </Link>
        </main>
      )}
    </main>
  );
}

export default PostPage;