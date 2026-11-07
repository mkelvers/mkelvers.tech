/** Shared timing helpers for the mascot. */
export const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";

export const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const between = (min: number, max: number) =>
  min + Math.random() * (max - min);
