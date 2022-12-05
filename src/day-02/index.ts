import { loadLines } from "../utils";

const input = loadLines("src/day-02/input.txt");

enum Play {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors",
}

enum Outcome {
  Win = "Win",
  Draw = "Draw",
  Lose = "Lose",
}

interface Round {
  opponentPlay: Play;
  selfPlay: Play;
}

const key = new Map();
key.set("A", Play.Rock);
key.set("X", Play.Rock);
key.set("B", Play.Paper);
key.set("Y", Play.Paper);
key.set("C", Play.Scissors);
key.set("Z", Play.Scissors);

function outcome(round: Round): Outcome {
  if (round.opponentPlay === round.selfPlay) {
    return Outcome.Draw;
  }

  const winPaths = [
    // Paper beats Rock
    { opponentPlay: Play.Rock, selfPlay: Play.Paper },
    // Scissors beats Paper
    { opponentPlay: Play.Paper, selfPlay: Play.Scissors },
    // Rock beats Scissors
    { opponentPlay: Play.Scissors, selfPlay: Play.Rock },
  ];

  if (
    winPaths.find(
      (path) =>
        path.opponentPlay === round.opponentPlay &&
        path.selfPlay === round.selfPlay
    )
  ) {
    return Outcome.Win;
  }

  return Outcome.Lose;
}

function scoreForMove(choice: Play) {
  switch (choice) {
    case Play.Rock:
      return 1;
    case Play.Paper:
      return 2;
    case Play.Scissors:
      return 3;
  }
}

function scoreForOutcome(outcome: Outcome) {
  switch (outcome) {
    case Outcome.Win:
      return 6;
    case Outcome.Draw:
      return 3;
    case Outcome.Lose:
      return 0;
  }
}

function solutionOne(input: string[]) {
  const rounds = input.map((line) => {
    if (line.length !== 3) {
      return;
    }

    const opponentPlay = key.get(line.slice(0, 1));
    const selfPlay = key.get(line.slice(-1));

    return { opponentPlay, selfPlay };
  });

  return rounds.reduce((total, round) => {
    if (round === undefined) {
      return total;
    }

    return (
      total + scoreForOutcome(outcome(round)) + scoreForMove(round.selfPlay)
    );
  }, 0);
}

function reverseEngineerSelfPlay(opponentPlay: Play, desiredOutcome: Outcome) {
  if (desiredOutcome === Outcome.Win) {
    switch (opponentPlay) {
      case Play.Rock:
        return Play.Paper;
      case Play.Paper:
        return Play.Scissors;
      case Play.Scissors:
        return Play.Rock;
    }
  }

  if (desiredOutcome === Outcome.Lose) {
    switch (opponentPlay) {
      case Play.Rock:
        return Play.Scissors;
      case Play.Paper:
        return Play.Rock;
      case Play.Scissors:
        return Play.Paper;
    }
  }

  return opponentPlay;
}

const correctedKey = new Map();
correctedKey.set("X", Outcome.Lose);
correctedKey.set("Y", Outcome.Draw);
correctedKey.set("Z", Outcome.Win);

function solutionTwo(input: string[]) {
  const rounds = input.map((line) => {
    if (line.length !== 3) {
      return;
    }

    const opponentPlay = key.get(line.slice(0, 1));
    const desiredOutcome = correctedKey.get(line.slice(-1));
    const selfPlay = reverseEngineerSelfPlay(opponentPlay, desiredOutcome);

    return { opponentPlay, selfPlay };
  });

  return rounds.reduce((total, round) => {
    if (round === undefined) {
      return total;
    }

    return (
      total + scoreForOutcome(outcome(round)) + scoreForMove(round.selfPlay)
    );
  }, 0);
}

console.log("Solution one:", solutionOne(input));
console.log("Solution two:", solutionTwo(input));
