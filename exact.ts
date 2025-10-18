type KeyOnlyInFirst<First, Second> = Exclude<keyof First, keyof Second>;

type ExactSimple<Actual, Wanted> = Actual extends Wanted 
  ? Wanted extends Actual
    ? Actual
    : never
  : never;

type ExactBetter<Actual extends Wanted, Wanted> = 
  {
    [Key in keyof Actual]: Key extends KeyOnlyInFirst<Actual, Wanted> ? never : Actual[Key]
  } 


  type Dev = {
    name: string
  }

function testBetter<T extends Dev>(t: ExactBetter<T, Dev>) {
  return t;
}

function testSimple<T extends Dev>(t: ExactSimple<T, Dev>) {
  return t;
}
const inputWrong = {name: 'asdf', v: true};
const resultWrongSimple = testSimple(inputWrong);
const resultWrongBetter = testBetter(inputWrong);

const inputCorrect = {name: 'asdf'};
const resultSimple = testSimple(inputCorrect);
const resultBetter = testBetter(inputCorrect);
