// import {categories} from "../data";
import {PersonType, AddressType} from "../types";
import { Document } from 'mongoose';

interface AddressTypeDocument extends AddressType, Document {} // Extend both the Typescript type and the Mongoose Document type to get access to both sets of properties.

export default {
    persons: async (address:AddressTypeDocument): Promise<PersonType[]> => {
    const populatedAddress = (await address.populate('persons'));
    return populatedAddress.persons;
  }
}