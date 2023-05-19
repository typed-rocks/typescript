type IsAnythingAssignableToNever = boolean extends never ? true : false;
//    ^?

type IsNeverAssignableToAnything = never extends boolean ? true : false;
//    ^?


type Locations = 'Oslo' | 'London';
//    ^?


// keep js usage save
function getValidLocationCountry(location: Locations): string {
    switch (location) {
        case 'Oslo':
            return 'Norway';
        case 'London':
            return 'England';
        default: 
            throw new Error(`${location} not known`);
    }
}
getValidLocationCountry("Oslo");

//compile
function getValidLocationCountryCompile(location: Locations): string {
    switch (location) {
        case 'Oslo':
            return 'Norway';
        case 'London':
            return 'England';
        default: 
            const exhaustiveCheck: never = location;
            throw new Error(`${location} not known`);
    }
}

getValidLocationCountryCompile('Oslo');

type NoEmptyString<T extends string> = T extends '' ? never : T;

function isEmptyString<T extends string>(nonEmpty: NoEmptyString<T>) {

}

isEmptyString('');
