// Component to show the table view of tasks with delete and edit buttons
import { useState, Dispatch, SetStateAction } from 'react';
import { ITask, ICompleted, IMeasureUnit, IUser } from '../../../../api/src/types';
import TableRow from './TableRow';
type TaskTableProps = {
    data: ITask[],
    columns: string[],
    title: string,
    setTask: Dispatch<SetStateAction<ITask | undefined>>, // setTask is for updating a task in a form.
    deleteTask: (task:ITask)=>void// setTask is for updating a task in a form.
}
const TaskTable = ({columns, data, title, setTask, deleteTask}:TaskTableProps) => {
    return (
        <>
            <div className="m-2"></div>
            <div className="p-1.5 flex items-center justify-center h-screen">
                <div className="shadow-lg">
            <h2 className="text-4xl  dark:text-white">{title}</h2>
                <table className=" divide-y divide-gray-200">
                    <thead className="bg-orange-500">
                        <tr>
                        {columns.map((column, idx) => {
                            return (
                                <th scope="col" className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase " key={idx}>{column}</th>
                            )
                        })
                        }
                        </tr>
                    </thead >
                    <tbody>
                        {data.map((task: ITask, idx: number) => {
                            const style = idx % 2 === 0 ? `align-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap bg-orange-200` : `align-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap bg-orange-300`;
                            return (
                               <TableRow key={task.id} task={task} setTask={setTask} deleteTask={deleteTask} tdStyle={style} onClick={()=>alert("ROW CLICKED")}/>
                            )
                        })
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}
export default TaskTable;