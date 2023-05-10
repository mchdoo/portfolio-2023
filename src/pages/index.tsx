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
import RenderResult from "next/dist/server/render-result";

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
  const { data: render } = await apollo.query({
    query: gql`
      query {
        asset(id: "7xinD0xC3kjmDLZqC8tJI7") {
          url
          height
          width
        }
      }
    `,
  });

  return {
    props: {
      proyectos: proyectos.proyectoCollection.items,
      render: render.asset,
    },
  };
}

export default function Home({
  proyectos,
  render,
}: {
  proyectos: Array<{ nombre: string; desc: string; href: string }>;
  render: { url: string; height: number; width: number };
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
          className="hidden md:visible absolute h-20 w-20 backdrop-blur-md pointer-events-none rounded-full -z-10 blur-md"
          id="cursor"
        ></div>

        <section id="inicio" className="relative h-screen w-screen">
          <div
            id="hero-content"
            className="relative inset-0 h-full flex flex-col p-8 md:p-20 justify-center md:items-between"
          >
            <Image
              src={render.url}
              height={render.height}
              width={render.width}
              alt="hero"
              id="render"
              className="-z-20 absolute top-0 left-0 h-screen p-3 rounded-3xl"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className="flex flex-col lg:flex-row justify-between">
              <Image
                id="iso"
                src={isoImage}
                alt="Pedro Machado"
                className="tag w-full"
              />
              <Link
                id="galeria-button"
                className="min-w-fit backdrop-brightness-90 self-center text-back p-6 mt-6 rounded-full backdrop-blur-md hover:backdrop-brightness-100"
                href={"/galeria"}
              >
                Ver galería -&gt;
              </Link>
            </div>
            <div
              id="tag-container"
              className="flex flex-col md:flex-row i mt-6 items-center justify-between"
            >
              <p className="tag font-migra-italic text-back text-4xl md:text-6xl">
                artist, designer
              </p>
              <p className="tag font-sans uppercase font-thin text-back text-xl md:text-3xl">
                necochea, argentina
              </p>
            </div>
            <h3
              id="scroll"
              className="text-back self-center animate-bounce absolute self-cente bottom-6"
            >
              {" "}
              scroll<span className="">&darr;</span>{" "}
            </h3>
          </div>
        </section>

        <section
          id="proyectos"
          className="flex flex-col items-start gap-12 mt-20 px-6"
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
