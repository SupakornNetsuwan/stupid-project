import { component$ } from "@builder.io/qwik";

interface MemoItemProps {
  title?: string;
  desc?: string;
};

export default component$<MemoItemProps>(({title, desc}) => {
  return (
    <button class="w-full shadow border rounded p-2 text-start self-start">
      <h1 class="text-4xl">
        {title}
      </h1>
      <p class="line-clamp-15 break-words">
        {desc}
      </p>
      <div class="w-full flex justify-end">
        11-11-2021
      </div>
    </button>
  ); 
});
