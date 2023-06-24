import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Rootlayout from "~/components/layout/rootlayout";
import Hero from "~/components/shared/hero";

export default component$(() => {
  return (
    <Rootlayout>
      <Hero />
    </Rootlayout>
  );
});

export const head: DocumentHead = {
  title: "Stupid Shit",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
