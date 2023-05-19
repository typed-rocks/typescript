type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function add(a: number, b: number): number {
  return a + b;
}

type AddReturnType = MyReturnType<typeof add>;
//   ^?


type RgbInfer<T> = T extends `rgb(${infer first},${infer second},${infer third})`
? [first, second, third] : never;

type RgbInferNumber<T> = T extends `rgb(${infer first extends number},${infer second extends number},${infer third extends number})`
? [first, second, third] : never;

type ValidRgb = RgbInfer<'rgb(1,2,3)'>;
//    ^?
type ValidRgbNumber = RgbInferNumber<'rgb(1,2,3)'>;
//    ^? 


type InvalidRgb = RgbInferNumber<'rgb(1,2,a)'>;
//    ^? 

