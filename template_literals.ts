type ChessLetters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type ChessNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type BoardPositions = `${ChessLetters}${ChessNumbers}`[];

const b: BoardPositions = ['A1'];


type RgbCss = `rgb(${number},${number},${number})`;
type RgbaCss = `rgb(${number},${number},${number}${`,${number}` | ''})`;

const rgbCss: RgbCss = 'rgb(1,2,3)';
const rgbaCss: RgbaCss = 'rgb(1,2,3,2)';


type GapType = 'margin' | 'padding';
type GapPosition = 'left' | 'right' | 'top' | 'bottom';
type GapCss = GapType | `${GapType}-${GapPosition}`;
//   ^?

type SizeType = 'rem' | 'px';
type SizeCss = `${number}${SizeType}`;

type MarginPadding = {
  [Key in GapCss]?: SizeCss
}

const margin: MarginPadding = {
  "margin-left": '1rem'
}

type FirstChar<T extends string> =  T extends `${infer head}${infer tail}` ? head : '';
type StartsWithNumber<T extends string> = T extends `${infer head extends number}${infer tail}` ? head : '';

type First = FirstChar<'hello youtube'>;
//   ^?

type Starts = StartsWithNumber<'1asdf'>;
//   ^?
