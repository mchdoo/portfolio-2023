import { useIsomorphicLayoutEffect } from "@/helpers/initAnimations";
import { apollo } from "@/lib/apollo";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import React, { useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { AnimatePresence, delay, motion } from "framer-motion";

const GET_RENDERS = gql`
  query {
    assetCollection(where: { contentfulMetadata: { tags_exists: true } }) {
      items {
        url
        title
        description
        width
        height
      }
    }
  }
`;

export async function getStaticProps() {
  const { data: renders, loading } = await apollo.query({
    query: GET_RENDERS,
  });

  return await {
    props: {
      renders: renders.assetCollection.items,
      loading,
    },
  };
}

function Galeria({
  renders,
  loading,
}: {
  renders: Array<{
    url: string;
    title: string;
    height: number;
    width: number;
    description: string;
  }>;
  loading: boolean;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const viewingRender = renders[selectedId! - 1];
  return (
    <main>
      {loading && <p>Loading...</p>}
      {/* <div className={`absolute z-30 top-0 left-0 h-screen w-screen inset-0 backdrop-blur backdrop-brightness-50 pointer-events-none ${viewing != null && 'visible'}`}></div> */}
      <nav className="border-b items-center border-fore sticky top-0 bg-back z-30 inline-flex w-full h-24">
        <Link
          className="group border-r border-fore h-full grid aspect-square place-items-center"
          href="/"
        >
          <span className="group-hover:-translate-x-2 transition">&lt;-</span>
        </Link>

        <h1
          id="nav-title"
          className="font-migra uppercase text-3xl leading-none p-6"
        >
          Galería
        </h1>
      </nav>
      <Marquee className="border-b border-fore uppercase" autoFill>
        Preview – página en contrucción –&nbsp;
      </Marquee>

      <section className={`columns-2 md:columns-3 lg:columns-4 gap-2 p-2`}>
        {loading && <span>CARGANDO...</span>}
        <AnimatePresence presenceAffectsLayout>
          {!loading &&
            renders.map((render, index) => {
              return (
                <motion.div
                  transition={{ delay: index * 0.1 }}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedId(index + 1)}
                  key={index}
                  className={`touch-none relative overflow-hidden select-none
                group transition-all min-h-max mb-2`}
                >
                  <Image
                    src={render.url}
                    height={render.height / 5}
                    width={render.width / 5}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      backgroundPosition: "center",
                    }}
                    alt={render.title}
                    className="w-full h-full rounded object-contain overflow-hidden transition-all cursor-pointer"
                  />
                  <motion.div
                    onClick={() => setSelectedId(null)}
                    className="opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition rounded text-center w-full p-6 absolute top-0 text-back bg-gradient-to-b from-black/50"
                  >
                    «{render.title}»
                  </motion.div>
                </motion.div>
              );
            })}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed backdrop-blur-md inset-0 bg-black/50 z-40 flex justify-center p-6"
            >
              <motion.div
                initial={{ y: 200, scale: 0.8, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 100, scale: 0.8, opacity: 0 }}
                className="p-3 rounded-lg bg-back h-fit grid place-items-center"
              >
                <h2 className="text-4xl font-migra-italic">
                  — {viewingRender.title} —
                </h2>
                {viewingRender.description && (
                  <h2 className="text-sm opacity-60 max-w-sm p-2 rounded text-center">
                    {viewingRender.description}
                  </h2>
                )}
                <Image
                  src={viewingRender.url}
                  alt="display render"
                  height={viewingRender.height}
                  width={viewingRender.width}
                  className="mt-2 max-h-[80vh] w-auto rounded border border-accent-2"
                />
              </motion.div>
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 0.8, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="absolute bottom-0 left-0 w-full text-back py-6 text-center"
              >
                cerrar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default Galeria;
