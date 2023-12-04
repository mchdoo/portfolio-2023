import type { AssetFields, Asset } from "contentful";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import { SizeIcon } from "@radix-ui/react-icons";
import LoadingComponent from "./loadingComponent";

export default function RenderImage({
  render,
  onClick,
}: {
  render: Asset<undefined, string>;
  onClick: () => void;
}): JSX.Element {
  const { file } = render.fields;
  const url = "https:" + file!.url;
  const [hovering, setHovering] = useState(false);

  return (
    <Suspense fallback={<LoadingComponent fallback />}>
      <div className="first-of-type:mt-0 mt-3 relative">
        <Image
          onMouseOver={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={() => onClick()}
          className={`w-full rounded-lg transition-all cursor-pointer active:scale-100 max-h-[300px] object-center object-cover`}
          alt={file!.fileName}
          src={url}
          height={file!.details.image!.height / 5}
          width={file!.details.image!.width / 5}
        />
        {hovering && (
          <div className="pointer-events-none scale-95 bg-black/50 absolute rounded-lg inset-0 grid place-content-center">
            <SizeIcon className="text-white scale-125" />
          </div>
        )}
      </div>
    </Suspense>
  );
}
