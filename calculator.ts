type Numbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Braces = '(' | ')';
type Signs = '+' | '-' | '*' | '/';
type NextAllowed = 
{ [key in Numbers]: Signs | ')' | Numbers |''} &
{ [key in Signs]: '(' | Numbers} & 
{ '(': '(' | Numbers; ')': Signs | ')' | '' }



type AllAllowed = Numbers | Braces | Signs;

type Starts = {
    [key in Numbers] : Signs | Numbers | ''
} & {
    '(': Numbers
}

type First<T extends string> = T extends `${infer Head extends AllAllowed}${infer Rest}` ? Head : '';

type EmptyStringAndEmptyArray<S, A extends any[]> = S extends '' ? A['length'] extends 0 ? true : false : S;

type BracketCheck<T, Stack extends Braces[] = []> = T extends `${infer Head}${infer Rest}`
? Head extends '(' ? BracketCheck<Rest, ['(', ...Stack]>
: Head extends ')' ? Stack extends ['(', ...infer BRest extends Braces[]] ? BracketCheck<Rest, BRest> : false
: BracketCheck<Rest, Stack>
: EmptyStringAndEmptyArray<T, Stack>;

type GetNext<T extends string> = T extends `${infer head extends AllAllowed}${infer Rest}` ? 
    First<Rest> extends NextAllowed[head] ? GetNext<Rest> : false
 : T extends '' ? true : false;

type CorrectStart<T extends string> = T extends `${infer Head extends keyof Starts}${infer Rest}`
? First<Rest> extends Starts[Head] ? T : never :never;

type Calculator<T extends string> = BracketCheck<T> extends true ? GetNext<CorrectStart<Remover<T, ' '>>> extends true ? T : never : never;
//   ^?

type Remover<T, ToRemove extends string, Collect extends string = ''> = 
T extends `${infer head}${infer rest}` 
? head extends ToRemove 
    ? Remover<rest, ToRemove, Collect> 
    : Remover<rest, ToRemove, `${Collect}${head}`>
: Collect;

function validator<T extends string>(input: Calculator<T>) {

}

const v1 =  validator("2 + 3 * (4 - 1)");
const v2 = validator("3 * (5 + 2) / (4 - 1)");
const v3 = validator("((7 - 2) * 4) / (3 + 1)");
const v4 = validator("10 - ((2 + 3) * 4)");
const v5 = validator("((2 * 3) + 5) / (6 - 1)");
const v6 = validator("(1 + 2) * 3 - 4 / (5 + 6)");
const v7 = validator("2 * ((3 + 4) * (5 - 1)) / 6");
const v8 = validator("((8 / 2) + (7 * 2)) * (9 - 1)");
const v9 = validator("(2 * (3 + 4) / (5 - 1))");
const v10 = validator("(10 - 2) / (3 + (5 - 4))");

const e1 = validator("2 + 3 * (4 - 1"); //(missing closing bracket)
const e2 = validator("(4 * 6 + 3) / )2 - 1(");//(mismatched brackets)
const e3 = validator("3 * / 2");//(missing operand)
const e4 = validator("(2+3)*(4-)"); //(missing operand)
const e5 = validator("5 + * 3"); // (misplaced operator)
const e6 = validator("((7 - 2) * 4 / (3 + 1)"); // (missing closing bracket)
const e7 = validator("2 * (3 + 4)) * (5 - 1)) / 6"); // (mismatched brackets)
const e8 = validator("((8 / 2) + (7 * 2)) * (9 - 1"); // (missing closing bracket)
const e9 = validator("2 * (3 + 4) / (5 - 1))"); // (mismatched brackets)
const e10 = validator("(10 - 2) / (3 + (5 - 4)) + "); // (missing operand)
