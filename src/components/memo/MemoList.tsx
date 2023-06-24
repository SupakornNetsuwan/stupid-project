import { component$ } from "@builder.io/qwik";
import MemoItem from "./MemoItem";

export default component$(() => {
  return (
  <div class="w-full grid grid-cols-2 md:grid-cols-5 px-11 gap-4">
    <MemoItem title="test" desc="dsad"/>
    <MemoItem title="test" desc="xdcfvgbhnjnhbvgycftxdrdctfvygbuhnijmkojnibhuvygctctfvygbuhnijmokjinhbugvyfct"/>
    <MemoItem title="test" desc="dsadksdjaldas"/>
    <MemoItem title="test" desc="dsadksdjaldas"/>
    <MemoItem title="test" desc="dsadksdjaldas"/>
    <MemoItem title="test" desc="dsadksdjaldas"/>
  </div>
  );
});
