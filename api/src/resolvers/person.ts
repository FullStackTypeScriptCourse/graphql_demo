import { PersonDocumentType, AddressType } from '../types';
export default {
    address: async (person: PersonDocumentType): Promise<AddressType> => {
        const populatedPerson = await person.populate('address')
        return populatedPerson.address;
    }
};