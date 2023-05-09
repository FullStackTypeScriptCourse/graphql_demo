import { Document, Model } from 'mongoose';

interface ITask {
    id: string;
    name: string;
    title: string;
    imageUrl: string;
    description: string;
    level: number;
    studyPoints: number;
    correctAnswer: number;
    measureUnit: IMeasureUnit;
}

enum MeasureUnitCategory {
    DISTANCE,
    AREA,
    VOLUME,
    TIME,
    TEMPERATURE,
    WEIGHT,
    ANGLE
}

interface IMeasureUnit {
    id: string;
    name: string;
    category: MeasureUnitCategory;
}

interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    roles: string[];
}

interface ICompleted {
    id: string;
    date: Date;
    task: ITask;
    user: IUser;
    approved: boolean;
}

interface ITaskModel extends Model<ITaskDoc> { }
interface IMeasureUnitModel extends Model<IMeasureUnitDoc> { }
interface IUserModel extends Model<IUserDoc> { }
interface ICompletedModel extends Model<ICompletedDoc> { }

interface ITaskDoc extends Document, Omit<ITask, 'id' | 'measureUnit'> {
    measureUnit: IMeasureUnit['id'];
}

interface IMeasureUnitDoc extends Document, Omit<IMeasureUnit, 'id'> { }

interface IUserDoc extends Document, Omit<IUser, 'id'> { }

interface ICompletedDoc extends Document, Omit<ICompleted, 'id' | 'task' | 'user'> {
    task: ITask['id'];
    user: IUser['id'];
}

// interface AddressTypeDocument extends AddressType, Document {} // Extend both the Typescript type and the Mongoose Document type to get access to both sets of properties.

export {
    ITask,
    IMeasureUnit,
    IUser,
    ICompleted,
    ITaskModel,
    IMeasureUnitModel,
    IUserModel,
    ICompletedModel,
    ITaskDoc,
    IMeasureUnitDoc,
    IUserDoc,
    ICompletedDoc,
    MeasureUnitCategory
};