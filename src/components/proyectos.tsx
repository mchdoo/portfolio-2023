import React from 'react'

function Proyectos({proyectos}: {proyectos: Array<{ nombre: string; desc: string; href: string }>}) {
  return (
    <>
      <h1 className="font-migra text-7xl md:text-8xl">Proyectos</h1>
      <div
        id="glow"
        className="-z-30 h-52 w-64 blur-2xl bg-accent-2 opacity-50 absolute"
      ></div>
      <div className="grid w-full md:grid-cols-3 gap-6">
        {proyectos.map((proyecto, index) => (
          <div
            onClick={() => window.open(proyecto.href)}
            key={index}
            className="linkbox group relative aspect-video transition-all bg-back text-fore border border-fore md:aspect-square cursor-pointer flex flex-col justify-between"
          >
            <div className="inline-flex justify-between border-b border-fore p-6 items-center">
              <p className="relative uppercase text-xl">{proyecto.nombre}</p>
              {proyecto.href ? <span
                id="goto"
                className="group-hover:bg-fore group-hover:text-back border border-fore rounded-full h-10 w-10 absolute right-6 grid place-items-center"
              >
                -&gt;
              </span> : <p className='opacity-50 text-xs'>(en breve)</p>}
            </div>
            <p className=" p-3 font-sans lowercase text-right font-light">
              {proyecto.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Proyectos