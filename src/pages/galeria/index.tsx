import { useIsomorphicLayoutEffect } from "@/helpers/initAnimations";
import { apollo } from "@/lib/apollo";
import { ApolloError, gql, useQuery } from "@apollo/client";
import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import React, { useRef, useState } from "react";

const GET_RENDERS = gql`
  query {
    assetCollection {
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
  const [cols, setCols] = useState(2);
  const container = useRef(null);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: {
            ease: "circ.out",
          },
          delay: 2,
        })
        .from(".init", {
          x: -50,
          opacity: 0,
          stagger: 0.2,
        })
        .from(".img", {
          opacity: 0,
          scale: 0,
          stagger: 0.2,
        });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={container}>
      <nav className="sticky top-0 bg-back p-6 z-40">
        <Link className="init opacity-50 hover:opacity-100 group" href="/">
          <span className="group-hover:-translate-x-3">&larr;</span> Volver
        </Link>

        <div className="mt-6">
          <h1 className="init font-migra text-8xl">Galería</h1>
        </div>
      </nav>

      <section className={`columns-3xs md:columns-xs xl:columns-4 gap-2 p-2`}>
        {!loading &&
          renders &&
          renders.map((render, index) => {
            const [fs, setFs] = useState(false);

            return (
              <div
                key={index}
                className={` overflow-hidden
                 mb-2 group transition-all relative  max-h-[400px]`}
              >
                <Image
                  src={render.url}
                  height={400}
                  width={400}
                  alt={render.title}
                  onClick={() => setFs(!fs)}
                  className="img w-full object-contain overflow-hidden cursor-pointer"
                />
                <div className="select-none cursor-pointer w-full backdrop-blur-md duration-200 transition-all absolute top-0 text-back p-0 px-6 z-20 opacity-0 group-hover:py-6 group-hover:opacity-100">
                  &laquo; {render.title} &raquo;{" "}
                  <span className="float-right">&#x26F6;</span>
                </div>
              </div>
            );
          })}
      </section>
    </main>
  );
}

export default Galeria;
