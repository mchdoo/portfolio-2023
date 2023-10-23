import Image from "next/image";
import BackButton from "@/components/backButton";
import Link from "next/link";
import {HomeIcon, ImageIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import React from "react";


const links = [
  { src: "/", titulo: "Inicio", icon: <HomeIcon/> },
  { src: "/galeria", titulo: "Galería", icon: <ImageIcon/> },
  { src: "/blog", titulo: "Blog", icon: <ChatBubbleIcon/> },
];

export const metadata: Metadata = {
  title: 'SHOWCASE',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="transition-all p-4 flex justify-between items-center align-center">
          <div className="inline-flex justify-between w-full md:justify-start gap-2 h-12">
            <BackButton />
            <Image
              style={{ width: "auto", height: "auto" }}
              height={40}
              width={40}
              alt="PM"
              src={"/favicon.ico"}
            />
          </div>
          <ul className="hidden md:inline-flex">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className="flex gap-1 group transition-all duration-200 text-accent-1 hover:bg-accent-1/10 text-xs p-2 hover:px-3 bg-back rounded-full"
                  href={link.src}
                >
  	              {link.icon}
                  <span className="group-hover:block hidden">
                  {link.titulo}
                  </span>
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
