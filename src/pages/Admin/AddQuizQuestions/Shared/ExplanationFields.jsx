import React from "react";
import { Card, Label, Counter, inputCls } from "./ui";

/** layout: "split" (Multiple Choice) | "stacked" (True/False) | "joined" (Fill in Blanks) */
export default function ExplanationFields({
  data, onChange, layout = "split", subtitle,
  explanationSubtitle = "Explain why the correct answer is right.",
  hintPlaceholder = "e.g., This was the very first thing God made visible.",
}) {
  const f = (k) => (e) => onChange({ [k]: e.target.value });

  if (layout === "split") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5">
          <Card title="Answer Explanation" subtitle={explanationSubtitle}>
            <textarea rows={3} maxLength={500} value={data.explanation} onChange={f("explanation")}
              className={`${inputCls} resize-none`} />
            <Counter value={data.explanation} max={500} />
          </Card>
          <Card title="Scripture Reference" subtitle="Enter the relevant verse/reference.">
            <input value={data.scripture} onChange={f("scripture")} className={inputCls} />
          </Card>
        </div>
        <Card title="Hint" optional subtitle="Provide a hint to help users (shown only if enabled).">
          <input maxLength={200} value={data.hint} onChange={f("hint")}
  placeholder={hintPlaceholder} className={inputCls} />
          <Counter value={data.hint} max={200} />
        </Card>
      </>
    );
  }

  const cols = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <Label>Scripture Reference</Label>
        <input value={data.scripture} onChange={f("scripture")} className={inputCls} />
      </div>
      <div>
        <Label optional>Hint</Label>
        <input value={data.hint} onChange={f("hint")} className={inputCls} />
      </div>
    </div>
  );

  if (layout === "stacked") {
    return (
      <>
        <Card title="Answer Explanation" optional>
          <input value={data.explanation} onChange={f("explanation")} className={inputCls} />
        </Card>
        <Card>{cols}</Card>
      </>
    );
  }

  return (
    <Card title="Answer Explanation" optional subtitle={subtitle}>
      <input value={data.explanation} onChange={f("explanation")} className={inputCls} />
      <div className="mt-5">{cols}</div>
    </Card>
  );
}