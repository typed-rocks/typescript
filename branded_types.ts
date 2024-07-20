
declare const __brand: unique symbol;

type Branded<T, Brand> = T & {[__brand]: Brand};

const email: string = 'hi@youtube.com';

type Email = Branded<string, 'Email'>;
function sendEmail(
  address: Email,
  text :string
)

{
  console.log(`send email to ${address} with text ${text}`);
}

function isValidEmail(input: string): input is Email {
  return input.includes('@');
}


function assertValidEmail(input: string): asserts input is Email {
  if(!input.includes('@')) {
    throw new Error(`${input} is no email`);
  }
}

assertValidEmail(email);
email
// ^?
sendEmail(email, 'our text');


sendEmail('totally not an email', 'asdf');
