import { useState } from 'react';

// apollo client
import { useMutation } from '@apollo/client';
import GET_ALL_PEOPLE from '../queries/GetAllPeople';
import CREATE_PERSON from '../queries/CreatePerson';
import UPDATE_PERSON from '../queries/EditPerson';
import { Person } from '../types';

const PersonForm = ({person, setPerson}: { person: Person, setPerson:(person:Person)=>void }) => {
    const [errorMsg, setError] = useState('');
    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_PERSON, {
        refetchQueries: [GET_ALL_PEOPLE]
    }); //mutateFunction is the function to call for server update. refetchQueries is the list of queries to refetch after the mutation is done. And if they were used with useQuery, they will be updated with the new data.
    const [updatePerson, updatePersonData] = useMutation(UPDATE_PERSON,{
        refetchQueries: [GET_ALL_PEOPLE]
    }); 
    if (loading || updatePersonData.loading) return <>'Submitting...'</>;
    if (error || updatePersonData.error) return <>`Submission error! ${error?error.message:updatePersonData.error}`</>;

    const createPerson = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!person.name || !person.age){
            setError('Please fill in all fields'); 
            return;
        }
        mutateFunction({ variables: person });
        setPerson({name:"",age:0})
        setError('');
    }

    const editPerson = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!person.name || !person.age){
            setError('Please fill in all fields');
            return;
        }
        updatePerson({ variables: {updateId:person.id, name:person.name, age:person.age} });
        setPerson({name:"",age:0});
        setError('');
    }
        

    return (
        <>
            <h2 className="flex items-center text-4xl  dark:text-white">Create a new Person</h2>

            <div className="p-1.5 flex items-center justify-center h-screen">
                {/* FORM */}
                <form className="max-w-sm" onSubmit={
                    person.id?editPerson:createPerson
                }>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Name
                            </label>
                            {/* INPUT FIELD  */}
                            <input name="name" value={person.name} onChange={(evt) => setPerson({ ...person, name: evt.target.value })} className="appearance-none block  bg-gray-50 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name" />

                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Age
                            </label>
                            {/* INPUT FIELD  */}
                            <input value={person.age?person.age:""} onChange={(evt) => setPerson({ ...person, age: parseInt(evt.target.value) })} className="appearance-none block  bg-gray-50 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Age" />

                            <h2 className="text-red-400">{errorMsg}</h2>
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                            <input type="submit" value="Submit" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" />
                            <button onClick={(evt) => {evt.preventDefault(); setPerson({ name: '', age: 0 });}} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">Reset</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default PersonForm;