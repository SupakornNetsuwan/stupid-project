import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { HiTrashOutline } from "@qwikest/icons/heroicons";
import type { Memo } from "../types/memoTypes";
import { animate, spring } from "motion";

const Item = component$<{ memo: Memo; deleteMemo: (memo: Memo) => void }>(({ memo, deleteMemo }) => {
  const element = useSignal<HTMLElement>();
  useVisibleTask$(() => {
    animate(element.value!, { y: [30, 0] }, { duration: 0.5, easing: spring({ mass: 0.8, velocity: 4 }) });
  });
  return (
    <div ref={element} class="w-full shadow border rounded p-4 space-y-3">
      <div class="flex items-center justify-between">
        <p class="font-medium text-xl text-primary">{memo.title}</p>
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
