import Image from "next/image";
import escapeImage from "../../public/escape.jpg";
import isoImage from "../../public/iso.svg";
import { Inter } from "next/font/google";

import { ScrollTrigger } from "gsap-trial/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Head } from "next/document";
import {
  initAnimations,
  useIsomorphicLayoutEffect,
} from "@/helpers/initAnimations";

import { apollo } from "@/lib/apollo";

import Contacto from "@/components/contacto";
import Proyectos from "@/components/proyectos";

import { gql } from "@apollo/client";
import Link from "next/link";

const GET_PROYECTOS = gql`
  query {
    proyectoCollection {
      items {
        nombre
        desc
        href
      }
    }
  }
`;

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const { data: proyectos } = await apollo.query({ query: GET_PROYECTOS });

  return {
    props: {
      proyectos: proyectos.proyectoCollection.items,
    },
  };
}

export default function Home({
  proyectos,
}: {
  proyectos: Array<{ nombre: string; desc: string; href: string }>;
}) {
  const container = useRef<HTMLElement>(null);

  initAnimations(container);

  return (
    <>
      <main
        ref={container}
        className={inter.className + "scroll-smooth cursor-default"}
      >
        <div
          className="absolute h-20 w-20 backdrop-blur-md pointer-events-none rounded-full -z-10 blur-md"
          id="cursor"
        ></div>

        <section id="inicio" className="relative h-screen w-screen p-8">
          <Image
            src={escapeImage}
            alt="hero"
            id="render"
            fill
            className="-z-20"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="relative inset-0 h-full flex flex-col md:p-0 p-8 justify-center items-end md:items-center">
            <Image
              id="iso"
              src={isoImage}
              alt="Pedro Machado"
              className="tag"
            />
            <span className="flex flex-col md:flex-row w-1/2 items-end md:items-center mt-6 md:justify-between">
              <p className="tag font-migra-italic text-back text-2xl md:text-3xl">
                artist, designer
              </p>
              <p className="tag uppercase font-thin text-back text-xl md:text-2xl">
                necochea, argentina
              </p>
            </span>
            <Link
             id="galeria-button"
              className="self-center text-back p-6 mt-6 rounded-full backdrop-blur-md hover:backdrop-brightness-150 backdrop-brightness-125"
              href={"/galeria"}
            >
              Ver galería &rarr;
            </Link>
          </div>
        </section>

        <section
          id="proyectos"
          className="flex flex-col justify-center items-center gap-12 mt-32"
        >
          <Proyectos proyectos={proyectos} />
        </section>

        <section
          id="contacto"
          className="flex flex-col justify-center items-center my-32"
        >
          <Contacto />
        </section>
      </main>
    </>
  );
}
