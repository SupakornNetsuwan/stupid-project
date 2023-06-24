import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { stagger, timeline, spring } from "motion";

export default component$(() => {
  const outputRef = useSignal<Element>();

  useVisibleTask$(() => {
    timeline([
      ["#title ", { y: [40, 0] }, { duration: 0.3, easing: spring({ mass: 0.8 }) }],
      [
        "#title > span",
        { opacity: [0, 1] },
        { duration: 1, easing: spring({ mass: 1 }), delay: stagger(0.1), at: "<" },
      ],
    ]);

    timeline([
      ["#shit", { x: [24, 0] }, { duration: 0.5, easing: "ease-out" }],
      ["#shit", { y: [-24, -18, 0] }, { duration: 0.5, easing: ["linear"], at: "<" }],
      ["#shit", { rotate: ["-85deg", "-12deg"], scale: [0.6, 1] }, { duration: 0.5, at: "<" }],
    ]);
  });

  return (
    <div id="hero" class="flex justify-center items-center py-12 w-full">
      <div class="relative flex items-end justify-end">
        <div ref={outputRef} id="title" class="text-[20vw] md:text-9xl font-semibold">
          <span>M</span>
          <span>e</span>
          <span>m</span>
          <span>o</span>
        </div>
        <p
          id="shit"
          class="text-[4vw] md:text-base font-semibold bg-primary py-0.5 px-3 absolute bottom-0 -right-2 -rotate-12"
        >
          SHT7!
        </p>
      </div>
    </div>
  );
});
