
type Mapping = {
  [Key in "d" | "i" | "f"]: number
} & 
{s: string} &
{[Key in "o" | "O"]: object};

type AddMappedToArray<ArgsArray extends any[], Char> = 
  Char extends keyof Mapping ? [...ArgsArray, Mapping[Char]] : ArgsArray;

type FirstChar<T extends string> = T extends `${infer Head}${string}` ? Head : T;

type ArgsFromPlaceholder<
  RemainingString extends string,
  ArgsArray extends any[] = []
> = RemainingString extends `${infer Head}${infer Tail}`
  ? Head extends "%"
    ? ArgsFromPlaceholder<Tail, AddMappedToArray<ArgsArray, FirstChar<Tail>>>
    : ArgsFromPlaceholder<Tail, ArgsArray>
  : [...ArgsArray, ...args: any[]];

type BaseTypes = string | number | object | bigint | boolean | symbol | null | undefined;

type OptionalParams<Input> = Input extends string ? ArgsFromPlaceholder<Input> : any[];

declare var console: Omit<Console, 'log'> & {
  log<T extends BaseTypes>(
    message?: T, ...optionalParams: OptionalParams<T>
  ): void;
}

console.log("%s %d, YouTube", "Hi", 5);

console.log("Hi %d, %s", "Five", "YouTube");
