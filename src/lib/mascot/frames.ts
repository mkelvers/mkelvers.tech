/** Every pose the mascot has. Each one is a 256×256 transparent PNG in `static/mascot/`. */
export const frames = [
  "idle",
  "squash",
  "jump",
  "land",
  "lean-left",
  "lean-right",
  "look-left",
  "look-right",
  "look-up-open",
  "sleep",
  "happy",
] as const;

export type Frame = (typeof frames)[number];

export function frameSrc(frame: Frame): string {
  return `/mascot/${frame}.png`;
}

/** Fetches every frame up front so the first swap to a pose never flashes empty. */
export function preloadFrames(): void {
  for (const frame of frames) {
    new Image().src = frameSrc(frame);
  }
}
