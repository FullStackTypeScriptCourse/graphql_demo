import { resolve } from "path";
import {Task, User, MeasureUnit, Completed} from "../models/allmodels";
import {IUser} from "../types";
import { authenticate } from "../utils";

export default {
    tasks: async (_parent:never, _args: never, _context:never, _info:never) => await Task.find()//.populate('measureUnit').sort({ level: 1, name: 1 }).lean(), // Sort by level and then by name ascending (-1 is descending)
    ,tasksByLevel: async (_parent:never, { level }:{level:number}) => await Task.find({ level })
    ,task: async (_parent:never, { id }:{id:string}) => await Task.findById(id)
    ,users: authenticate('admin', async (_parent:never, { email }:{email:String}) => await User.find())
    ,user: async(_parent:never, { email }:{email:String}) => await User.find({ email })
    ,measureUnits: async () => MeasureUnit.find().sort({ category: 1, name: 1 }) // Sort by category and then by name ascending (-1 is descending)
    ,completedTasks: async (_parent:never, { userId }:{userId:String}) => Completed.find({ userId })
}
