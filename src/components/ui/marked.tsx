import { Fragment, type ReactNode } from "react";

/**
 * Text with *starred* parts styled differently: splits "… that *feel simple.*" on the asterisks
 * and wraps every starred part with `mark`, e.g. `(part) => <em className="text-primary">{part}</em>`.
 */
export function Marked({ text, mark }: { text: string; mark: (part: string) => ReactNode }) {
  return text.split("*").map((part, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: the parts of one fixed string never reorder.
    <Fragment key={index}>{index % 2 === 1 ? mark(part) : part}</Fragment>
  ));
}
