import Person from '../models/person';
import { PersonType } from '../types';

const getPerson = async (id:Number) => {
    const person = await Person.findById(id);
    console.log('object: ... :',person);
    if (!person) {
        throw new Error(`No object found with that ID: ${id}`);
    }
  };
const getAllPersons = async () => {
    const persons = await Person.find({});
    console.log('persons: ... :',persons);
    };

const createPerson = async (person: PersonType) => {
    await Object.create(person);
};

export { getPerson, createPerson, getAllPersons};