import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { HiTrashOutline } from "@qwikest/icons/heroicons";
import type { Memo } from "../types/memoTypes";
import { animate, timeline, spring } from "motion";

const Item = component$<{ memo: Memo; deleteMemo: (memo: Memo) => void }>(({ memo, deleteMemo }) => {
  const element = useSignal<HTMLElement>();
  useVisibleTask$(() => {
    const [title, description, date] =
      [element.value?.querySelector("div")].concat(...(element.value?.querySelectorAll("p") || [])) || [];

    if (!title || !description || !date) return;

    animate(element.value!, { height: ["2em", "10em"] }, { duration: 0.5, easing: spring() });
    timeline([
      [element.value!, { y: [30, 0] }, { duration: 0.5, easing: spring({ mass: 0.8, velocity: 4 }) }],
      [title, { y: [10, 0], opacity: [0, 1] }, { at: 0.5 }],
      [description, { y: [10, 0], opacity: [0, 1] }, { at: 0.6, easing: spring({ mass: 0.8, velocity: 8 }) }],
      [date, { y: [10, 0], opacity: [0, 1] }, { at: 0.7, easing: spring({ mass: 0.8, velocity: 10 }) }],
    ]);
  });
  return (
    <div ref={element} class="w-full shadow border rounded p-4 space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-medium text-xl text-primary">{memo.title}</h3>
        <HiTrashOutline
          onClick$={() => deleteMemo(memo)}
          class="text-xl text-red-500 cursor-pointer p-2 rounded-full hover:bg-red-50 transition box-content"
        />
      </div>
      <p class="line-clamp-15 break-words text-gray-600">{memo.description}</p>
      <p class="text-gray-400 text-sm">วันที่ : {new Date(memo.date).toLocaleDateString()}</p>
    </div>
  );
});

export default Item;
