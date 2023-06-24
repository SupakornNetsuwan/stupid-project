import {
  component$,
  useSignal,
  $,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Rootlayout from "~/core/layout/rootlayout";
import Hero from "~/core/components/shared/hero";
import type { Memo } from "~/core/context/MemoContext";

export default component$(() => {
  const memoList = useSignal<Memo[]>([]);
  const addMode = useSignal(false);
  const title = useSignal("");
  const description = useSignal("");
  const date = useSignal(new Date());
  const trashMemo = useSignal<Memo[]>([]);

  const addMemo = $(() => {
    memoList.value = [
      ...memoList.value,
      {
        id: memoList.value.length + 1,
        title: title.value,
        description: description.value,
        date: date.value || new Date(),
      },
    ];

    localStorage.setItem("sht-memo", JSON.stringify(memoList.value));
  });

  const random = $(async (chance : number) => {
    return Math.random() * 100 < chance;
  })

  useTask$(({ track }) => {
    track(memoList);
  });

  useVisibleTask$(() => {
    memoList.value = JSON.parse(localStorage.getItem("sht-memo") || "[]");

    // Randomly delete memo 
    memoList.value.forEach(async (memo, index) => {
      if (await random(25)) {
        trashMemo.value = [...trashMemo.value, memo];
        memoList.value = memoList.value.filter((_, i) => i !== index);
      }
    })
  });

  return (
    <Rootlayout>
      <Hero />
      <div>
        {!addMode.value ? (
          <button
            class="w-full rounded border shadow px-3 py-2 transition"
            onClick$={() => (addMode.value = true)}
          >
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
                placeholder="ชื่อรายการ"
                value={title.value}
                type="text"
              />
              <label for="description">รายละเอียด</label>
              <textarea
                id="description"
                name="description"
                placeholder="รายละเอียด"
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
                class="p-2 border-b w-full"
              />
              <div class="flex justify-end space-x-2">
                <button
                  class="py-2 px-4 hover:bg-gray-100 rounded transition"
                  onClick$={() => (addMode.value = false)}
                >
                  ปิด
                </button>
                <button
                  class="py-2 px-4 rounded shadow border-primary text-primary border hover:bg-primary hover:text-white transition"
                  onClick$={addMemo}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div class="pt-8">
        <p class="py-2 text-gray-500">รายการที่บันทึกไว้</p>
        {memoList.value && memoList.value.length != 0 ? (
          <div class="flex flex-col gap-2">
            {memoList.value.map((memo, index) => {
              return (
                <div
                  class="w-full shadow border rounded p-4 space-y-3"
                  key={index}
                >
                  <div>
                    <p class="font-medium text-xl">{memo.title}</p>
                    <p class="line-clamp-15 break-words text-gray-600">
                      {memo.description}
                    </p>
                  </div>
                  <p class="text-gray-400 text-sm">
                    วันที่ : {new Date(memo.date).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>ยังไม่มีรายการ</p>
        )}
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
