import { apollo } from "@/lib/apollo";
import { PostType } from "@/app/blog/types";
import { gql } from "@apollo/client";
import { error } from "console";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import Image from "next/image";
import Desarrollo from "./desarrollo";
import { client } from "@/lib/contentful";
import type { Entry } from "contentful";

async function PostPage({ params }: { params: { id: string } }) {
  const post: PostType = await client.getEntry(params.id);

  const fecha = new Date(post.fields.fechaDeEntrada).toLocaleDateString(
    "es-ar",
    {
      dateStyle: "full",
    }
  );

  return (
    <main className="text-center">
      {post && (
        <main className="grid place-items-center py-4 px-6">
          <div className="flex gap-3 self-center  ">
            {post.fields.tags.map((tag, index) => (
              <p
                key={index}
                className="cursor-pointer hover:-translate-y-1 transition w-fit font-semibold p-1 px-2 text-xs rounded-full bg-accent-2/20 uppercase text-accent-2"
              >
                {tag}
              </p>
            ))}
          </div>
          <h1 className="text-5xl font-migra mt-4">{post.fields.titulo}</h1>
          <p className="opacity-50 text-sm">{fecha}</p>
          {post.fields.featureImage && (
            <Image
              alt={"Feature image " + post.fields.titulo}
              src={"https:" + post.fields.featureImage.fields.file.url}
              height={300}
              width={500}
              className="rounded-3xl my-5 shadow-lg w-full"
            />
          )}

          <Desarrollo document={post.fields.desarrollo} />

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
