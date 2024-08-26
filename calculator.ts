type Numbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Parentheses = '(' | ')';
type Signs = '+' | '-' | '*' | '/';

type AfterNumbers = { [key in Numbers]: Signs | ')' | Numbers | '' };
type AfterSigns = { [key in Signs]: '(' | Numbers };
type AfterBrackets = { '(': '(' | Numbers; ')': Signs | ')' | '' };
type NextAllowed = AfterNumbers & AfterSigns & AfterBrackets;

type AllAllowed = Numbers | Parentheses | Signs;

type AllowedStarts =
  { [key in Numbers]: Signs | Numbers | '' } &
  { '(': '(' | Numbers };

type IsEmpty<T extends string | any[]> = T extends '' ? true
  : T['length'] extends 0 ? true : false;

type Remove<T, ToRemove extends string, Collect extends string = ''> =
  T extends `${infer Head}${infer Remaining}`
    ? Remove<Remaining, ToRemove, `${Collect}${Head extends ToRemove ? '' : Head}`>
    : Collect;

type First<T extends string> =
  IsEmpty<T> extends true
    ? '' :
    T extends `${infer Head extends AllAllowed}${string}` ? Head : false;

type CorrectStart<T extends string> =
  T extends `${infer Head extends keyof AllowedStarts}${infer Remaining}`
    ? First<Remaining> extends AllowedStarts[Head]
      ? true : false
    : false;

type IsNextAllowed<T extends string> =
  T extends `${infer Head extends AllAllowed}${infer Remaining}`
    ? First<Remaining> extends NextAllowed[Head]
      ? IsNextAllowed<Remaining>
      : false
    : IsEmpty<T>;

type OnlyBrackets<T> = Remove<T, Exclude<AllAllowed | ' ', Parentheses>>;

type EmptyStringAndEmptyArray<S extends string, A extends any[]> =
  [IsEmpty<S>, IsEmpty<A>] extends true[] ? true : false;

type ParenthesesCheck<T extends string, Stack extends Parentheses[] = []> =
  T extends `(${infer Remaining}`
    ? ParenthesesCheck<Remaining, ['(', ...Stack]>
    : T extends `)${infer Remaining}`
      ? Stack extends ['(', ...infer RemainingStack extends Parentheses[]]
        ? ParenthesesCheck<Remaining, RemainingStack>
        : false
      : EmptyStringAndEmptyArray<T, Stack>;

type Calculator<T extends string, NoSpace extends string = Remove<T, ' '>> =
  [
    ParenthesesCheck<OnlyBrackets<T>>,
    CorrectStart<NoSpace>,
    IsNextAllowed<NoSpace>] extends true[]
    ? T : never;

function validate<T extends string>(input: Calculator<T>): T {
  return input;
}

const v1 = validate("(1 * (2 + 3))");
const v2 = validate("3 * (5 + 2) / (4 - 1)");
const v3 = validate("((7 - 2) * 4) / (3 + 1)");
const v4 = validate("10 - ((2 + 3) * 4)");
const v5 = validate("((2 * 3) + 5) / (6 - 1)");
const v6 = validate("(1 + 2) * 3 - 4 / (5 + 6)");
const v7 = validate("2 * ((3 + 4) * (5 - 1)) / 6");
const v8 = validate("((8 / 2) + (7 * 2)) * (9 - 1)");
const v9 = validate("(2 * (3 + 4) / (5 - 1))");
const v10 = validate("(10 - 2) / (3 + (5 - 4))");


const e2 = validate("(4 * 6 + 3) / )2 - 1(");//(mismatched brackets)
const e3 = validate("3 * / 2");//(missing operand)
const e4 = validate("(2+3)*(4-)"); //(missing operand)
const e5 = validate("5 + * 3"); // (misplaced operator)
const e6 = validate("((7 - 2) * 4 / (3 + 1)"); // (missing closing bracket)
const e7 = validate("2 * (3 + 4)) * (5 - 1)) / 6"); // (mismatched brackets)
const e8 = validate("((8 / 2) + (7 * 2)) * (9 - 1"); // (missing closing bracket)
const e9 = validate("2 * (3 + 4) / (5 - 1))"); // (mismatched brackets)
const e10 = validate("(10 - 2) / (3 + (5 - 4)) + "); // (missing operand)
