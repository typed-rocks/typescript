
type Position = [number, number, string];
type isLength<T extends any[], Length extends number> = T['length'] extends Length ? true : false;

type Inc<T extends 0[]> = [0, ...T];

type InitCount<Length extends number, Count extends 0[] = []> = Count['length'] extends Length ? Count : InitCount<Length, [...Count, 0]>;

type WriteHorizontal<XStart extends 0[], YStart extends number, Str extends string, WriteArray extends Position[] = []> = Str extends `${infer Head extends string}${infer Rest extends string}` 
? WriteHorizontal<Inc<XStart>, YStart, Rest, [...WriteArray, [XStart['length'], YStart, Head]]>
: WriteArray;

type WriteVertical<YStart extends 0[], XStart extends number, Str extends string, WriteArray extends Position[] = []> = Str extends `${infer Head extends string}${infer Rest extends string}` 
? WriteVertical<Inc<YStart>, XStart, Rest, [...WriteArray, [XStart, YStart['length'], Head]]>
: WriteArray;


type WriteWord<XStart extends number, YStart extends number, Str extends string> = WriteHorizontal<InitCount<XStart>, YStart, Str>;

type CheckBox<T extends number> = T extends 1 
? '✅' :  T extends 0 ? '🔲' : '🔥'; 

type Todo< done extends number, Todo extends string, Line extends number> = WriteWord<1, Line, `${CheckBox<done>} ${Todo}`>; 


type GetPositionMatching<Positions extends Position[], XSearch extends number, YSearch extends number> = 
Positions extends [[infer X extends number, infer Y extends number, infer Str extends string], ...infer Rest extends Position[]]
  ? XSearch extends X 
    ? YSearch extends Y 
      ? [X, Y, Str]
      : GetPositionMatching<Rest, XSearch, YSearch>
    : GetPositionMatching<Rest, XSearch, YSearch>
  : false;

type DrawAt<Positions extends Position[], Width extends number, Height extends number, Empty extends string, R extends string = '', XCount extends 0[] = [], YCount extends 0[] = []> =
isLength<XCount, Width> extends true
  ? isLength<YCount, Height> extends true
    ? R
    : DrawAt<Positions, Width, Height, Empty, `${R}<br>`, [], Inc<YCount>>
  : GetPositionMatching<Positions, XCount['length'], YCount['length']> extends [number, number, infer Str extends string]
    ? DrawAt<Positions, Width, Height, Empty, `${R}${Str}`, Inc<XCount>, YCount>
    : DrawAt<Positions, Width, Height, Empty, `${R}${Empty}`, Inc<XCount>, YCount>;

type Repeat<Char extends string, Times extends number, Count extends 0[] = [], Word extends string = ''> = Count['length'] extends Times 
? Word 
: Repeat<Char, Times, [...Count, 0], `${Word}${Char}`>;    
type HorizontalLine<XStart extends number, YStart extends number, Length extends number> = 
WriteHorizontal<InitCount<XStart>, YStart, Repeat<'-', Length>>;
type VerticalLine<XStart extends number, YStart extends number, Length extends number> = 
WriteVertical<InitCount<YStart>, XStart, Repeat<'|', Length>>;
  


  type block = [
    ...HorizontalLine<0, 0, 23>,
    ...HorizontalLine<0, 2, 25>,
    ...HorizontalLine<0, 16, 25>,
    ...VerticalLine<22, 1, 1>,
    ...VerticalLine<0, 1, 1>,
  ];
  

type Todos<R extends any[]> = [
  ...WriteWord<8, 1, 'Agenda'>,
  ...Todo<R[0], 'mapped types', 4>,
  ...Todo<R[1], 'template literals', 6>,
    ...Todo<R[2], 'never/conditionals',8>,
    ...Todo<R[3], 'infer', 10>,
    ...Todo<R[4], 'recursion', 12>,
    ...Todo<R[5], 'branded types', 14>,
  ]

type State = [0,1,1,1,1,1];
type Result = DrawAt<[...block, ...Todos<State>], 23, 16, ' '>;