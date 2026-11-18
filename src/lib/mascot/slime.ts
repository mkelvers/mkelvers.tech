import type { Frame } from "#lib/utils.ts";
import type { Cell, Swarm } from "./swarm.ts";

type Step = [frame: Frame, holdMs: number];

export class Slime {
  private readonly img: HTMLImageElement;
  private disposed = false;

  constructor(
    private readonly swarm: Swarm,
    readonly cell: Cell,
    public x: number,
    public y: number,
    public readonly size: number,
  ) {
    this.img = document.createElement("img");
    this.img.src = "/mascot/idle.webp";
    this.img.alt = "";
    this.img.setAttribute("aria-hidden", "true");
    Object.assign(this.img.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      pointerEvents: "none",
      zIndex: "40",
    });
    document.body.append(this.img);

    this.img.animate(
      this.swarm.reducedMotion
        ? [
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
          ]
        : [
            {
              opacity: 0,
              scale: "0.9",
            },
            {
              opacity: 1,
              scale: "1",
            },
          ],
      {
        duration: 300,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        fill: "both",
      },
    );

    void this.live();
  }

  get center() {
    return {
      x: this.x + this.size / 2,
      y: this.y + this.size / 2,
    };
  }

  dispose({ instant = false, delayMs = 0 } = {}): void {
    this.disposed = true;

    if (instant) {
      this.img.remove();
      return;
    }

    this.img
      .animate(
        [
          {
            opacity: 1,
          },
          {
            opacity: 0,
          },
        ],
        {
          duration: 450,
          delay: delayMs,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
          fill: "both",
        },
      )
      .finished.finally(() => this.img.remove());
  }

  private async live(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1700));

    while (!this.disposed) {
      await this.swarm.whenTurnFree(() => this.act());
      await new Promise((resolve) => setTimeout(resolve, 2500 + Math.random() * 3500));
    }
  }

  private act(): Promise<void> {
    const roll = Math.random();

    if (roll < 0.2) {
      return this.hop();
    }
    if (roll < 0.55) {
      return this.travel();
    }
    if (roll < 0.75) {
      return this.lookAround();
    }
    if (roll < 0.9) {
      return this.happy();
    }
    return this.doze();
  }

  private async play(steps: Step[]): Promise<void> {
    for (const [frame, holdMs] of steps) {
      if (this.disposed) {
        return;
      }
      this.img.src = `/mascot/${frame}.webp`;
      await new Promise((resolve) => setTimeout(resolve, holdMs));
    }
  }

  private async move(keyframes: Keyframe[], duration: number): Promise<void> {
    if (this.swarm.reducedMotion) {
      await new Promise((resolve) => setTimeout(resolve, duration));
      return;
    }

    await this.img.animate(keyframes, {
      duration,
      easing: "ease-in-out",
    }).finished;
  }

  private async hop(): Promise<void> {
    await this.play([["squash", 100]]);
    this.img.src = "/mascot/jump.webp";
    await this.move(
      [
        {
          translate: "0 0",
        },
        {
          translate: `0 -${this.size * 0.2}px`,
          offset: 0.45,
        },
        {
          translate: "0 0",
        },
      ],
      340,
    );
    await this.play([
      ["land", 120],
      ["idle", 0],
    ]);
  }

  private async hopAway(): Promise<void> {
    const target = this.swarm.reducedMotion ? null : this.swarm.nearbySpot(this);
    if (!target) {
      return this.hop();
    }

    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const distance = Math.hypot(dx, dy);

    await this.play([
      [dx < 0 ? "lean-left" : "lean-right", 140],
      ["squash", 80],
    ]);
    if (this.disposed) {
      return;
    }

    this.x = target.x;
    this.y = target.y;
    this.img.src = "/mascot/jump.webp";
    await this.move(
      [
        {
          translate: "0 0",
        },
        {
          translate: `${dx / 2}px ${dy / 2 - Math.min(70, 20 + distance * 0.2)}px`,
        },
        {
          translate: `${dx}px ${dy}px`,
        },
      ],
      280 + distance * 0.8,
    );

    this.img.style.left = `${this.x}px`;
    this.img.style.top = `${this.y}px`;
    await this.play([
      ["land", 130],
      ["idle", 0],
    ]);
  }

  private async travel(): Promise<void> {
    const hops = Math.floor(1 + Math.random() * 3);

    for (let i = 0; i < hops && !this.disposed; i++) {
      await this.hopAway();
      await new Promise((resolve) => setTimeout(resolve, 60 + Math.random() * 100));
    }
  }

  private async lookAround(): Promise<void> {
    const [first, second]: Frame[] =
      Math.random() < 0.5 ? ["look-left", "look-right"] : ["look-right", "look-left"];

    await this.play([
      [first, 700 + Math.random() * 400],
      ["look-up-open", 400],
      [second, 700 + Math.random() * 400],
      ["idle", 0],
    ]);
  }

  private async happy(): Promise<void> {
    this.img.src = "/mascot/happy.webp";
    await this.move(
      [
        {
          rotate: "0deg",
        },
        {
          rotate: "-8deg",
        },
        {
          rotate: "7deg",
        },
        {
          rotate: "-4deg",
        },
        {
          rotate: "0deg",
        },
      ],
      700,
    );
    await this.play([
      ["happy", 600],
      ["idle", 0],
    ]);
  }

  private async doze(): Promise<void> {
    await this.play([
      ["sleep", 3000 + Math.random() * 3000],
      ["look-up-open", 500],
      ["idle", 0],
    ]);
  }
}
