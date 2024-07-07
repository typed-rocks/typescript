
type SimpleLength<T extends string, Counter extends 0[] = []> =
  T extends `${string}${infer tail}`
    ? SimpleLength<tail,  [...Counter, 0]>
    : Counter['length'];

type IsTemplate<T extends string> = SimpleLength<T> extends 0
  ? T extends ''
    ? false
    : true
  : false;

type ContainsTemplate<T extends string> = T extends `${infer head}${infer tail}`
  ? IsTemplate<head> extends true ? true : ContainsTemplate<tail> : IsTemplate<T>;
type Hello = 'hello';
type HelloTest = Length<`Hello ${Hello}Youtube`>;
//   ^?

type Length<T extends string> = ContainsTemplate<T> extends true
  ? never
  : SimpleLength<T>;
