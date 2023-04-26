import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }
});

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  country: String,
  zip: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Address = mongoose.model('Address', AddressSchema, 'addresses');
const Person = mongoose.model('Person', PersonSchema, 'persons'); // third argument is the collection name. If not applied mongoose will rename the collection to plural form of the model name. For example, if the model name is Person then the collection name will be people. To avoid this we can pass the third argument as the collection name.

export {Person, Address};
