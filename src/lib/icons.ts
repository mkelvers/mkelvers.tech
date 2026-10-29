export const icons = {
  sun: {
    svg: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
    },
    paths: [
      "M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",
      "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41",
    ],
  },
  moon: {
    svg: {
      viewBox: "-0.85 0.85 24 24",
      fill: "none",
      stroke: "currentColor",
    },
    paths: ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"],
  },
  back: {
    svg: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
    },
    paths: ["M5 12l14 0", "M5 12l6 6", "M5 12l6 -6"],
  },
  email: {
    svg: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
    },
    paths: [
      "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z",
      "M3 7l9 6l9 -6",
    ],
  },
  phone: {
    svg: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
    },
    paths: [
      "M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2",
    ],
  },
  github: {
    svg: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
    },
    paths: [
      "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
    ],
  },
  linkedin: {
    svg: {
      viewBox: "4 4 15.5 15.5",
      fill: "currentColor",
      stroke: "none",
    },
    paths: [
      "M7.50098 9C6.67255 9 6.00098 8.32843 6.00098 7.5C6.00098 6.67157 6.67255 6 7.50098 6C8.3294 6 9.00098 6.67157 9.00098 7.5C9.00098 8.32843 8.3294 9 7.50098 9ZM6.50098 10H8.50098V17.5H6.50098V10ZM12.001 10.4295C12.5854 9.86534 13.2665 9.5 14.001 9.5C16.072 9.5 17.501 11.1789 17.501 13.25V17.5H15.501V13.25C15.501 12.2835 14.7175 11.5 13.751 11.5C12.7845 11.5 12.001 12.2835 12.001 13.25V17.5H10.001V10H12.001V10.4295Z",
    ],
  },
} as const;

export type IconName = keyof typeof icons;
