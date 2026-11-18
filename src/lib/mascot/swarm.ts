import { Slime } from "./slime.ts";

type Spot = {
  x: number;
  y: number;
};

export type Cell = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export class Swarm {
  readonly reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  private slimes: Slime[] = [];
  private acting = 0;
  private spawner: ReturnType<typeof setInterval> | undefined;

  start(): void {
    this.spawn();
    this.spawner = setInterval(() => this.spawn(), 600);
  }

  stop({ instant = false } = {}): void {
    clearInterval(this.spawner);

    for (const slime of this.slimes) {
      slime.dispose({
        instant,
        delayMs: Math.random() * 500,
      });
    }

    this.slimes = [];
  }

  async whenTurnFree(action: () => Promise<void>): Promise<void> {
    if (this.acting >= 3) {
      return;
    }

    this.acting++;
    try {
      await action();
    } finally {
      this.acting--;
    }
  }

  nearbySpot(slime: Slime): Spot | null {
    for (let attempt = 0; attempt < 16; attempt++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 160;
      const spot = {
        x: slime.x + Math.cos(angle) * distance,
        y: slime.y + Math.sin(angle) * distance * 0.6,
      };

      const cell = slime.cell;
      const insideCell =
        spot.x >= cell.left &&
        spot.y >= cell.top &&
        spot.x + slime.size <= cell.right &&
        spot.y + slime.size <= cell.bottom;

      if (insideCell && this.isFree(spot, slime.size, slime)) {
        return spot;
      }
    }

    return null;
  }

  private spawn(): void {
    const empty = grid().filter((cell) =>
      this.slimes.every((slime) => slime.cell.left !== cell.left || slime.cell.top !== cell.top),
    );
    const size = 36 + Math.random() * 20;

    for (const cell of shuffle(empty)) {
      for (let attempt = 0; attempt < 20; attempt++) {
        const spot = {
          x: cell.left + Math.random() * (cell.right - size - cell.left),
          y: cell.top + Math.random() * (cell.bottom - size - cell.top),
        };

        if (this.isFree(spot, size)) {
          this.slimes.push(new Slime(this, cell, spot.x, spot.y, size));
          return;
        }
      }
    }

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
    if (onText) {
      return false;
    }

    const minGap = Math.max(120, Math.min(innerWidth, innerHeight) / 5);

    return this.slimes.every((other) => {
      if (other === self) {
        return true;
      }
      return Math.hypot(other.center.x - cx, other.center.y - cy) >= minGap;
    });
  }
}

function grid(): Cell[] {
  const width = (innerWidth - 16) / 3;
  const height = (innerHeight - 16) / 3;
  const cells: Cell[] = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
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

function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
