interface Book {
    name: string;
    alternativeNames?: string[];
    tags?: string[];
    genres?: string[];
    description: string;
    parsingLink?: string;
    creatorId: string;
    editors?: string[];
    titleImage?: string;
    images?:string[];
}

export default Book;