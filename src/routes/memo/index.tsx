import { component$ } from "@builder.io/qwik";
import Toolbar from "~/components/memo/Toolbar";
import MemoList from "~/components/memo/MemoList";

export default component$(() => {
  return (
    <div class="w-full">
      <Toolbar/>
      <MemoList/>
    </div>
  );
});
