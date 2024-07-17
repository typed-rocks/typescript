type LegacySystemApi = {
  legacy_nameV1: string;
  legacy_nameV2: string;
  legacy_nameV3: string;
  legacy_timstampV1: string;
  new_timestampV1: string;
  legacy_userV1: {
    legacy_uuidV1: number,
    legacy_uuid_V2: string,
    legacy_firstnameV1: string
  }
}

type OurApi = {
  user: {
    firstname: string;
    id: string;
  }
  name: string;
  timestamp: string;
}


type FromTo = { from: string, to: string };

type SearchAndReplace<T, From extends string, To extends string> =
  T extends `${infer Before}${From}${infer After}`
    ? SearchAndReplace<`${Before}${To}${After}`, From, To> : T;

type SearchAndReplaceAll<T, FromToArray extends FromTo[]> =
  FromToArray extends [
      { from: infer From extends string, to: infer To extends string },
      ...infer Remaining extends FromTo[]
    ]
    ? SearchAndReplaceAll<SearchAndReplace<T, From, To>, Remaining>
    : T;

type Replacements = [
  { from: 'legacy_', to: '' },
  { from: 'new_', to: '' },
  { from: `V${number}`, to: '' },
  { from: 'timstamp', to: 'timestamp' },
  { from: 'uuid_', to: 'id' },
  { from: 'uuid', to: 'id' },
]


type DeepReplace<T, FromToArray extends FromTo[]> = {
  [Key in keyof T as SearchAndReplaceAll<Key, FromToArray>]: DeepReplace<T[Key], FromToArray>
}

type Cleaned = DeepReplace<
  LegacySystemApi, Replacements
>;
const clean: Cleaned = {
  user: {
    firstname: 'Christian',
    id: '1234'
  },
  name: "No more Legacy",
  timestamp: '1111'
}
