type Book = {
    id: string;
    title: string;
    author: string;
    categoryId: string;
};
type Category = {
    id: string;
    name: string;
};
type Rating = {
    id: string;
    value: number;
    title: string;
    description: string;
    bookId: string;
};
type Context = {
    categories: Category[];
    ratings: Rating[];
    books: Book[];
};
type Args = {
    id: string;
    input: Book | Rating;
};
type PersonType = {
    id: string;
    name: string;
    age: number;
};
type AddressType = {
    id: string;
    street: string;
    city: string;
    country: string;
    zip: string;
    persons: PersonType[];
};
export type { Book, Category, Rating, Context, Args, PersonType, AddressType };