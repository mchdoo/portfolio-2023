import React from 'react'

function Proyectos({proyectos}: {proyectos: Array<{ nombre: string; desc: string; href: string }>}) {
  return (
    <>
      <h1 className="font-migra text-6xl text-center">Proyectos</h1>
      <div
        id="glow"
        className="-z-30 h-52 w-64 blur-2xl bg-accent-2 opacity-50 absolute"
      ></div>
      <div className="grid md:grid-cols-3 gap-6">
        {proyectos.map((proyecto, index) => (
          <div
            onClick={() => window.open(proyecto.href)}
            key={index}
            className="linkbox group relative aspect-video transition-all p-6 bg-fore text-back md:aspect-square cursor-pointer flex flex-col justify-between hover:bg-accent-1"
          >
            <div className="inline-flex justify-between">
              <p className="relative uppercase text-xl ">{proyecto.nombre}</p>
              {proyecto.href ? <span
                id="goto"
                className="z-10 transition-all duration-150 absolute right-3 top-3 group-hover:text-xl group-hover:backdrop-blur-lg group-hover:-right-4 rounded-full w-10 h-10 grid place-items-center"
              >
                -&gt;
              </span> : <p className='opacity-50 text-xs'>(en breve)</p>}
            </div>
            <p className="font-sans lowercase text-right font-light">
              {proyecto.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Proyectos