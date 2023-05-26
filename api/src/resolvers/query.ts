import {ObjectId} from 'mongodb';
import {Task, User, MeasureUnit, Completed, TaskCategory} from "../models/allmodels";
import { authenticate } from "../utils";

export default {
    tasks: async (_parent:never, _args: never, _context:never, _info:never) => await Task.find()//.populate('measureUnit').sort({ level: 1, name: 1 }).lean(), // Sort by level and then by name ascending (-1 is descending)
    ,tasksByLevel: async (_parent:never, { level }:{level:number}) => await Task.find({ level })
    ,task: async (_parent:never, { id }:{id:string}) => await Task.findById(id)
    ,users: authenticate('admin', async (_parent:never, { email }:{email:String}) => await User.find())
    ,user: async(_parent:never, { email }:{email:String}) =>  await User.findOne({ email })
    ,measureUnits: async () => MeasureUnit.find().sort({ category: 1, name: 1 }) // Sort by category and then by name ascending (-1 is descending)
    ,taskCategories: async () => TaskCategory.find().sort({ name: 1 }) // Sort by name ascending (-1 is descending)
    ,completedTasks: async (_parent:never, { userId }:{userId:String}) => {
        const completed = await Completed.find({ user: new ObjectId(userId as string) });
        console.log(completed);
        const completedTaskIds = completed.map((task) => task.id);
        console.log(completedTaskIds);
        return Task.find({ id: { $in: completedTaskIds } });
    }
    ,notCompletedTasks: async (_parent:never, { userId }:{userId:String}) => {
        const completeds = await Completed.find({ userId, approved: true });
        const completedTaskIds = completeds.map((task) => task.id);
        return Task.find({ _id: { $nin: completedTaskIds } });
    }
}
