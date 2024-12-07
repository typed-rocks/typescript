type Callback = ((err?: any) => void) | ((err: any, result: any) => void);
type GetResult<Cb extends Callback> = 
        Parameters<Cb>["length"] extends 2 ? Parameters<Cb>[1] : void;

type Promisified<Fn extends Function> = 
  Fn extends (...args: [...infer Args, infer Cb extends Callback]) => void
   ? (...args: Args) => Promise<GetResult<Cb>>
   : never;


function typedPromisify<Fn extends Function>(fn: Fn): Promisified<Fn> {
  return promisify(fn) as Promisified<Fn>;
}
