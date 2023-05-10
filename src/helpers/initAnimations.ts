import { RefObject, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const initAnimations = (container: RefObject<HTMLElement>) => {
  useIsomorphicLayoutEffect(() => {
    
    let ctx = gsap.context(() => {
      gsap.set("#cursor", {
        scale: 0,
        xPercent: -50,
        yPercent: -50,
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
        .to("#cursor", {
          scale: 1,
          overwrite: "auto",
          ease: "power3.out",
        })
        .from("#galeria-button", {
          opacity: 0,
          padding: 0,
        })
        .from('#scroll', {
          filter: 'blur(20px)',
          opacity: 0,
          duration: 2,
        })
    }, container);

    window.addEventListener("mousemove", (e) => {
      gsap.to("#cursor", {
        x: e.x,
        y: e.y + window.scrollY,
      });

      gsap.to(".linkbox", {
        y: e.movementX / 2,
        x: e.movementY / 2,
        stagger: {
          each: 0.2,
          from: "center",
          yoyo: true,
        },
        ease: "circ",
      });

      gsap.to(".tag", {
        x: e.movementX / 40,
        y: e.movementY / 40,
        ease: "circ",
      });
    });

    return () => ctx.revert();
  }, []);
};
