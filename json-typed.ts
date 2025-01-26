
const obj = {
  a: 'hello',
  b: 1,
  c: undefined,
  d: {
    toJSON() {
      return 42;
    }
  },
  e: () => console.log('hi from e')
}

const str = JSON.stringify(obj);//?
//    ^?

const parsed = JSON.parse(str);
//     ^?

writePersonObject('');


function writePersonObject(str: Stringified<{firstname: string, lastname: string}>) {

}

type JsonifiedValue<T> = T extends string | number | null | boolean
? T 
: T extends {toJSON(): infer R} ? R
: T extends undefined | ((...args: any[]) => any) ? never
: T extends object ? JsonifiedObject<T>
: never;

type JsonifiedObject<T> = {
  [Key in keyof T as [JsonifiedValue<T[Key]>] extends [never] ? never : Key]: JsonifiedValue<T[Key]>
}

parsed.b

type Stringified<ObjType> = string & {source: ObjType};

interface JSON {
  stringify<T>(value: T, replacer?: null | undefined, space?: string | number): Stringified<T>;
  parse<T>(str: Stringified<T>, replacer?: null | undefined): JsonifiedObject<T>;
}
