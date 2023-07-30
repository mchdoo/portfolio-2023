import { useIsomorphicLayoutEffect } from "@/helpers/initAnimations";
import { apollo } from "@/lib/apollo";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import React, { useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { AnimatePresence, motion } from "framer-motion";

const GET_RENDERS = gql`
  query {
    assetCollection(where: { contentfulMetadata: { tags_exists: true } }) {
      items {
        url
        title
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
  renders: Array<{ url: string; title: string; height: number; width: number }>;
  loading: boolean;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const viewingRender = renders[selectedId!];
  return (
    <main>
      {loading && <p>Loading...</p>}
      {/* <div className={`absolute z-30 top-0 left-0 h-screen w-screen inset-0 backdrop-blur backdrop-brightness-50 pointer-events-none ${viewing != null && 'visible'}`}></div> */}
      <nav className="border items-center border-fore sticky top-0 bg-back z-30 inline-flex w-full h-24">
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
        {!loading &&
          renders.map((render, index) => {
            return (
              <motion.div
                onClick={() => setSelectedId(index)}
                layoutId={index.toString()}
                key={index}
                className={`touch-none relative overflow-hidden select-none
                 group transition-all min-h-max mb-2`}
              >
                <Image
                  src={render.url}
                  height={render.height / 3}
                  width={render.width / 3}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    backgroundPosition: "center",
                  }}
                  alt={render.title}
                  className="w-full h-full rounded object-contain overflow-hidden transition-all cursor-pointer"
                />
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-2  text-xl text-back p-2 w-fit h-6 rounded-full hidden group-hover:flex items-center gap-2 ml-2"
                >
                  &#x26F6; <span className="text-sm">hacé click!</span>
                </button>
              </motion.div>
            );
          })}
        <AnimatePresence mode="wait">
          {selectedId && (
            <motion.div
              animate={false}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/50 z-50 flex justify-center p-6"
            >
              <motion.div
                layoutId={selectedId.toString()}
                className="p-3 rounded-lg bg-back h-fit grid place-items-center"
              >
                <motion.h2 className="text-4xl font-migra-italic mb-2">
                  — {viewingRender.title} —
                </motion.h2>
                <Image
                  src={viewingRender.url}
                  alt="display render"
                  height={viewingRender.height}
                  width={viewingRender.width}
                  className="max-h-[80vh] w-auto rounded border border-accent-2"
                />
              </motion.div>
              <button
                onClick={() => setSelectedId(null)}
                className="bg-back text-fore p-2 w-6 h-6 rounded-full grid place-content-center ml-2"
              >
                &#10005;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default Galeria;
