import type { Attachment } from "svelte/attachments";

export class Disclosure {
  open = $state(false);
  #pinned = false;
  #hovering = false;
  #timer = 0;

  enter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") {
      return;
    }
    this.#hovering = true;
    clearTimeout(this.#timer);
    this.open = true;
  };

  leave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") {
      return;
    }
    this.#hovering = false;
    if (this.#pinned) {
      return;
    }
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

  blur = () => {
    if (!this.#hovering) {
      this.close();
    }
  };

  dismissible: Attachment<HTMLElement> = (root) => {
    if (!this.open) {
      return;
    }

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      this.close();
      root.querySelector("button")?.focus();
    };
    const onPointerdown = (event: PointerEvent) => {
      if (!root.contains(event.target as Node)) {
        this.close();
      }
    };

    window.addEventListener("keydown", onKeydown);
    document.addEventListener("pointerdown", onPointerdown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
      document.removeEventListener("pointerdown", onPointerdown);
    };
  };
}
