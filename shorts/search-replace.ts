type Rating = {
  aBadLanguage: 'TypeScript', // FROM
  //aCoolLanguage: 'TypeScript', // TO
}

type Replace<
  InputStr,
  From extends string,
  To extends string
> = InputStr extends
  `${infer Before}${From}${infer After}`
  ? `${Before}${To}${After}`
  : InputStr;

type ReplaceInObject<Obj> = {
  [Key in keyof Obj as
    Replace<Key, 'Bad', 'Cool'>]: Obj[Key]
}

type Check = ReplaceInObject<Rating>;
//   ^?
