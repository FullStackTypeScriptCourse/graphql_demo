  type Book = {
    id: string;
    title: string;
    author: string;
    rating_average: number;
    url: string;
    description: string;
    category: Category;
  }
  
  type Category = {
    id: string;
    name: string;
    books: Book[];
  }

  type Person = {
    id?: string;
    name: string;
    age: number;
  }

export type {Book, Category, Person}