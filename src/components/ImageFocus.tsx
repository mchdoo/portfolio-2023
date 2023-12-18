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
  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 0.5 }}
        className="fixed inset-0 flex flex-col items-center justify-start z-40 p-3 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          layoutId={render.fields.file?.fileName}
          transition={{ delay: 0.8 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={() => onClose()}
          className="p-1 h-fit max-w-3xl relative z-40"
        >
          <Image
            className="shadow-2xl rounded-xl max-h-[75svh] w-auto z-10 shadow-black/40"
            src={"https:" + render.fields.file?.url}
            alt={render.fields.title!}
            height={render.fields.file?.details.image?.height! / 2}
            width={render.fields.file?.details.image?.width! / 2}
          />
        </motion.div>

        <motion.div
          className={`shadow-xl cursor-normal text-center bg-black/20 backdrop-blur-xl w-fit grid place-items-center p-4 backdrop-brightness-100 rounded-${render.fields.description ? 'xl' : 'full'} mt-5 z-50`}
          transition={{
            delay: 1.3,
          }}
          initial={{ y: -10, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <p
            className={` text-back font-migra-italic text-3xl capitalize`}
          >
            « {render.fields.title} »
          </p>
          {render.fields.description && (
            <p className="text-back opacity-75 max-w-xs mt-2">
              {render.fields.description}
            </p>
          )}
        </motion.div>
      </motion.div>
      <button
        onClick={() => onClose()}
        className="bg-black/20 rounded-full text-back p-1 px-2 fixed left-1/2 -translate-x-1/2 top-4 z-50"
      >
        <span className="flex items-center gap-1 text-xs">
          <Cross1Icon />
          cerrar
        </span>
      </button>
      <motion.div
        onClick={() => onClose()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed backdrop-blur-lg inset-0 z-10 bg-black/0 cursor-pointer"
      ></motion.div>
    </AnimatePresence>
  );
};

export default ImageFocus;
