import { component$ } from "@builder.io/qwik";
import { Slot } from "@builder.io/qwik";
import Nav from "../components/shared/nav";

export default component$(() => {
  return (
    <section class="mx-auto justify-between w-full max-w-[90vw] md:max-w-[60vw] py-12">
      <Nav />
      <Slot />
    </section>
  );
});
