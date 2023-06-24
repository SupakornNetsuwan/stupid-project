import { component$ } from "@builder.io/qwik";
import { Slot } from "@builder.io/qwik";
import Nav from "../shared/nav";

export default component$(() => {
  return (
    <section>
      <Nav />
      <div class="mx-auto justify-between max-w-7xl w-full">
        <Slot />
      </div>
    </section>
  );
});
