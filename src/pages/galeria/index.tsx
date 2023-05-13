import { useIsomorphicLayoutEffect } from "@/helpers/initAnimations";
import { apollo } from "@/lib/apollo";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import React, { useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

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
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("nav", {
      scrollTrigger: {
        trigger: "nav",
        start: "+=2rem top",
        scrub: 0.5,
      },
      ease: "circ.out",
      height: "4rem",
      duration: 0.5,
    });

    let ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
            duration: 0.8,
          },
        })
        .from("nav", {
          height: 0,
          opacity: 0,
        });
    }, container);

    return () => ctx.revert();
  }, []);

  const [viewing, setViewing] = useState<number | null>(null);

  return (
    <main ref={container}>
      {/* <div className={`absolute z-30 top-0 left-0 h-screen w-screen inset-0 backdrop-blur backdrop-brightness-50 pointer-events-none ${viewing != null && 'visible'}`}></div> */}
      <nav className="border items-center border-fore sticky top-0 bg-back z-50 inline-flex w-full h-24">
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

      <section className={`columns-2 md:columns-xs xl:columns-4 gap-0`}>
        {loading && <span>CARGANDO...</span>}
        {!loading &&
          renders &&
          renders.map((render, index) => {
            return (
              <div
                key={index}
                className={`relative overflow-hidden
                 group transition-all ${
                   viewing == index
                     ? //  ? "scale-105 fixed top-6 h-max z-50 left-1/2 -translate-x-1/2"
                       "h-max"
                     : "max-h-[400px]"
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
                  className="w-full object-contain overflow-hidden transition-all cursor-pointer"
                />
                <div className="z-10 select-none cursor-pointer backdrop-brightness-90 w-full backdrop-blur-md duration-200 transition-all absolute top-0 text-back p-0 px-6 opacity-0 group-hover:py-6 group-hover:opacity-100">
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
