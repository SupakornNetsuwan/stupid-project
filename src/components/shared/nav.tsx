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
    <div class="w-full flex justify-center pt-10">
      <ul class="flex space-x-10 bg-black/80 rounded-lg max-w-[60%] w-full py-5 px-10">
        {MenuList.map((item: Menu, key) => (
          <p
            class="text-white font-medium hover:underline hover:underline-offset-2 hover:text-[#fe5a99] cursor-progress select-none"
            key={key}
          >
            {item.name}
          </p>
        ))}
      </ul>
    </div>
  );
});
