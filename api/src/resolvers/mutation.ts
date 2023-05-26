import { Task, User, MeasureUnit, Completed, TaskCategory } from "../models/allmodels";
import { isCorrectAnswer} from "../utils";
import {
  IUser,
  ITask,
  IMeasureUnit,
  MeasureUnitCategory,
  TaskCategoryType,
} from "../types";
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { authenticate } from "../utils";

const createTask = async(_parent: never, { input }: { input: ITask }) => {
  // console.log(input);
  const measureUnit = await MeasureUnit.findOne(input.measureUnit);
  const category = await TaskCategory.findOne({name:input.category});
  if (!measureUnit) {
    throw new Error(`MeasureUnit not found with name ${input.measureUnit.name}`);
  }
  if (!category) {
    throw new Error(`Task Category not found with name ${input.category.name}`);
  }
  try{
    const task = new Task({...input, measureUnit: measureUnit._id, category: category._id});//, measureUnit: measureUnit._id});
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
  user.set({ roles: ['student'] })
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

      const completed = new Completed({approved: true, user:userId, task:taskId });
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
  const createTaskCategory = async (_parent: never, {name}: {name:string}) => {

    console.log('Creating task category', name);

    // Check that the category name is one of the allowed values from the enum
    if (!Object.values(TaskCategoryType).includes(name)) {
      console.log('Invalid task category', Object.values(TaskCategoryType), name);
      throw new Error('Invalid task category name'+name);
    }

    try {
      const taskCategory = new TaskCategory({ name:name, });

      await taskCategory.save();
      return taskCategory.toObject();

    } catch (error: any) { // errors must be any or unknown.
      console.log('Error creating measure unit', error);

      if (error.extensions?.code === ApolloServerErrorCode.BAD_USER_INPUT) {
        // Duplicate key error: name already exists
        throw new Error('Task Category name already exists');
      }
      throw new Error('Error creating task category unit');
    }
  };

export default {
  createTask: authenticate('admin',createTask), // only authenticated admin can create tasks
  updateTask: authenticate('admin',updateTask),
  deleteTask: authenticate('admin',deleteTask),
  createUser: createUser,
  // createUser: createUser,
  updateUser: authenticate('admin',updateUser),
  deleteUser: authenticate('admin',deleteUser),
  completeTask: authenticate('student',completeTask),
  createMeasureUnit: authenticate('admin',createMeasureUnit),
  createTaskCategory: authenticate('admin',createTaskCategory),
}