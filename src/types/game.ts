export type GuessResult = 'too_low' | 'too_high' | 'correct';

export interface GuessRecord {
  id: string;
  value: number;
  result: GuessResult;
  timestamp: number;
  rangeBefore: [number, number];
  rangeAfter: [number, number];
}

export interface GameState {
  upperBound: number;
  target: number | null;
  isGameActive: boolean;
  isWon: boolean;
  tries: number;
  guesses: GuessRecord[];
  currentPossibleMin: number;
  currentPossibleMax: number;
  lastGuess: GuessRecord | null;
}
