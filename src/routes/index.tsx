import { component$, useStore, useSignal, $, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Rootlayout from "~/core/layout/rootlayout";
// Components
import Hero from "~/core/components/shared/hero";

// Types
import type { Memo } from "~/core/context/MemoContext";

export default component$(() => {
  const memoList = useStore<Memo[]>([{ title: "กินหมา", description: "กินหมาของคนข้างบ้าน", id: 1, date: new Date() }]);
  const addMode = useSignal(false);
  const title = useSignal("");
  const description = useSignal("");
  const date = useSignal(new Date());

  const addMemo = $(() => {
    memoList.push({ title: title.value, description: description.value, id: memoList.length + 1, date: date.value || new Date() });
  });

  useTask$(({ track }) => {
    track(memoList);
    console.log(memoList);
  });

  return (
    <Rootlayout>
      <Hero />
      <div>
        {!addMode.value ? (
          <button class="w-full rounded border shadow px-3 py-2 transition" onClick$={() => (addMode.value = true)}>
            จดสิ่งที่ต้องทำ 🫵
          </button>
        ) : (
          <div class="rounded border shadow px-3 py-2 flex justify-between transition">
            <div class="flex flex-col w-full gap-2">
              <label for="title">ชื่อรายการ</label>
              <input
                id="title"
                name="title"
                class="w-full p-2 border-b"
                onInput$={(e, el) => (title.value = el.value)}
                placeholder="Title"
                value={title.value}
                type="text"
              />
              <label for="description">รายละเอียด</label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows={5}
                class="resize-none w-full p-2 border-b"
                onInput$={(e, el) => (description.value = el.value)}
                value={description.value}
              />
              <input
                type="date"
                name="date"
                id="date"
                onChange$={(e, el) => (date.value = new Date(el.value))}
                class="p-2"
              />
              <div class="flex justify-end space-x-2">
                <button class="py-2 px-4 hover:bg-gray-100 roudned transition" onClick$={() => (addMode.value = false)}>
                  ปิด
                </button>
                <button
                  class="py-2 px-4 rounded shadow border-[#fe5a99] border hover:bg-[#fe5a99] hover:text-white transition"
                  onClick$={addMemo}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <p class="py-2 text-gray-500">รายการที่บันทึกไว้</p>
        <div class="flex flex-col gap-2">

        {memoList.map((memo, index) => {
          return (
            <div class="w-full shadow border rounded p-2" key={index}>
              <p>{memo.title}</p>
              <p class="line-clamp-15 break-words">{memo.description}</p>
              <p>วันที่ : {memo.date.toLocaleDateString()}</p>
            </div>
          );
        })}
        </div>
      </div>
    </Rootlayout>
  );
});

export const head: DocumentHead = {
  title: "Stupid Memo 🔥",
  meta: [
    {
      name: "description",
      content: "Memo แบบโง่ ๆ",
    },
  ],
};
