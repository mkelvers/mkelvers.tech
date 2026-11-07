import { copy, fill } from "#lib/copy.ts";

/**
 * Open/close state for the "now watching" bubble: hover, tap, keyboard and outside-click.
 * Mouse hover opens it and leaving closes it after a short grace period.
 * A click or tap pins it open until the next click, a click outside, or Escape.
 */
export class Disclosure {
  open = $state(false);
  #pinned = false;
  #hovering = false;
  #timer = 0;

  enter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    this.#hovering = true;
    clearTimeout(this.#timer);
    this.open = true;
  };

  leave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    this.#hovering = false;
    if (this.#pinned) return;
    this.#timer = window.setTimeout(() => (this.open = false), 150);
  };

  toggle = () => {
    this.#pinned = !this.#pinned;
    this.open = this.#pinned;
  };

  close = () => {
    clearTimeout(this.#timer);
    this.#pinned = false;
    this.open = false;
  };

  /** Tabbing away closes it; a mouse that is still over it keeps it open. */
  blur = () => {
    if (!this.#hovering) this.close();
  };

  /**
   * Wires Escape and outside clicks for as long as the component is mounted.
   * Escape hands focus back to the trigger, so keyboard users don't lose their place.
   */
  attach(root: () => HTMLElement | undefined, trigger: () => HTMLElement | undefined) {
    $effect(() => {
      if (!this.open) return;

      const onKeydown = (event: KeyboardEvent) => {
        if (event.key !== "Escape") return;
        this.close();
        trigger()?.focus();
      };
      const onPointerdown = (event: PointerEvent) => {
        if (!root()?.contains(event.target as Node)) this.close();
      };

      window.addEventListener("keydown", onKeydown);
      document.addEventListener("pointerdown", onPointerdown);
      return () => {
        window.removeEventListener("keydown", onKeydown);
        document.removeEventListener("pointerdown", onPointerdown);
      };
    });
  }
}

export type Part = { text: string; title: boolean };

/**
 * Turns a copy template such as "Right now I'm watching {{titles}}." into text parts,
 * joining the titles as an English list ("A, B and C") and flagging which parts are titles.
 */
export function watchingParts(
  template: string,
  titles: string[],
  values: Record<string, string> = {},
): Part[] {
  const [before, after, ...rest] = template.split("{{titles}}");
  if (after === undefined || rest.length > 0) {
    throw new Error(`Expected one {{titles}} in "${template}"`);
  }

  const list = new Intl.ListFormat("en-GB", { type: "conjunction" })
    .formatToParts(titles)
    .map((part) => ({ text: part.value, title: part.type === "element" }));

  return [
    { text: fill(before, values), title: false },
    ...list,
    { text: fill(after, values), title: false },
  ].filter((part) => part.text !== "");
}

export const watchingId = "now-watching";
export const toggleLabel = copy.home.watchingToggle;
