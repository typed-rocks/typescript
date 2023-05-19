type ChessLetters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type ChessNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type BoardPositions = `${ChessLetters}${ChessNumbers}`[];

const b: BoardPositions = ['A1'];

type RgbCssType = `rgb(${number},${number},${number})`;

const rgbWrong: RgbCssType = 'asdf';
const rgbCorrect: RgbCssType = 'rgb(1,1,1)';

