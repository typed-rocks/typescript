type AutoComplete<T extends string> = T | (string & {});

type Lang = AutoComplete<"TypeScript"| "JavaScript">;

const valid: Lang = "Anything";
const alsoValid: Lang = "TypeScript";
//                       ^ Autocomplete suggestions from ts-server works 
