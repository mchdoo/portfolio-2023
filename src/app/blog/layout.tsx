import Image from "next/image";
import BackButton from "./backButton";
import Link from "next/link";

const links = [
  { src: "/galeria", titulo: "Galería" },
  { src: "/", titulo: "Inicio" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="transition-all p-4 flex justify-between items-center align-center">
          <div className="inline-flex justify-between w-full md:justify-start gap-2">
            <BackButton />
            <Image
              style={{ width: "auto", height: "auto" }}
              height={50}
              width={50}
              alt="PM"
              src={"/favicon.ico"}
            />
          </div>
          <ul className="hidden md:inline-flex">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className="transition-all text-accent-1 hover:bg-accent-1/10 text-xs p-2 hover:px-3 bg-back rounded-full"
                  href={link.src}
                >
                  {link.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
