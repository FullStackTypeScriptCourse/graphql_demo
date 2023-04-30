  type Address = {
    id?: string;
    street: string;
    city: string;
    country: string;
    zip: string;
  }

  type Person = {
    id?: string;
    name: string;
    age: number;
    address?: Address;
  }

export type {Address, Person}