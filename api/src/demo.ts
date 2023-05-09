import { Task, User, MeasureUnit, Completed } from "./models/allmodels";
import { isCorrectAnswer} from "./utils";
import {
  IUser,
  ITask,
  IMeasureUnit,
  MeasureUnitCategory,
} from "./types";
// console.log('Hello World!  from demo.ts')

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


const completed = new Completed({approved: true, user:"6456b2eae4ad26a53b16ea8e", task:"6459efda5f5c557e378f4969" });
const returned = await completed.save();
console.log('returned', returned);
        