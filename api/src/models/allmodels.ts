import mongoose from 'mongoose';
import { IMeasureUnit, MeasureUnitCategory } from '../types';
import bcrypt from 'bcrypt';

// define schema for Task
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: Number},//, required: true },
  studyPoints: { type: Number}, //required: true },
  correctAnswer: { type: Number}, //required: true },
  measureUnit: { type: mongoose.Schema.Types.ObjectId, ref: 'MeasureUnit', required: true }
});

// define schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  roles: [{ type: String }]
},{
  methods: {
  comparePassword: async function (password: string) {
    return bcrypt.compare(password, this.password);
  }
}});
// hash user password before saving into database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { // if password is not modified, then do nothing
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// userSchema.method('comparePassword',function (password: string) {
//   return bcrypt.compare(password, this.password);
// });

// define schema for MeasureUnit: category is an enum
const measureUnitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, enum:Object.values(MeasureUnitCategory), required: true}
});

// define schema for Completed
const completedSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, required: true }
});

// create models for each schema
const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);
const MeasureUnit = mongoose.model('MeasureUnit', measureUnitSchema);
const Completed = mongoose.model('Completed', completedSchema);

export {
  Task,
  User,
  MeasureUnit,
  Completed
};
