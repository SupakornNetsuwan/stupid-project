import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { stagger, timeline, spring } from "motion";

export default component$<{ isMouseOver: boolean }>(({ isMouseOver }) => {
  const outputRef = useSignal<Element>();

  useVisibleTask$(({ track }) => {
    const hoverAnimation = timeline(
      [
        [
          "#title",
          { y: [10, 0, -2, 6, -4], x: [10, 0, 4, -2, 4] },
          { duration: 0.3 },
        ],
        [
          "#title > span",
          { color: ["black", "#824d61", "#fe5a99", "#824d61", "black"] },
          { duration: 0.4, at: "<", delay: stagger(0.1) },
        ],
      ],
      {
        repeat: Infinity,
        defaultOptions: {
          easing: "linear",
        },
        direction: "alternate",
      }
    );

    track(() => isMouseOver);
    if (isMouseOver) {
      hoverAnimation.play();
    } else {
      hoverAnimation.pause();
    }
  });

  useVisibleTask$(() => {
    timeline([
      [
        "#title ",
        { y: [40, 0] },
        { duration: 0.3, easing: spring({ mass: 0.8 }) },
      ],
      [
        "#title > span",
        { opacity: [0, 1] },
        {
          duration: 1,
          easing: spring({ mass: 1 }),
          delay: stagger(0.1),
          at: "<",
        },
      ],
    ]);

    timeline([
      ["#shit", { x: [24, 0] }, { duration: 0.5, easing: "ease-out" }],
      [
        "#shit",
        { y: [-24, -18, 0] },
        { duration: 0.5, easing: ["linear"], at: "<" },
      ],
      [
        "#shit",
        { rotate: ["-85deg", "-12deg"], scale: [0.6, 1] },
        { duration: 0.5, at: "<" },
      ],
    ]);
  });

  return (
    <div id="hero" class="flex justify-center items-center py-12 w-full">
      <div class="relative flex items-end justify-end">
        <div
          ref={outputRef}
          id="title"
          class="text-[20vw] md:text-9xl font-bold"
        >
          <span>M</span>
          <span>e</span>
          <span>m</span>
          <span>o</span>
        </div>
        <p
          id="shit"
          style={{
            textShadow:
              " -1px -1px 0 white, 1px -1px 0 black, -1px 1px 0 white, 1px 1px 0 white;",
          }}
          class="text-[4vw] md:text-xl font-semibold bg-primary/30 text-primary backdrop-blur py-0.5 px-3 absolute bottom-0 -right-2 -rotate-12"
        >
          SHT7!
        </p>
      </div>
    </div>
  );
});
