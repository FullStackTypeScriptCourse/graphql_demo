import { ITaskDoc } from '../types';
// GraphQL Resolver Types: Task with MeasureUnit
const Task = {
    measureUnit: async (task: ITaskDoc, _args: any, _context: any, _info: any) => {
        const measureUnitTask = await task.populate('measureUnit');
        return measureUnitTask.measureUnit;
    }
};
export {Task}
