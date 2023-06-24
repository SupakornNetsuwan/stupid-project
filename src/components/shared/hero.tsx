import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex justify-center items-center h-[70vh] w-full">
      <div class="relative flex items-end justify-end">
        <h1 class="text-9xl font-semibold">Memo</h1>
        <p class="font-semibold bg-[#fe5a99] py-0.5 px-3 w-fit absolute top-24 -right-2 -rotate-12">
          SHT7!
        </p>
      </div>
    </div>
  );
});
