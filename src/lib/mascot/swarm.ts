import { between } from "./motion.ts";
import { Slime } from "./slime.ts";

const gridSize = 3;
const maxActing = 3;
const spawnEveryMs = 600;
const fadeStaggerMs = 500;

type Spot = {
  x: number;
  y: number;
};

/** One cell of the screen grid. Each slime lives in its own cell, which keeps them spread out. */
export type Cell = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

/**
 * The slimes scattered over the page. Owns spawning, spacing, and how many may move at once.
 *
 * The screen is split into a 3×3 grid and each cell holds at most one slime, so they spread
 * in every direction instead of clumping. Slimes also keep a minimum distance from each
 * other and stay off the element marked `data-mascot-avoid`, so the text stays readable.
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

  /** A free spot within a hop of `slime` and inside its own cell, or null when it is boxed in. */
  nearbySpot(slime: Slime): Spot | null {
    for (let attempt = 0; attempt < 16; attempt++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = between(100, 260);
      const spot = {
        x: slime.x + Math.cos(angle) * distance,
        y: slime.y + Math.sin(angle) * distance * 0.6,
      };

      if (inside(slime.cell, spot, slime.size) && this.isFree(spot, slime.size, slime)) {
        return spot;
      }
    }

    return null;
  }

  // Fills an empty cell at random each tick; stops once no empty cell can take a slime.
  private spawn(): void {
    const empty = shuffle(
      grid().filter((cell) => !this.slimes.some((slime) => sameCell(slime.cell, cell))),
    );
    const size = between(36, 56);

    for (const cell of empty) {
      for (let attempt = 0; attempt < 20; attempt++) {
        const spot = {
          x: between(cell.left, cell.right - size),
          y: between(cell.top, cell.bottom - size),
        };

        if (this.isFree(spot, size)) {
          this.slimes.push(new Slime(this, cell, spot.x, spot.y, size));
          return;
        }
      }
    }

    // Every cell is filled or covered by text.
    clearInterval(this.spawner);
  }

  private isFree(spot: Spot, size: number, self?: Slime): boolean {
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

    const minGap = Math.max(120, Math.min(innerWidth, innerHeight) / 5);

    return this.slimes.every((other) => {
      if (other === self) return true;
      return Math.hypot(other.center.x - cx, other.center.y - cy) >= minGap;
    });
  }
}

// The screen split into equal cells, inset 8px from the edges.
function grid(): Cell[] {
  const width = (innerWidth - 16) / gridSize;
  const height = (innerHeight - 16) / gridSize;
  const cells: Cell[] = [];

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      cells.push({
        left: 8 + col * width,
        top: 8 + row * height,
        right: 8 + (col + 1) * width,
        bottom: 8 + (row + 1) * height,
      });
    }
  }

  return cells;
}

function inside(cell: Cell, spot: Spot, size: number): boolean {
  return (
    spot.x >= cell.left &&
    spot.y >= cell.top &&
    spot.x + size <= cell.right &&
    spot.y + size <= cell.bottom
  );
}

function sameCell(a: Cell, b: Cell): boolean {
  return a.left === b.left && a.top === b.top;
}

function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
