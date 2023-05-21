function branded<PrimitiveType, BrandName, Brand extends PrimitiveType & {__brand: BrandName}>(
    checkFn: (input: PrimitiveType) => boolean, brandName: BrandName
): [(input: PrimitiveType) => input is Brand, Brand] {
    const isBrand = function (input: PrimitiveType): input is Brand {
        return checkFn(input);
    }

    return [isBrand, {} as Brand];
}

const [isEmail, EmailObject] = branded((input: string) => true, 'ValidEmail' as const);

type ValidEmail = typeof EmailObject;

function sendEmail(input: ValidEmail) {

}

const email = 'mail';
if(isEmail(email)) {
    const validEmail: ValidEmail = email;
    sendEmail(email);
}

const invalidEmail: ValidEmail = email;
