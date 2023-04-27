import {Person, Address} from "../models/person";
export default {
    persons: async ()=> { const lst = await Person.find({}).populate('address'); console.log('POPULATE: ',lst); return lst},//{return [{name:'perter',age:33}]}//Person.find({})
    person: async (_parent:never, { id }:{id:String}) => await Person.findById(id).populate('address'),
    address: async (_parent:never, { id }:{id:String}) => await Address.findById(id),
    addresses: async ()=> await Address.find({}).populate('persons'),
}