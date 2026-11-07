import { frameSrc, type Frame } from "./frames.ts";
import { between, easeOut, wait } from "./motion.ts";
import type { Swarm } from "./swarm.ts";

type Step = [frame: Frame, holdMs: number];

/**
 * One mascot copy on the page. Owns its `<img>`, its position and its idle loop.
 * Calling `dispose` stops the loop and fades the element out; the instance is dead after that.
 */
export class Slime {
  private readonly img: HTMLImageElement;
  private disposed = false;

  constructor(
    private readonly swarm: Swarm,
    public x: number,
    public y: number,
    public readonly size: number,
  ) {
    this.img = document.createElement("img");
    this.img.src = frameSrc("idle");
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
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [
            { opacity: 0, scale: "0.9" },
            { opacity: 1, scale: "1" },
          ],
      {
        duration: 300,
        easing: easeOut,
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

  /** Stops the idle loop. Fades out after `delayMs`, or removes the element at once when `instant`. */
  dispose({ instant = false, delayMs = 0 } = {}): void {
    this.disposed = true;

    if (instant) {
      this.img.remove();
      return;
    }

    this.img
      .animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 450,
        delay: delayMs,
        easing: easeOut,
        fill: "both",
      })
      .finished.finally(() => this.img.remove());
  }

  // Long, random pauses keep the page calm; the swarm caps how many act at once.
  private async live(): Promise<void> {
    await wait(between(1500, 4000));

    while (!this.disposed) {
      await this.swarm.whenTurnFree(() => this.act());
      await wait(between(6000, 14000));
    }
  }

  private act(): Promise<void> {
    const roll = Math.random();

    if (roll < 0.3) return this.hop();
    if (roll < 0.5) return this.hopAway();
    if (roll < 0.75) return this.lookAround();
    if (roll < 0.9) return this.happy();
    return this.doze();
  }

  private show(frame: Frame): void {
    this.img.src = frameSrc(frame);
  }

  private async play(steps: Step[]): Promise<void> {
    for (const [frame, holdMs] of steps) {
      if (this.disposed) return;
      this.show(frame);
      await wait(holdMs);
    }
  }

  private async move(keyframes: Keyframe[], duration: number): Promise<void> {
    if (this.swarm.reducedMotion) {
      await wait(duration);
      return;
    }

    await this.img.animate(keyframes, {
      duration,
      easing: "ease-in-out",
    }).finished;
  }

  private async hop(): Promise<void> {
    await this.play([["squash", 100]]);
    this.show("jump");
    await this.move(
      [
        { translate: "0 0" },
        { translate: `0 -${this.size * 0.2}px`, offset: 0.45 },
        { translate: "0 0" },
      ],
      340,
    );
    await this.play([
      ["land", 120],
      ["idle", 0],
    ]);
  }

  // A single short hop to a free spot nearby. Falls back to hopping in place.
  private async hopAway(): Promise<void> {
    const target = this.swarm.reducedMotion ? null : this.swarm.nearbySpot(this);
    if (!target) return this.hop();

    const dx = target.x - this.x;
    const dy = target.y - this.y;

    await this.play([
      [dx < 0 ? "lean-left" : "lean-right", 180],
      ["squash", 100],
    ]);
    if (this.disposed) return;

    // Claim the spot before the jump so no other slime picks it mid-air.
    this.x = target.x;
    this.y = target.y;
    this.show("jump");
    await this.move(
      [
        { translate: "0 0" },
        { translate: `${dx / 2}px ${dy / 2 - 30}px` },
        { translate: `${dx}px ${dy}px` },
      ],
      520,
    );

    this.img.style.left = `${this.x}px`;
    this.img.style.top = `${this.y}px`;
    await this.play([
      ["land", 130],
      ["idle", 0],
    ]);
  }

  private async lookAround(): Promise<void> {
    const [first, second]: Frame[] =
      Math.random() < 0.5 ? ["look-left", "look-right"] : ["look-right", "look-left"];

    await this.play([
      [first, between(700, 1100)],
      ["look-up-open", 400],
      [second, between(700, 1100)],
      ["idle", 0],
    ]);
  }

  private async happy(): Promise<void> {
    this.show("happy");
    await this.move(
      [
        { rotate: "0deg" },
        { rotate: "-8deg" },
        { rotate: "7deg" },
        { rotate: "-4deg" },
        { rotate: "0deg" },
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
      ["sleep", between(3000, 6000)],
      ["look-up-open", 500],
      ["idle", 0],
    ]);
  }
}
