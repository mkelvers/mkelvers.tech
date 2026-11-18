export const profile = {
  name: "Mikkel Elvers",
  firstName: "Mikkel",
  username: "mkelvers",
  fullName: "Mikkel Nothlev Elvers",
  email: "mikkelelvers@outlook.com",
  phone: "+45 42 73 63 93",
  github: "https://github.com/mkelvers",
  linkedin: "https://www.linkedin.com/in/mikkelnothlev/",
} as const;

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
  "talk",
  "talk-blink",
] as const;

export type Frame = (typeof frames)[number];
