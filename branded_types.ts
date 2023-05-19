function branded<T, Brand extends T & {__brand: symbol}>(checkFn: (input: T) => boolean): [(input: T) => input is Brand, Brand] {
    const isBrand = function (input: T): input is Brand {
        return checkFn(input);
    }

    return [isBrand, {} as Brand];
}

const [isEmail, EmailObject] = branded((input: string) => true);

type EmailAddress = typeof EmailObject;
//   ^? 

function saveEmail(input: EmailAddress) {

}

const a = 'adsf';
if(isEmail(a)) {
    saveEmail(a);
}
