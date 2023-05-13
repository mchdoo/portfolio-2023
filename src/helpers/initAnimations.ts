import { RefObject, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const initAnimations = async (container: RefObject<HTMLElement>) => {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.set("#cursor", {
        scale: 0,
        xPercent: -50,
        yPercent: -50,
      });

      gsap.to(" #render, #inicio", {
        scrollTrigger: {
          trigger: "#proyectos",
          scrub: 1,
          start: "-=300px center",
          end: "bottom top",
        },
        height: 0,
        ease: "power2.out",
      });

      gsap.to(" #cursor", {
        scrollTrigger: {
          trigger: "#proyectos",
          toggleActions: "restart reverse none none",
        },
        borderColor: "var(--fore)",
        scale: 1,
        overwrite: "auto",
        ease: "power3.out",
      });

      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
          },
          delay: 0.5,
        })
        .from("#render", {
          opacity: 0,
          duration: 1,
          delay: 0.3,
          height: 0,
        })
        .from("#tag-container", {
          height: 0,
          opacity: 0,
        })
        .from(".tag", {
          y: 50,
          opacity: 0,
          stagger: 0.3,
        })
        .from("#galeria-button", {
          opacity: 0,
          padding: 0,
        })
        .from("#scroll", {
          filter: "blur(20px)",
          opacity: 0,
          duration: 2,
        })
        .then(() => {
          window.addEventListener("mousemove", (e) => {
            gsap.to("#cursor", {
              x: e.x,
              y: e.y + window.scrollY,
            });

            gsap.to(".linkbox", {
              y: e.movementX / 2,
              x: e.movementY / 3,
              stagger: 0.1,
            });

            gsap.to(".tag", {
              x: e.movementX / 40,
              y: e.movementY / 40,
              ease: "circ",
            });
          });
        });
    }, container);

    return () => ctx.revert();
  }, []);
};
