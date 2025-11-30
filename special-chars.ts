type Special = Lowercase<string> & Uppercase<string>;
type TrueIfAlphabet<T extends string> = T extends `${infer Head}${infer Tail}`
  ? Head extends Special
    ? false
    : TrueIfAlphabet<Tail>
  : true;

type IsAlphabet<T extends string> = TrueIfAlphabet<T> extends true ? T : never;


function isAlphabet<T extends string>(str: IsAlphabet<T>) {
  return [...str].every(char => char.toLowerCase() != char.toUpperCase());
}

isAlphabet('äa1sd');
