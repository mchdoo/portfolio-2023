import React, { useRef } from "react";
import { gsap } from "gsap";
import { reverse } from "dns";
import Marquee from "react-fast-marquee";
function Proyectos({
  proyectos,
}: {
  proyectos: Array<{ nombre: string; desc: string; href: string }>;
}) {
  return (
    <>
      <h1 id="title-proyectos" className="font-migra text-6xl md:text-8xl">
        Proyectos
      </h1>
      <div className="w-full">
        {proyectos.map((proyecto, index) => {
          const linkbox = useRef<HTMLDivElement>(null);
          const gotoId = `goto-${index}`;
          return (
            <div
              ref={linkbox}
              onClick={() => window.open(proyecto.href)}
              key={index}
              onMouseMove={(e) => {
                gsap.to(`#${gotoId}`, {
                  width: "auto",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(`#${gotoId}`, {
                  width: 48,
                });
              }}
              className="relative overflow-hidden mb-6 linkbox group transition-all backdrop-blur-xl text-fore border border-fore rounded-full cursor-pointer flex justify-between p-12"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3 border-fore">
                <p className="uppercase text-5xl mb-6 font-migra-italic">
                  {proyecto.nombre}
                </p>
                <Marquee
                  autoFill
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                  className="p-2 font-sans border-t border-fore lowercase text-right font-light"
                >
                  {proyecto.desc} &nbsp;
                </Marquee>
              </div>
              {proyecto.href ? (
                <div
                  id={`${gotoId}`}
                  className="group-hover:bg-fore bg-back z-50 group-hover:text-back flex items-center justify-center border-l border-fore absolute right-0 top-0 h-full w-12 aspect-square"
                >
                  -&gt;
                </div>
              ) : (
                <p className="opacity-50 text-xs">(en breve)</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Proyectos;
