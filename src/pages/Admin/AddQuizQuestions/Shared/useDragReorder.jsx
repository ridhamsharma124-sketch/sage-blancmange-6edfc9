import { useState } from "react";

export default function useDragReorder(items, onReorder) {
  const [from, setFrom] = useState(null);
  const props = (i) => ({
    draggable: true,
    onDragStart: () => setFrom(i),
    onDragOver: (e) => e.preventDefault(),
    onDrop: () => {
      if (from === null || from === i) return;
      const next = [...items];
      const [m] = next.splice(from, 1);
      next.splice(i, 0, m);
      onReorder(next);
      setFrom(null);
    },
    onDragEnd: () => setFrom(null),
  });
  return { props, dragging: from };
}