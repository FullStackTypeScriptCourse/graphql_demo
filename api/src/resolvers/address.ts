// import {categories} from "../data";
import {PersonType, AddressTypeDocument} from "../types";

export default {
    persons: async (address:AddressTypeDocument): Promise<PersonType[]> => {
    const populatedAddress = (await address.populate('persons'));
    return populatedAddress.persons;
  }
}