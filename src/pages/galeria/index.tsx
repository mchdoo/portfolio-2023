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
  const container = useRef(null);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: {
            ease: "circ.out",
          },
          delay: 0.5,
        })
        .from(".init", {
          x: -50,
          opacity: 0,
          stagger: 0.2,
        })
        .from(".img", {
          opacity: 0,
          scale: 0,
          stagger: {
            each: 0.1,
            from: "random",
          },
        });
    }, container);

    return () => ctx.revert();
  }, []);

  const [viewing, setViewing] = useState<number | null>(null);

  return (
    <main ref={container}>
      {/* <div className={`absolute z-30 top-0 left-0 h-screen w-screen inset-0 backdrop-blur backdrop-brightness-50 pointer-events-none ${viewing != null && 'visible'}`}></div> */}
      <nav className="sticky top-0 bg-back p-6 z-20">
        <Link className="opacity-50 hover:opacity-80 group transition" href="/">
          <span className="group-hover:translate-x-2">&lt;-</span> volver
        </Link>

        <div className="mt-6">
          <h1 className="init font-migra text-8xl">Galería</h1>
        </div>
      </nav>

      <section className={`columns-2 md:columns-xs xl:columns-4 gap-2 p-2`}>
        {loading && <span>CARGANDO...</span>}
        {!loading &&
          renders &&
          renders.map((render, index) => {
            return (
              <div
                key={index}
                className={`overflow-hidden bg-fore/20
                 mb-2 group transition-all ${
                   viewing == index
                     ? "scale-105 fixed top-6 h-max z-50 left-1/2 -translate-x-1/2"
                     : "relative scale-100 max-h-[400px]"
                 }`}
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
                  onClick={() => {
                    viewing === index ? setViewing(null) : setViewing(index);
                  }}
                  className="img w-full object-contain overflow-hidden cursor-pointer"
                />
                <div className="select-none cursor-pointer backdrop-brightness-90 w-full backdrop-blur-md duration-200 transition-all absolute top-0 text-back p-0 px-6 z-20 opacity-0 group-hover:py-6 group-hover:opacity-100">
                  &laquo; {render.title} &raquo;{" "}
                </div>
              </div>
            );
          })}
      </section>
    </main>
  );
}

export default Galeria;
