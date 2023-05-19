// builtin type: Awaited

type Resolved = Awaited<Promise<Promise<Promise<string>>>>;
//    ^? 

type Tupel<Type, Length extends number, Tupel extends Type[] = []> = Tupel['length'] extends Length ? Tupel : TupelSized<Type, Length, [Type, ...Tupel]>;


type T3 = Tupel<number, 4>;
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
