import { component$ } from "@builder.io/qwik";

interface Menu {
  name: string;
}

const MenuList: Menu[] = [
  {
    name: "Home",
  },
  {
    name: "Note",
  },
];

export default component$(() => {
  return (
    <div class="w-full flex justify-center sticky top-4 left-0 z-30 bg-black/60 rounded-md backdrop-blur-sm">
      <ul class="flex space-x-10  rounded-lg  w-full py-5 px-10">
        {MenuList.map((item: Menu, key) => (
          <p
            class="text-white font-medium hover:underline hover:underline-offset-2 hover:text-primary cursor-progress select-none"
            key={key}
          >
            {item.name}
          </p>
        ))}
      </ul>
    </div>
  );
});
