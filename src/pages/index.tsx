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
import { AnimatePresence, motion } from "framer-motion";
import { client } from "@/lib/contentful";
import { Asset } from "contentful";


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

export async function getStaticProps() {
  const rendersPosiblesId = [
    "6lD3JuM9cCIB3GLMXIBDhY",
    "7xinD0xC3kjmDLZqC8tJI7",
  ];

  const selectedId =
    rendersPosiblesId[Math.floor(Math.random() * rendersPosiblesId.length)];

  const { data: proyectos } = await apollo.query({ query: GET_PROYECTOS });
  const render = await client.getAsset("wRNe99SnX39ZvRs3czQYk");

  return {
    props: {
      proyectos: proyectos.proyectoCollection.items,
      render,
    },
  };
}

export default function Home({
  proyectos,
  render,
}: {
  proyectos: Array<{ nombre: string; desc: string; href: string }>;
  render: Asset<undefined, string>;
  loading: boolean;
}) {
  const container = useRef<HTMLElement>(null);

  initAnimations(container);
  return (
    <>
      <main
        ref={container}
        className={inter.className + "scroll-smooth cursor-default"}
      >
        <section id="inicio" className="relative fillscreen w-screen">
          <div
            id="hero-content"
            className="relative inset-0 h-full flex flex-col p-12 md:p-20 justify-center md:items-between"
          >
            <Image
              src={"https:" + render.fields.file?.url!}
              height={render.fields.file?.details.image?.height}
              width={render.fields.file?.details.image?.width}
              alt="hero"
              id="render"
              priority={true}
              quality={100}
              className="brightness-90 -z-20 absolute top-0 left-0 h-screen p-6 rounded-[3rem]"
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
                className="self-center min-w-fit p-5 mt-6 rounded-full bg-back text-fore text-xs"
                href={"/blog"}
              >
                Ir al blog -&gt;
              </Link>
            </div>
            <div
              id="tag-container"
              className="flex flex-col md:flex-row i mt-6 items-center justify-between"
            >
              <p className="tag font-migra-italic text-back text-4xl md:text-6xl">
                artist, designer
              </p>
              <p className="tag text-back text-xs md:text-xl uppercase">
                based in argentina
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
        <div>
        </div>
        <section
          id="proyectos"
          className="flex flex-col md:flex-row items-start md:items-center gap-12 px-6 mt-20"
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
