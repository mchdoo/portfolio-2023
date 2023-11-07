import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { client } from "@/lib/contentful";
import { TypeRenderSkeleton } from "@/lib/types";
import RenderImage from "../../../components/renderImage";
import Gallery from "@/components/gallery";

async function Galeria() {
  const { items: renders } = await client.getAssets({
    "metadata.tags.sys.id[in]": ["galeria"],
  });

  return (
    <main>
      <Marquee
        className="border-y py-2 bg-accent-2/20 border-fore uppercase"
        autoFill
      >
        Preview – página en contrucción –&nbsp;
      </Marquee>

      <section className="p-5">
        <Gallery renders={renders} />
      </section>

      {/*      <section className={`columns-2 md:columns-3 lg:columns-4 gap-2 p-2`}>*/}
      {/*        <AnimatePresence presenceAffectsLayout>*/}
      {/*          {renders && */}
      {/*            renders.map((render, index) => {*/}
      {/*              return (*/}
      {/*                <motion.div*/}
      {/*                  transition={{ delay: index * 0.1 }}*/}
      {/*                  initial={{ opacity: 0, y: -30 }}*/}
      {/*                  animate={{ opacity: 1, y: 0 }}*/}
      {/*//                  onClick={() => setSelectedId(index + 1)}*/}
      {/*                  key={index}*/}
      {/*                  className={`relative overflow-hidden select-none*/}
      {/*                group transition-all min-h-max mb-2`}*/}
      {/*                >*/}
      {/*                  <Image*/}
      {/*                    src={"https://" + render.url}*/}
      {/*                    height={render.height / 5}*/}
      {/*                    width={render.width / 5}*/}
      {/*                    alt={render.title}*/}
      {/*                    className="w-full h-full rounded object-contain overflow-hidden transition-all cursor-pointer"*/}
      {/*                  />*/}
      {/*                  <motion.div*/}
      {/*//                    onClick={() => setSelectedId(null)}*/}
      {/*                    className="opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition rounded text-center w-full p-6 absolute top-0 text-back bg-gradient-to-b from-black/50"*/}
      {/*                  >*/}
      {/*                    «{render.title}»*/}
      {/*                  </motion.div>*/}
      {/*                </motion.div>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*        </AnimatePresence>*/}
      {/*        <AnimatePresence mode="wait">*/}
      {/*          {selectedId && (*/}
      {/*            <motion.div*/}
      {/*              initial={{ opacity: 0 }}*/}
      {/*              animate={{ opacity: 1 }}*/}
      {/*              exit={{ opacity: 0 }}*/}
      {/*//              onClick={() => setSelectedId(null)}*/}
      {/*              className="fixed backdrop-blur-md inset-0 bg-black/50 z-40 flex justify-center p-6"*/}
      {/*            >*/}
      {/*              <motion.div*/}
      {/*                initial={{ y: 200, scale: 0.8, opacity: 0 }}*/}
      {/*                animate={{ y: 0, scale: 1, opacity: 1 }}*/}
      {/*                exit={{ y: 100, scale: 0.8, opacity: 0 }}*/}
      {/*                className="p-3 h-fit grid place-items-center"*/}
      {/*              >*/}
      {/*                <h2 className="text-4xl font-migra-italic text-back">*/}
      {/*                  — {viewingRender.title} —*/}
      {/*                </h2>*/}

      {/*                <Image*/}
      {/*                  priority*/}
      {/*                  src={viewingRender.url}*/}
      {/*                  alt="display render"*/}
      {/*                  height={viewingRender.height}*/}
      {/*                  width={viewingRender.width}*/}
      {/*                  className="my-2 max-h-[80vh] w-auto rounded-xl bg-white/20 backdrop-blur-md"*/}
      {/*                />*/}
      {/*                {viewingRender.description && (*/}
      {/*                  <h2 className="text-white text-sm opacity-80 max-w-sm p-2 rounded text-center">*/}
      {/*                    {viewingRender.description}*/}
      {/*                  </h2>*/}
      {/*                  )}*/}
      {/*              </motion.div>*/}
      {/*              <motion.button*/}
      {/*                initial={{ opacity: 0, y: 16 }}*/}
      {/*                animate={{ opacity: 0.8, y: 0 }}*/}
      {/*                exit={{ opacity: 0, y: 16 }}*/}
      {/*                className="absolute bottom-0 left-0 w-full text-back py-6 text-center"*/}
      {/*              >*/}
      {/*                cerrar*/}
      {/*              </motion.button>*/}
      {/*            </motion.div>*/}
      {/*          )}*/}
      {/*        </AnimatePresence>*/}
      {/*//      </section>*/}
    </main>
  );
}

export default Galeria;
