import { Document } from 'mongoose';
type PersonType = {
    // id: string;
    name: string;
    age: number;
    address: AddressType;
};
type AddressType = {
    street: {
        type: string;
        required: true;
    };
    city: {
        type: string;
        required: true;
    }
    country: {
        type: string;
        required: true;
    }
    zip: {
        type: string;
        required: true;
    }
    persons: PersonType[];
};

interface AddressTypeDocument extends AddressType, Document {} // Extend both the Typescript type and the Mongoose Document type to get access to both sets of properties.
interface PersonDocumentType extends PersonType, Document {} 

export type { PersonType, AddressType, AddressTypeDocument, PersonDocumentType };