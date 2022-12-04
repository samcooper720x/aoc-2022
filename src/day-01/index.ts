import { loadLines } from "../utils";

const input = loadLines("src/day-01/input.txt");

let elfLoad: string[] = [];
const elfLoads: string[][] = [];

for (const line of input) {
  if (line === "") {
    elfLoads.push(elfLoad);
    elfLoad = [];
    continue;
  }

  elfLoad.push(line);
}

const sums = elfLoads.map((load) =>
  load.reduce((acc, val) => acc + Number(val), 0)
);

const max = sums.reduce((max, val) => (val > max ? val : max));

console.log("Solution one:", max);

const sorted = sums.sort((a, b) => b - a);

const [a, b, c] = sorted;

console.log("Solution two:", a + b + c);
