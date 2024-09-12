
type BaseMessage = { id: string, timestamp: number };
type TextMessage = BaseMessage & { text: string; };
type ImgMessage = BaseMessage & { imgPath: string };
type UrlMessage = BaseMessage & { url: string; };

type Message = TextMessage | UrlMessage | ImgMessage;
type MessageTypesArray = OneOf<[TextMessage, UrlMessage, ImgMessage]>;

type MergeTypes<TypesArray extends any[], Res = {}> =
  TypesArray extends [infer Head, ...infer Rem]
    ? MergeTypes<Rem, Res & Head>
    : Res;

type OneOf<
  TypesArray extends any[],
  Res = never,
  AllProperties = MergeTypes<TypesArray>> =
  TypesArray extends [infer Head, ...infer Rem]
    ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
    : Res;
 
type SimpleOneOf<F, S> = OnlyFirst<F, S> | OnlyFirst<S, F>;

type OnlyFirst<F, S> = F & {[Key in keyof Omit<S, keyof F>]?: never};

const message: MessageTypesArray = {
  id: '1',
  timestamp: new Date().getTime(),

  imgPath: 'path'
}
