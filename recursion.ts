// builtin type: Awaited

type Resolved = Awaited<Promise<Promise<Promise<string>>>>;
//    ^? 

type Tuple<Type, Length extends number, Tuple extends Type[] = []> = Tuple['length'] extends Length ? Tuple : TupleSized<Type, Length, [Type, ...Tuple]>;


type T3 = Tuple<number, 4>;
//   ^?

// MAX depth 1000 

interface Form {
    a: string;
    b: {
        c: {
            d: string;
        }
    }
}

type ArrayOrNever<T> = T extends any[] ? T : never;

type Path<T> = T extends object ? {[Key in keyof T]: [Key] | [Key, ...Path<T[Key]>]}[keyof T] : never;
type R = Path<Form>;
//   ^?
