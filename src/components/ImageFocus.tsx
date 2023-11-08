"use client";
import { Asset, AssetFile } from "contentful";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";

const ImageFocus = ({
  render,
  onClose,
}: {
  render: Asset<undefined, string>;
  onClose: () => void;
}) => {

  const date = new Date(render.sys.createdAt);

  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 0.7 }}
        className="fixed inset-0 flex flex-col items-center justify-start z-40 p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          layoutId={render.fields.file?.fileName}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={() => onClose()}
          className="p-1 h-fit max-w-3xl relative"
        >
          <Image
            className="rounded-xl max-h-[80vh] w-auto z-10 shadow-md shadow-black/40"
            src={"https:" + render.fields.file?.url}
            alt={render.fields.title!}
            height={render.fields.file?.details.image?.height}
            width={render.fields.file?.details.image?.width}
          />
          <div className="absolute inset-0 bg-white rounded-2xl -z-10"></div>
        </motion.div>
          <motion.p className="drop-shadow text-back font-migra-italic text-2xl capitalize mt-4">« {render.fields.title} »</motion.p>
          <motion.p className="text-back opacity-50">{date.toLocaleDateString('es-ar', {dateStyle: 'long'})}</motion.p>
      </motion.div>
      <button
        onClick={() => onClose()}
        className="text-white fixed left-1/2 -translate-x-1/2 bottom-6 z-50"
      >
        <span className="flex items-center gap-1 text-xs">
          <Cross1Icon />
          cerrar
        </span>
      </button>
      <div className="fixed backdrop-blur-sm inset-0 z-10 bg-black opacity-75 cursor-pointer"></div>
    </AnimatePresence>
  );
};

export default ImageFocus;
