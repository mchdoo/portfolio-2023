import { TypeRender } from "@/lib/types";
import type { AssetFields, Asset } from "contentful";
import React from "react";
import Image from "next/image";

export default function RenderImage({
  render,
}: {
  render: Asset<undefined, string>;
}) {
  const { title, file } = render.fields;
  const url = "https:" + file!.url;

  return (
    <Image
      className="w-full h-full max-h-[300px] object-cover object-center"
      alt={file!.fileName}
      src={url}
      height={file!.details.image!.height / 5}
      width={file!.details.image!.width / 5}
    />
  );
}
