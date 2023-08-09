import { PostType } from "./types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export default function PostCard({ post }: { post: PostType }) {
  //   const [fecha, setFecha] = useState("—");

  //   useEffect(() => {
  //     setFecha(
  //       new Date(post.fechaDeEntrada).toLocaleDateString("es-ar", {
  //         dateStyle: "medium",
  //       })
  //     );
  //   }, []);

  const fecha = new Date(post.fechaDeEntrada).toLocaleDateString("es-ar", {
    dateStyle: "medium",
  });

  return (
    <Link
      href={"blog/" + post.sys.id}
      className="cursor-pointer group flex flex-col border-fore relative"
    >
      <div className="p-3">
        <button className="absolute bottom-3 right-3 bg-back z-30 h-10 w-10 grid place-content-center rounded-full">
          {" "}
          -&gt;{" "}
        </button>

        <Marquee
          autoFill
          pauseOnHover
          className="mb-2 w-fit group bg-accent-2/10 p-2 rounded-full"
        >
          {post.tags.map((tag, index) => (
            <p className="mr-2 transition-all group-hover:py-1 hover:px-3 hover:bg-accent-2 hover:text-back text-sm bg-accent-2/20 text-accent-2 rounded-full px-2">
              {tag.replace(" ", "-")}
            </p>
          ))}
        </Marquee>
        <h2 className="uppercase transition-all group-hover:font-bold text-2xl text-ellipsis">
          {post.titulo}
        </h2>

        <p className="text-sm mt-1 flex opacity-50 justify-between">
          {fecha} · Pedro Machado
        </p>
      </div>
      <Image
        priority={true}
        src={post.featureImage.url}
        height={200}
        width={500}
        alt="blogpost picture"
        className="w-full transition z-20 rounded-3xl"
      />
    </Link>
  );
}
