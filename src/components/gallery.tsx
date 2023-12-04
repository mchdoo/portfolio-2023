"use client";

import * as React from "react";
import { useState } from "react";
import { Asset, AssetFile } from "contentful";
import RenderImage from "./renderImage";
import ImageFocus from "./ImageFocus";
import { motion } from "framer-motion";

function Gallery({ renders }: { renders: Asset<undefined, string>[] }) {
  const [selectedImage, setSelectedImage] = useState<Asset<
    undefined,
    string
  > | null>(null);

  return (
    <div className="gap-3 columns-2 md:columns-3 lg:columns-4">
      {renders.map((render, index) => (
        <RenderImage
          onClick={() => setSelectedImage(render)}
          key={index}
          render={render}
        />
      ))}
      {selectedImage && (
        <ImageFocus
          render={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export default Gallery;
