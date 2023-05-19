type Events = {
    add:  string;
    delete: string;
}

type OnEvents = {
    [Property in keyof Events as `on${Capitalize<Property>}`] : () => any;
}

const userActions: OnEvents = {
    onAdd: () => {},
    onDelete: () => {}
}

// access type of property
type IsString = Events['add'];
//    ^? 

// keyof
type EventKeys = keyof Events;
//    ^? 

const invalidKey: EventKeys = 'move';


type Paths<T> = T extends object ?
    { [K in keyof T]-?: [K] | [K, ...Paths<T[K]>]  }[keyof T]
    : never;

type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
    };
