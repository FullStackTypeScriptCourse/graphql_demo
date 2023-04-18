import Person from '../models/person';
import { PersonType } from '../types';

const getPerson = async (id:Number) => {
    const person = await Person.findById(id);
    console.log('object: ... :',person);
    if (!person) {
        throw new Error(`No object found with that ID: ${id}`);
    }
  };

const createPerson = async (person: PersonType) => {
    await Object.create(person);
};

export { getPerson, createPerson };