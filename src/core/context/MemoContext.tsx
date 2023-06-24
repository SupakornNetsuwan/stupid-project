import { createContextId } from "@builder.io/qwik";

export type Memo = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

const MemoContext = createContextId<Memo[]>("memo-context");

export default MemoContext;
