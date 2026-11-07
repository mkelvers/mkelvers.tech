import { between } from "./motion.ts";
import { Slime } from "./slime.ts";

const maxSlimes = 8;
const maxActing = 2;
const spawnEveryMs = 600;
const fadeStaggerMs = 500;

type Spot = {
  x: number;
  y: number;
};

/**
 * The slimes scattered over the page. Owns spawning, spacing, and how many may move at once.
 *
 * Slimes keep a minimum distance from each other and stay off the element marked
 * `data-mascot-avoid`, so the text stays readable.
 */
export class Swarm {
  readonly reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  private slimes: Slime[] = [];
  private acting = 0;
  private spawner: ReturnType<typeof setInterval> | undefined;

  start(): void {
    this.spawn();
    this.spawner = setInterval(() => this.spawn(), spawnEveryMs);
  }

  /** Fades every slime out over about a second. With `instant`, removes them on the spot (used on unmount). */
  stop({ instant = false } = {}): void {
    clearInterval(this.spawner);

    for (const slime of this.slimes) {
      slime.dispose({
        instant,
        delayMs: Math.random() * fadeStaggerMs,
      });
    }

    this.slimes = [];
  }

  /** Runs `action` only while fewer than `maxActing` slimes are moving; otherwise skips this turn. */
  async whenTurnFree(action: () => Promise<void>): Promise<void> {
    if (this.acting >= maxActing) return;

    this.acting++;
    try {
      await action();
    } finally {
      this.acting--;
    }
  }

  /** A free spot within a short hop of `slime`, or null when it is boxed in. */
  nearbySpot(slime: Slime): Spot | null {
    for (let attempt = 0; attempt < 12; attempt++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = between(60, 140);
      const spot = {
        x: slime.x + Math.cos(angle) * distance,
        y: slime.y + Math.sin(angle) * distance * 0.6,
      };

      if (this.isFree(spot, slime.size, slime)) return spot;
    }

    return null;
  }

  private spawn(): void {
    if (this.slimes.length >= maxSlimes) {
      clearInterval(this.spawner);
      return;
    }

    const size = between(36, 56);

    for (let attempt = 0; attempt < 30; attempt++) {
      const spot = {
        x: between(8, innerWidth - size - 8),
        y: between(8, innerHeight - size - 8),
      };

      if (this.isFree(spot, size)) {
        this.slimes.push(new Slime(this, spot.x, spot.y, size));
        return;
      }
    }

    // No room left on this screen; keep the slimes already out.
    clearInterval(this.spawner);
  }

  private isFree(spot: Spot, size: number, self?: Slime): boolean {
    const onScreen =
      spot.x >= 8 &&
      spot.y >= 8 &&
      spot.x <= innerWidth - size - 8 &&
      spot.y <= innerHeight - size - 8;
    if (!onScreen) return false;

    const cx = spot.x + size / 2;
    const cy = spot.y + size / 2;

    const text = document.querySelector("[data-mascot-avoid]")?.getBoundingClientRect();
    const onText =
      text !== undefined &&
      cx > text.left - 24 &&
      cx < text.right + 24 &&
      cy > text.top - 24 &&
      cy < text.bottom + 24;
    if (onText) return false;

    const minGap = Math.max(140, Math.min(innerWidth, innerHeight) / 4);

    return this.slimes.every((other) => {
      if (other === self) return true;
      return Math.hypot(other.center.x - cx, other.center.y - cy) >= minGap;
    });
  }
}
