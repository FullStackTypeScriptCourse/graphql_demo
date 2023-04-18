import express from 'express';
import Person from '../models/person';
type PersonType = {
    name: string;
    age: number;
};
const people = Person.find({});
console.log('people: ... :',people);
people.then((result) => {
    console.log('RESULT: ',result);
});
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ msg: 'Users route'});
});
export default router;
