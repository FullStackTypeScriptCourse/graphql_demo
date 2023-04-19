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
  type Theme = {
    isLight: boolean;
    light: {
      text: string;
      ui: string;
      bg: string;
    };
    dark: {
      text: string;
      ui: string;
      bg: string;
    };
  };
      
export type {Book, Category, Theme}