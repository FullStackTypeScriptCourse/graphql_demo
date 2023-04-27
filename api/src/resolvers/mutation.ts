// import { books, ratings } from '../data';
import {Person, Address} from "../models/person";
import { Book, Rating, Context, Args, PersonType, AddressType } from '../types';
  export default {
    createBook: (_parent:Book, { input }:Args, {books}:Context) => {
      if('author' in input){ // input is a Book
        const newBook: Book = {
          id: String(books.length + 1),
          title: input.title,
          author: input.author,
          categoryId: input.categoryId,
        };
        console.log('input: ', input, newBook);
        books.push(newBook);
        return newBook;
      } else {
        return null;
      }
      
    },
    createRating: (_parent:never, { input }:Args, {ratings}:Context) => {
      if('value' in input){ // input is a Rating
      const newRating:Rating = {
        id: String(ratings.length + 1),
        value: input.value,
        title: input.title,
        description: input.description,
        bookId: input.bookId,
      };
      console.log('rating input: ', input, newRating);
      ratings.push(newRating);
      return newRating;
    } else {
      return null;
    }
    },
    deleteBook: (_parent:never, { id }:Args, {books}:Context) => {
      const index = books.findIndex(person => person.id === id);
      if (index === -1) {
        return false; // person not found
      }
      books.splice(index, 1);
      return true; // deletion successful
    },
    updateBook: (_parent: never, { id, input }:Args, {books}:Context) => {
      const index = books.findIndex(person => person.id === id);
      if (index === -1) {
        return null; // person not found
      }
      const book = books[index];
      const updatedBook = { ...book, ...input };
      books[index] = updatedBook;
      return updatedBook;
    },
    // MONGOOSE EXAMPLES:
    createPerson: async (_parent:never, { name, age }:PersonType) => {
      const newPerson = new Person({ name, age });
      await newPerson.save();
      return newPerson;
    },
    deletePerson: async (_parent:never, { id }:PersonType) => {
      const result = await Person.findByIdAndDelete(id);
      return result ? true : false;
    },
    updatePerson: async (_parent:never, { id, name, age }:PersonType) => {
      const result = await Person.findByIdAndUpdate(id, {name, age});
      return result;
    },
    createAddress: async (_parent:never, { street, city, country, zip }:AddressType) => {
      const addr = new Address({ street, city, country, zip });
      await addr.save();
      return addr;
    },
    removePersonFromAddress: async (_parent:never, { personId, addressId }:{personId:String,addressId:String}) => {
      const person = await Person.find(personId);
      const addr = await Address.find(addressId).updateOne({ $pull: { persons: person } });
      return addr;
      // Address.findByIdAndUpdate(addressId, { $pull: { persons: personId } });
    },
    addPersonToAddress: async (_parent:never, { personId, addressId }:{personId:String,addressId:String}) => {
      const address:any = await Address.findById(addressId).populate('persons');
      const person = await Person.findById(personId);
      // console.log('address: ', address, 'person: ', person);
      if(address && person){
        address.persons.push(person);
        await address.save();
        return true;
      } else {
      return false;
      }
    },  
  }