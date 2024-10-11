type LiteralUnion<Suggestions extends string> = Suggestions | (string & {});

type ImageMimiTypes =
    "image/bmp" |
    "image/gif" |
    "image/png" |
    "image/svg+xml" |
    "image/tiff" |
    "image/vnd.microsoft.icon" |
    "image/webp";

let validValueWithMimeType: LiteralUnion<ImageMimiTypes> = 'image/bmp'; // this is valid and was suggested automatically
let validValueWithoutMimeType: LiteralUnion<ImageMimiTypes> = ''; // this is still valid 
