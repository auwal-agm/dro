export default interface Book {
    id?: any | null,
    title: string,
    description: string,
    published?: boolean,
    url: string,
    name: string,
    isbn: string,
    authors: string[],
    numberOfPages: Number,
    publisher: string,
    country: string,
    mediaType: string,
    released: string,
    characters: string[],
    povCharacters:string[],
    charactersDetail: any
}