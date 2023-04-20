import express from 'express';
import Person from '../models/person';
type PersonType = {
    name: string;
    age: number;
};
const router = express.Router();

router.get('/', async (req, res) => {
    // const createResult = await Person.create([
    //     { name: 'Jean-Luc Picard', age: 59},
    //     { name: 'William Riker', age: 29},
    //     { name: 'Deanna Troi', age: 28 },
    //     { name: 'Geordi La Forge', age: 29 },
    //     { name: 'Worf', age: 24 }
    //   ]);
    //   const result = await Person.find({}).then((result) => {
    //     console.log('result: ... :',result);
    //     }).catch((err) => {
    //     console.log('err: ... :',err);
    //     });
    res.json({ msg: "result"});
});
export default router;
