
type Length<T extends string, Counter extends number[] = []> = 
  T extends `${string}${infer Tail}`
    ? Length<Tail, [...Counter, 0]>
    : Counter['length'];

// Compare<1,2>
type Compare<First extends number, Second extends number, Counter extends number[] = []> = 
  First extends Second 
  ? 'equal'
  : Counter['length'] extends First
    ? 'less'
    : Counter['length'] extends Second
      ? 'greater'
      : Compare<First, Second, [...Counter, 0]>;

type MaxLength<T extends string, Max extends number> =
  Compare<Length<T>, Max> extends 'less' | 'equal' ? T : never;

type MinLength<T extends string, Min extends number> =
  Compare<Min, Length<T>> extends 'less' | 'equal' ? T : never;

type InRange<T extends string, Min extends number, Max extends number> = 
  MinLength<T, Min> & MaxLength<T, Max>;

function maxOrThrow<T extends string, Max extends number>(
  str: MaxLength<T, Max>, max: Max
): string {
  if(str.length > max) {
    throw new Error(`${str} is longer than ${max}`);
  }

  return str;
}

function minOrThrow<T extends string, Min extends number>(
  str: MinLength<T, Min>, min: Min
): string {
  if(str.length > min) {
    throw new Error(`${str} is shorter than ${min}`);
  }

  return str;
}


function exactOrThrow<T extends string, Exact extends number>(
  str: MinLength<T, Exact>, exact: Exact
): string {
  if(str.length !== exact) {
    throw new Error(`${str} is not exact ${exact}`);
  }

  return str;
}

function inRangeOrThrow<T extends string, Min extends number, Max extends number>(
  str: InRange<T, Min, Max>, min: Min, max: Max
): string {
  if(str.length > max) {
    throw new Error(`${str} is longer than ${max}`);
  } else if(str.length < min) {
    throw new Error(`${str} is shorter than ${min}`);
  }

  return str;
}



const a = 'Test'

inRangeOrThrow(a, 1, 4);
