import mongoose from 'mongoose';
// const bcrypt = require('bcrypt');

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
});

// hash user password before saving into database
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) { // if password is not modified, then do not hash it again
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// UserSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// const AddressSchema = new mongoose.Schema({
//   street: String,
//   city: String,
//   country: String,
//   zip: String,
//   users: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }]
// });

// const Address = mongoose.model('Address', AddressSchema);
// const User = mongoose.model('User', UserSchema);
const Person = mongoose.model('Person', PersonSchema, 'persons'); // third argument is the collection name. If not applied mongoose will rename the collection to plural form of the model name. For example, if the model name is Person then the collection name will be people. To avoid this we can pass the third argument as the collection name.

export default Person;
