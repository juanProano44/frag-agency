import { useEffect } from 'react';

export function useRevealAnimation(selector: string) {
  useEffect(() => {
    let active = true;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      const gsapModule = await import('gsap');
      const scrollModule = await import('gsap/ScrollTrigger');

      if (!active) {
        return;
      }

      const { gsap } = gsapModule;
      const { ScrollTrigger } = scrollModule;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 900px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions as {
            reduceMotion: boolean;
          };

          gsap.fromTo(
            selector,
            { y: reduceMotion ? 0 : 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: reduceMotion ? 0 : 0.7,
              ease: 'power2.out',
              stagger: reduceMotion ? 0 : 0.08,
              scrollTrigger: {
                trigger: selector,
                start: 'top 85%',
                once: true,
              },
            },
          );
        },
      );

      cleanup = () => mm.revert();
    };

    void setup();

    return () => {
      active = false;
      if (cleanup) {
        cleanup();
      }
    };
  }, [selector]);
}
