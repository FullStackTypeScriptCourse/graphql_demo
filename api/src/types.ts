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
    category: ITaskCategory;
}

enum MeasureUnitCategory {
    AFSTAND,
    AREAL,
    RUMFANG,
    TID,
    TEMPERATUR,
    VÆGT,
    VINKEL_GRAD,
    HASTIGHED,
}

enum TaskCategoryType {
    TRIGONOMETRI,
    GEOMETRI,
    MÆNGDELÆRE,
    BRØKER,
    PROCENTER,
    LIGNINGER,
    FUNKTIONER,
    STATISTIK,
    ALGEBRA,
    TALTEORI,
    LOGARITMER,
    DIFFERENTIALLIGNINGER,
    INTEGRALER,
    VEKTORER,
    MATRICER,
    KOMBINATORIK,
    SANDSYNLIGHEDSREGNING,
    STOKASTIK,
    ANALYSE,
    GEOMETRI_3D,
    SPEJLINGER,
    AREAL,
    RUMFANG,
    OVERFLADEAREAL,
    VALUTA,
    DIVISION_MULTIPLIKATION,
}

interface IMeasureUnit {
    id: string;
    name: string;
    category: MeasureUnitCategory;
}

interface ITaskCategory {
    id: string;
    name: string;
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
    MeasureUnitCategory,
    TaskCategoryType
};