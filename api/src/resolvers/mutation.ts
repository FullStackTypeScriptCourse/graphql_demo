import {Person, Address} from "../models/person";
import { PersonDocumentType, AddressTypeDocument } from '../types';
import { ObjectId} from 'mongoose';
  export default {
    createPerson: async (_parent:never, { name, age }:PersonDocumentType) => {
      const newPerson = new Person({ name, age });
      await newPerson.save();
      return newPerson;
    },
    deletePerson: async (_parent:never, { id }:PersonDocumentType) => {
      const result = await Person.findByIdAndDelete(id);
      return result ? true : false;
    },
    updatePerson: async (_parent:never, { id, name, age }:PersonDocumentType) => {
      const result = await Person.findByIdAndUpdate(id, {name, age});
      return result;
    },
    createAddress: async (_parent:never, { street, city, country, zip }:AddressTypeDocument) => {
      const addr = new Address({ street, city, country, zip });
      await addr.save();
      return addr;
    },
    // removePersonFromAddressOld: async (_parent:never, { personId, addressId }:{personId:String,addressId:String}) => {
    //   const person : PersonDocumentType | null = await Person.findById(personId);
    //   const address : AddressTypeDocument | null = await Address.findById(addressId);
    //   if(!person || !address) return false;
    //   Address.findByIdAndUpdate(addressId, { $pull: { persons: personId } });
    //   Person.findByIdAndUpdate(personId, { address: null });
    //   return address;
    // },

    removePersonFromAddress: async (
      _parent: never,
      { personId, addressId }: { personId: string, addressId: string }
    ) => {
      try {
        const person = await Person.findById(personId);
        const address = await Address.findOneAndUpdate(
          { _id: addressId },
          { $pull: { persons: personId } },
          { new: true }
        );
        if (!person || !address) {
          throw new Error('Person or address not found.');
        }
        await Person.findByIdAndUpdate(personId, { address: null });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    // addPersonToAddressOld: async (_parent:never, { personId, addressId }:{personId:String,addressId:String}) => {
    //   const address:AddressTypeDocument | null = await Address.findById(addressId).populate('persons');
    //   const person:PersonDocumentType | null = await Person.findById(personId);
    //   // console.log('address: ', address, 'person: ', person);
    //   if(address && person){
    //     address.persons.push(person);
    //     person.address = address;
    //     await address.save();
    //     return true;
    //   } else {
    //   return false;
    //   }
    // },  
    addPersonToAddress: async (
      _parent: never,
      { personId, addressId }: { personId: string, addressId: string }
    ) => {
      try {
        const address = await Address.findById(addressId).populate('persons') as AddressTypeDocument;
        const person : PersonDocumentType | null = await Person.findById(personId);

        if (!person) { throw new Error(`Person with ID ${personId} not found.`); }
        if (!address) { throw new Error(`Address with ID ${addressId} not found.`); }
        if (address.persons.some((p: any) => p.id === personId)) {
          throw new Error(`Person with ID ${personId} is already associated with address with ID ${addressId}.`);
        }
        person.address = address;
        address.persons.push(person._id);
        await address.save();
        await person.save();
        // return address;
        return true;
      } catch (error) {
        console.error(error);
        // return null;
        return false;
      }
    },
};

