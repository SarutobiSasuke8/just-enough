/** Dedent a template of lesson text so source indent doesn't leak into the page. */
export function snippet(text: string): string {
  const lines = text.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const pad = lines
    .filter((line) => line.trim().length > 0)
    .reduce((min, line) => {
      const match = line.match(/^[ \t]*/);
      const width = match ? match[0].length : 0;
      return Math.min(min, width);
    }, Number.POSITIVE_INFINITY);
  const trim = Number.isFinite(pad) ? pad : 0;
  return lines.map((line) => line.slice(trim)).join("\n");
}
