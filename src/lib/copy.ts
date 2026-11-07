import copy from "./copy.json";

/** All site text, in English. Components read it directly, e.g. `copy.cv.labels.save`. */
export { copy };

/**
 * Fills `{{key}}` placeholders in a copy string.
 * Throws on a placeholder without a value, so a typo can't ship as raw braces.
 */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = values[key];
    if (value === undefined) throw new Error(`Missing value for {{${key}}} in "${template}"`);
    return value;
  });
}
