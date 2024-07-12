function error(): never {
	throw new Error('never returns');
}

function neverDone(): never {
	while(true) {
	}
}

// without never
function error() {
  throw new Error('any error');
}
let possiblyNull: string | null = '' as any;
if(!possiblyNull)  error();
possiblyNull;
//   ^? let possiblyNull: string | null

// with never
function error(): never {
  throw new Error('any error');
}
let possiblyNull: string | null = '' as any;
if(!possiblyNull)  error();
possiblyNull;
//   ^? let possiblyNull: string

// or 
const nonNull = possiblyNull ?? error();

function unknownLanguages(lang: never): never {
	throw new Error(`${lang} not known`);
}
type Languages = 'js' | 'ts';

function getRealName(language: Languages): string {
	switch(language) {
		case 'js':
			return 'JavaScript';
		case 'ts':
			return 'TypeScript';
		default:
			return unknownLanguages(language);
	}
}

type ImageMessage = {
  imgPath: string;
  text?: never;
}

type TextMessage = {
  text: string;
  imgPath?: never;
}

type Message = {timestamp: number, sender: string} & (ImageMessage | TextMessage);

const m: Message = {
  imgPath: '/path/img', 
  sender: 'Christian Worz', 
  text: 'A text',
  timestamp: 123
}

type Filter<Obj extends Object, ValueType> = {
    [Key in keyof Obj 
        as ValueType extends Obj[Key] ? Key : never]
        : Obj[Key]
}

type IsNever<T> = T extends never ? true : false;

type R = IsNever<never>;
//   ^? never => never is an empty union type so nothing to check for to extend. so its never again

// Fix:

type IsNever<T> = [T] extends [never] ? true : false;

type R = IsNever<never>;
//   ^?
