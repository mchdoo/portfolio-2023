import Link from "next/link";
import Image from "next/image";
import Desarrollo from "./desarrollo";
import { client } from "@/lib/contentful";
import { TypePortfolioPostSkeleton } from "@/lib/types";
import { Asset } from "contentful";

async function PostPage({ params }: { params: { id: string } }) {
  const post =
    await client.withoutUnresolvableLinks.getEntry<TypePortfolioPostSkeleton>(
      params.id
    );

  const fecha = new Date(post.sys.updatedAt).toLocaleDateString("es-ar", {
    dateStyle: "long",
  });

  return (
    <main className="text-center">
      {post.fields && (
        <main className="grid place-items-center py-4 px-6">
          <span className="h-16"></span>
          <h1 className="text-5xl font-migra mb-4">{post.fields.titulo}</h1>
          <p className="opacity-50 text-sm mb-4">{fecha}</p>
          <div className="flex gap-2 items-baseline ">
            {post.fields.tags.map((tag: string, index: number) => (
              <p
                key={index}
                className="transition-all text-xs text-accent-2 hover:bg-accent-2/20 cursor-pointer bg-accent-2/10 rounded p-1.5 px-2"
              >
                {tag}
              </p>
            ))}
          </div>
          <Image
            alt={"Feature image " + post.fields.titulo}
            src={"https:" + post.fields.featureImage.fields.file.url}
            height={300}
            width={500}
            className="rounded-3xl my-5 shadow-lg w-full md:max-w-xl"
          />

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
