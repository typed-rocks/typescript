type PipeFn = (...args: any[]) => any;

type PipeChain<RemainingFns extends PipeFn[], CollectedFns extends PipeFn[] = []> = RemainingFns extends [
  infer First extends PipeFn,
  infer Second extends PipeFn,
  ...infer Rem extends PipeFn[]
]
  ? PipeChain<[(...args: [ReturnType<First>]) => ReturnType<Second>, ...Rem], [...CollectedFns, First]>
  : [...CollectedFns, ...RemainingFns];

type LastFn<Fns extends PipeFn[]> = Fns extends [...PipeFn[], infer Last extends PipeFn] ? Last : Fns[0];

function typedPipe<FnArgs extends PipeFn[]>(...args: PipeChain<FnArgs>) {
  return fp.pipe(args) as (...args: Parameters<FnArgs[0]>) => ReturnType<LastFn<FnArgs>>;
}
const a = (a: string) => ({a: 'a', b: 1});
const b = (c: {a: string, b: number}) => true;
const c = (b: boolean) => new Date();
const p = typedPipe(a, b, c);
//    
