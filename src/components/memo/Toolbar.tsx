import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  let addMode = useSignal(false);
  let title = useSignal("");
  let desc = useSignal("");
  return (
    <div class="w-full flex justify-center p-2">
        {!addMode.value ? (
          <button class="w-96 rounded border shadow px-3 py-2 flex justify-between transition" onClick$={() => (addMode.value = true)}>
            <div class="self-center select-none">Take Note</div>
          </button>
        ) : (
          <div class="w-96 rounded border shadow px-3 py-2 flex justify-between transition">
            <div class="flex flex-col w-full gap-2">
              <input
                class="w-full p-2 border-b"
                onInput$={(e) =>
                  (title.value = (e.target as HTMLInputElement).value)
                }
                placeholder="Title"
                value={title.value}
                type="text"
              />
              <textarea
                placeholder="Description"
                class="w-full p-2 border-b"
                onInput$={(e) =>
                  (desc.value = (e.target as HTMLInputElement).value)
                }
                value={desc.value}
              ></textarea>
              <div class="flex justify-end">
                <button class="p-2" onClick$={() => addMode.value = false}>ปิด</button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
});
