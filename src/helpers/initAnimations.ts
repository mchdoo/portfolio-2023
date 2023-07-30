import { RefObject, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const initAnimations = async (container: RefObject<HTMLElement>) => {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.to(" #render, #inicio", {
        scrollTrigger: {
          trigger: "#proyectos",
          scrub: 1,
          start: "-=400px center",
          end: "bottom top",
        },
        height: 0,
        ease: "power2.out",
      });

      gsap.to(" #scroll", {
        scrollTrigger: {
          trigger: "#proyectos",
          scrub: 1,
          start: "top bottom",
          end: "bottom +=600px",
        },
        opacity: 0,
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
            gsap.to(".linkbox", {
              y: e.movementX / 2,
              x: e.movementY / 3,
              stagger: 0.1,
            });
          });
        });
    }, container);

    return () => ctx.revert();
  }, []);
};
