import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Rootlayout from "~/core/layout/rootlayout";
import Hero from "~/core/components/shared/hero";
import type { Memo } from "~/core/types/memoTypes";
import Item from "~/core/components/Item";
export default component$(() => {
  const memoList = useSignal<Memo[]>([]);
  const isMouseOver = useSignal<boolean>(false);
  const addMode = useSignal(false);
  const title = useSignal("");
  const description = useSignal("");
  const date = useSignal(new Date());
  const trashMemo = useSignal<Memo[]>([]);

  const randomMemo = [
    {
      title: "หิวข้าว",
      description: "พาหมาไปเดินเล่น",
    },
    {
      title: "ไปใช้ โค้ด 9arm",
      description: "ที่Advice",
    },
    {
      title: "กินข้าว",
      description: "กับหมา",
    },
  ];

  const addMemo = $(() => {
    memoList.value = [
      {
        id: new Date().getTime(),
        title: title.value,
        description: description.value,
        date: date.value || new Date(),
      },
      ...memoList.value,
    ];

    localStorage.setItem("sht-memo", JSON.stringify(memoList.value));
    addMode.value = false;
  });

  const random = $(async (chance: number) => {
    return Math.random() * 100 < chance;
  });

  const randomDeleteMemo = $(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [index, memo] of memoList.value.entries()) {
      if (await random(35)) {
        trashMemo.value = [...trashMemo.value, memo];
      }
    }
    memoList.value = memoList.value.filter((memo) => {
      return !trashMemo.value.some((trashMemo) => trashMemo.id === memo.id);
    });
  });

  const randomAddMemoFromTrash = $(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [index, memo] of trashMemo.value.entries()) {
      if (await random(65)) {
        console.log("add memo from trash");
        setTimeout(() => {
          memoList.value = [...memoList.value, memo];
        }, 1000 * (Math.random() * 5));
      }
    }
    trashMemo.value = [];
  });

  const deleteMemo = $((memo: Memo) => {
    memoList.value = memoList.value.filter((checkingMemo) => {
      return checkingMemo.id !== memo.id;
    });

    localStorage.setItem("sht-memo", JSON.stringify(memoList.value));
  });

  const randomDateMemo = $(async () => {
    memoList.value = memoList.value.map((v) => ({
      ...v,
      date: new Date(Date.now() - Math.floor(Math.random() * 1e12)),
    }));
  });

  const missingWordsMemo = $(async () => {
    function randomSlice(sentence: string) {
      const length = sentence.length;
      const startRand = Math.floor(Math.random() * length);
      const endRand = startRand + Math.min(length - startRand, 10);

      const sliced = sentence.slice(startRand, endRand);
      return sliced;
    }

    memoList.value = memoList.value.map((v) => ({
      ...v,
      title: randomSlice(v.title),
      description: randomSlice(v.description),
    }));
  });

  // useTask$(({ track }) => {
  //   track(memoList);
  //   track(trashMemo);
  // });

  const replaceMemo = $(async () => {
    for (const [index, memo] of memoList.value.entries()) {
      if (await random(10)) {
        const randomMemoItem =
          randomMemo[Math.floor(Math.random() * randomMemo.length)];
        memoList.value[index] = {
          ...memo,
          title: randomMemoItem.title,
          description: randomMemoItem.description,
        };
      }
    }
  });

  useVisibleTask$(async () => {
    memoList.value = JSON.parse(localStorage.getItem("sht-memo") || "[]");
    await replaceMemo();
    await randomDeleteMemo();
    await randomDateMemo();
    await missingWordsMemo();
    await randomAddMemoFromTrash();
  });

  return (
    <Rootlayout>
      <Hero isMouseOver={isMouseOver.value} />
      <div>
        {!addMode.value ? (
          <div class="relative group">
            <button
              onMouseOver$={() => (isMouseOver.value = true)}
              onMouseLeave$={() => (isMouseOver.value = false)}
              class="relative bg-white  z-10 w-full rounded border px-3 py-2 transition group-hover:shadow-realistic-1 "
              onClick$={() => (addMode.value = true)}
            >
              จดสิ่งที่ต้องทำ 🫵
            </button>
            <div class="absolute inset-0  group-hover:translate-y-2 bg-primary z-[1] rounded transition-transform" />
            <div class="absolute inset-0  group-hover:translate-y-3 bg-primary/50 z-[2] rounded transition-transform" />
            <div class="absolute inset-0  group-hover:translate-y-4 bg-primary/20 z-[3] rounded transition-transform" />
          </div>
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
                  onClick$={() => {
                    isMouseOver.value = false;
                    addMode.value = false;
                  }}
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
            {memoList.value.map((memo) => {
              return <Item key={memo.id} memo={memo} deleteMemo={deleteMemo} />;
            })}
          </div>
        ) : (
          <p class="text-center py-12 bg-primary/5 rounded-md text-primary">
            ยังไม่มีรายการ
          </p>
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
