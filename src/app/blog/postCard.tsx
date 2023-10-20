import { ImageType, PostType } from "./types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export default function PostCard({ post }: { post: PostType }) {
  const fecha = new Date(post.fields.fechaDeEntrada).toLocaleDateString(
    "es-ar",
    {
      dateStyle: "medium",
    }
  );

  const featureImage: ImageType = post.fields.featureImage;

  return (
    <Link
      prefetch={false}
      href={"blog/" + post.sys.id}
      className="cursor-pointer group flex flex-col border-fore relative"
    >
      <div className="p-3">
        <Marquee
          autoFill
          pauseOnHover
          className="mb-2 w-fit group bg-accent-2/10 p-2 rounded-full"
        >
          {post.fields.tags.map((tag, index) => (
            <p className="mr-2 transition-all group-hover:py-1 hover:px-3 hover:bg-accent-2 hover:text-back text-sm bg-accent-2/20 text-accent-2 rounded-full px-2">
              {tag.replace(" ", "-")}
            </p>
          ))}
        </Marquee>
        <h2 className="uppercase transition-all text-2xl text-ellipsis">
          {post.fields.titulo}
        </h2>

        <p className="text-sm mt-1 flex opacity-50 justify-between">
          {fecha} · Pedro Machado
        </p>
      </div>
      {featureImage && (
        <Image
          src={"https:" + featureImage.fields.file.url}
          height={500}
          width={500}
          alt="blogpost picture"
          className="transition z-20 rounded-3xl w-full"
        />
      )}
    </Link>
  );
}
