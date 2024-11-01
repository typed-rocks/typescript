type Account = {
  id: ComplexId;
  login: string;
};

type FileData = {
  id: number;
  blob: string;
};

type ComplexId = {
  mainId: boolean;
  id: Date;
};

type Person = {
  id: string;
  firstname: string;
  lastname: string;
  fileData: FileData;
  account: Account;
};


type FindAllTypesForKey<SearchIn, KeyToLookFor extends PropertyKey> = 
SearchIn extends object 
  ? (KeyToLookFor extends keyof SearchIn ? SearchIn[KeyToLookFor]: never)
    | {
      [P in keyof SearchIn] : FindAllTypesForKey<SearchIn[P], KeyToLookFor>
    }[keyof SearchIn]
  : never;

type Id = FindAllTypesForKey<Person, 'id'>;
//   ^?
