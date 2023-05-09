import { Task, User, MeasureUnit, Completed } from "../models/allmodels";
import { isCorrectAnswer} from "../utils";
import {
  IUser,
  ITask,
  IMeasureUnit,
  MeasureUnitCategory,
} from "../types";
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { authenticate } from "../utils";

const createTask = async(_parent: never, { input }: { input: ITask }) => {
  // console.log(input);
  const measureUnit = await MeasureUnit.findOne(input.measureUnit);
  if (!measureUnit) {
    throw new Error(`MeasureUnit not found with name ${input.measureUnit.name}`);
  }
  try{
    const task = new Task({...input, measureUnit: measureUnit._id});//, measureUnit: measureUnit._id});
    await task.save();
    console.log(task);
    return task;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

const updateTask = async (_: never, { id, input }: { id: string, input: ITask }) => {
  const task = await Task.findByIdAndUpdate(id, input, { new: true });
  return task;
};

const deleteTask = async (_: never, { id }: { id: number }) => {
  const task = await Task.findByIdAndDelete(id);
  return task;
};

const createUser = async (_: never, { input }: { input: IUser }) => {
  const user = new User(input);
  await user.save();
  return user;
};

const updateUser = async(_: never, { email, input }: { email: String, input: IUser }) => {
  const toUpdate = await User.findOne({ email });
  if (!toUpdate) {
    throw new Error(`User not found with email ${email}`);
  }
  toUpdate.set(input);
  await toUpdate.save();
  return toUpdate;
};

const deleteUser = async (_: never, { username }: { username: String }) => {
    const user = await User.findOneAndDelete({ username });
    return user;
};

const completeTask = async (_: never, { userId, taskId, answer, measureUnitId}: { userId: string, taskId: string, answer:number, measureUnitId: string }) => {
    const user = await User.findById(userId);
    const task = await Task.findById(taskId).populate('measureUnit');

    if(!user || !task) {
      throw new Error('User or task not found');
    }
    const correctAnswer = task.correctAnswer as number;
    const correctMeasureUnitId = task.measureUnit._id.toString() ;
    if(isCorrectAnswer(answer, correctAnswer, measureUnitId, correctMeasureUnitId)) {
      console.log('Correct answer. Now saving completed task');
      try{

      const completed = new Completed({approved: true, user:user._id, task:task._id });
      await completed.save();
      return completed;

      } catch (err: any) {
        console.log(err);
        throw new Error(err);
      }
    }
    throw new Error('Incorrect answer');
};

const createMeasureUnit = async (_parent: never, input: IMeasureUnit) => {
    const { name, category } = input;

    // Check that the category is one of the allowed values from the enum
    if (!Object.values(MeasureUnitCategory).includes(category)) {
      console.log('Invalid measure unit category', Object.values(MeasureUnitCategory), category);
      throw new Error('Invalid measure unit category');
    }

    try {
      const measureUnit = new MeasureUnit({
        name,
        category,
      });

      await measureUnit.save();
      return measureUnit.toObject();

    } catch (error: any) { // errors must be any or unknown.
      console.log('Error creating measure unit', error);

      if (error.extensions?.code === ApolloServerErrorCode.BAD_USER_INPUT) {
        // Duplicate key error: name already exists
        throw new Error('Measure unit name already exists');
      }
      throw new Error('Error creating measure unit');
    }
  };

export default {
  createTask: authenticate('admin',createTask), // only authenticated admin can create tasks
  updateTask: authenticate('admin',updateTask),
  deleteTask: authenticate('admin',deleteTask),
  createUser: authenticate('admin',createUser),
  updateUser: authenticate('admin',updateUser),
  deleteUser: authenticate('admin',deleteUser),
  completeTask: authenticate('admin',completeTask),
  createMeasureUnit: authenticate('admin',createMeasureUnit),
}