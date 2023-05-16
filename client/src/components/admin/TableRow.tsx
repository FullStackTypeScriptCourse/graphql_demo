import { useQuery, useMutation } from '@apollo/client';
import React, { MouseEventHandler } from 'react';
import { ITask } from '../../../../api/src/types';
import {GET_TASKS, } from "../../queries/queries";
import {DELETE_TASK, } from "../../queries/mutations";
import StyleButton from '../StyleButton';
interface RowProps {
    task: ITask,
    tdStyle: string,
    setTask: React.Dispatch<React.SetStateAction<ITask | undefined>>, // setTask is for updating a task in a form.
    deleteTask: (task:ITask)=>void,
    onClick: MouseEventHandler<HTMLTableCellElement>
}

const TableRow = ({ task, setTask, tdStyle, deleteTask, onClick}: RowProps) => {
    // const [deleteTask, deleteTaskData] = useMutation(DELETE_TASK,{
    //     refetchQueries: [GET_TASKS]
    // });

    // if(deleteTaskData.loading) return (<p>Deleting...</p>)
    // if(deleteTaskData.error) return (<p>Error: {deleteTaskData.error.message}</p>)
    
    return (
        <tr key={task.id}>
            <td className={tdStyle} >{task.level}</td>
            <td className={tdStyle} onClick={onClick}>{task.title}</td>
            <td className={tdStyle}>{task.studyPoints}</td>
            <td className={tdStyle}>
             <StyleButton 
             style="bg-transparent hover:bg-gray-300 text-gray-700 hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" 
             value="Delete" 
             onClick={
                // () => deleteTask({variables: { id: task.id }})
                () => alert("delete")
            }/>
             {" "} 
             <StyleButton 
             style="bg-transparent hover:bg-gray-300 text-gray-700 hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" 
             value="Edit" 
             onClick={
                () => alert("edit")
            } />  
            </td>
        </tr>
    );
}
export default TableRow;