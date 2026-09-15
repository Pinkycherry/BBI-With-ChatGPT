/** Run an effect only while its motion preferences allow it, including live changes. */
export function observeMotionPreference(
  start: () => void | (() => void),
  { pointer = false, watchPointer = false, settle }: {
    pointer?: boolean; watchPointer?: boolean; settle?: () => void;
  } = {},
): () => void {
  if (typeof window === "undefined") return () => {};
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  let stop: (() => void) | void;
  let enabled: boolean | undefined;
  let wasFine: boolean | undefined;

  const sync = () => {
    const next = !reduced.matches && (!pointer || fine.matches);
    if (next === enabled && (!watchPointer || wasFine === fine.matches)) return;
    stop?.();
    stop = undefined;
    enabled = next;
    wasFine = fine.matches;
    if (next) stop = start();
    else settle?.();
  };

  sync();
  reduced.addEventListener("change", sync);
  if (pointer || watchPointer) fine.addEventListener("change", sync);
  return () => {
    reduced.removeEventListener("change", sync);
    if (pointer || watchPointer) fine.removeEventListener("change", sync);
    stop?.();
  };
}

/** Restore only the inline properties owned by a motion primitive. */
export function preserveStyles(elements: HTMLElement[], properties: string[]): () => void {
  const snapshots = elements.map((element) =>
    properties.map((property) => ({
      property,
      value: element.style.getPropertyValue(property),
      priority: element.style.getPropertyPriority(property),
    })),
  );
  return () => {
    elements.forEach((element, index) => {
      snapshots[index]?.forEach(({ property, value, priority }) => {
        if (value) element.style.setProperty(property, value, priority);
        else element.style.removeProperty(property);
      });
    });
  };
}
