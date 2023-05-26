import mongoose from 'mongoose';
import { IMeasureUnit, MeasureUnitCategory, TaskCategoryType } from '../types';
import bcrypt from 'bcrypt';

// define schema for task category
const taskCategorySchema = new mongoose.Schema({
  name: { type: String, enum: Object.values(TaskCategoryType), required: true, unique: true },
});

// define schema for Task
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: Number},//, required: true },
  studyPoints: { type: Number}, //required: true },
  correctAnswer: { type: Number}, //required: true },
  measureUnit: { type: mongoose.Schema.Types.ObjectId, ref: 'MeasureUnit', required: true },
  created: { type: Date, default: Date.now }, 
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskCategory', required: true },
  hint: { type: String, required: false },
});

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: false },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
});

const assignmentSchema = new mongoose.Schema({
  dueDate: { type: Date, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }],
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  created: { type: Date, default: Date.now },
});

// define schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  roles: [{ type: String, enum: ['student', 'teacher', 'admin'], default: 'student' }],
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
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
const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: String, required: false },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: false },
  studypoints: { type: Number, required: false }
});

const measureUnitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, enum:Object.values(MeasureUnitCategory), required: true}
});

// define schema for Completed
const completedSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true, unique: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: false },
  approved: { type: Boolean, required: true }
});
completedSchema.index({ task: 1, user: 1 }, { unique: true }); // Make sure the same user can only complete the same task once.

// create models for each schema
const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
const MeasureUnit = mongoose.model('MeasureUnit', measureUnitSchema);
const TaskCategory = mongoose.model('TaskCategory', taskCategorySchema);
const Completed = mongoose.model('Completed', completedSchema);
const Class = mongoose.model('Class', classSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);

export {
  Task,
  User,
  Student,
  MeasureUnit,
  Completed, 
  Class,
  Assignment,
  TaskCategory,
};
