import { useState, useEffect } from 'react'
import './App.css'
// https://www.apollographql.com/docs/react/get-started
import { GET_TASKS } from './queries/queries';
import { DELETE_TASK } from './queries/mutations';
import { useQuery, useMutation } from '@apollo/client';
import TaskTable from './components/admin/TaskTableView';
import { ITask, ICompleted, IMeasureUnit, IUser } from '../../../../api/src/types';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import BaseLayout from './components/BaseLayout';
import Registration from './components/Registration';
import Login from './components/Login';
import Modal from './components/basic/Modal';
import GuardedRoute from './components/global/GuardedRoute';
import Admin from './pages/AdminPage';
import TaskForm from './components/admin/TaskForm';

const App = () => {
  const [task, setTask] = useState<ITask>({ id: "", level: "", title: "", studyPoints: 0 }); // task is for updating a task in a form.
  const [showModal, setShowModal] = useState<boolean>(false);
  const getTasksQuery = useQuery(GET_TASKS);
  const [deleteTask, deleteTaskData] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_TASKS],
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  if (getTasksQuery.loading) return <p>Loading ...</p>;

  return (
    <>
      <div className="flex justify-center flex-col">
        <BaseLayout>
          <Routes>
            <Route path="/" element={<Header toggleModal={toggleModal} />}>
              <Route path="/" element={
                <NonComponent name="ROOT" />
              } />
              {/* Admin routes */}
              <Route path="/admin" element={
                <GuardedRoute allowedRoles={['admin']} />
              } >
                <Route index element={<Admin />} />
                <Route path="/admin/create/user" element={
                  <NonComponent name="Admin: Create User" />
                } />
                <Route path="/admin/create/task" element={
                  <TaskForm />
                } />
                <Route path="/admin/view/users" element={
                  <NonComponent name="Admin: view users" />
                } />
                <Route path="/admin/view/tasks" element={
                  <TaskTable data={getTasksQuery.data.tasks} 
                  columns={["Level", "Title", "Study Points", "Operations"]} 
                  title="Show all tasks" 
                  setTask={setTask} deleteTask={deleteTask} />
                } />
              </Route>
              {/* End of admin routes */}
              {/* User routes */}
              <Route path="/user" element={
                <GuardedRoute allowedRoles={['user']} />
              } >
                <Route index element={
                  <NonComponent name="User: View own progress" />
                } />
              </Route>
              {/* End of protected user routes */}
              <Route path="/user/view/tasks" element={
                <NonComponent name="User view accessible tasks" />
              } />
              <Route path="/user/submit/task" element={
                <NonComponent name="User: Submit task" />
              } />
              <Route path="/user/login" element={
                <Modal show={showModal} toggle={toggleModal}>
                  <Login toggleModal={toggleModal} />
                  {/* <Registration toggleRegistration={toggleRegistration}/> */}
                </Modal>
              } />
              <Route path="/user/registration" element={
                <Modal show={showModal} toggle={toggleModal}>
                  <Registration toggleModal={toggleModal} />
                </Modal>
              } />
            </Route>

            {getTasksQuery.error && <p>Error: ${getTasksQuery.error.message}</p>}
          </Routes>
        </BaseLayout>
      </div>
    </>
  )
}
const NonComponent = ({ name }: { name: string }) => {
  return (
    <div>
      <h1>Not yet implemented: {name}</h1>
    </div>
  )
}

export default App
