import { readFileSync } from "fs";

export const loadText = (path: string): string => readFileSync(path, "utf8");
export const loadLines = (path: string): string[] =>
  loadText(path).split(/\r?\n/);
