import { useState } from 'react';

// apollo client
import { useMutation } from '@apollo/client';
import GET_ALL_PEOPLE from '../queries/GetAllPeople';
import CREATE_PERSON from '../queries/CreatePerson';
import { Person } from '../types';

const PersonForm = () => {
    const [person, setPerson] = useState<Person>({ name: '', age: 0 });
    
    
    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_PERSON,{
        refetchQueries: [GET_ALL_PEOPLE]
    }); //mutateFunction is the function to call for server update. refetchQueries is the list of queries to refetch after the mutation is done. And if they were used with useQuery, they will be updated with the new data.
    if (loading) return <>'Submitting...'</>;
    if (error) return <>`Submission error! ${error.message}`</>;

    const createPerson = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutateFunction({variables: person}); 
    }

    return (
            <>
            <h2 className="flex justify-center pt-5">Create a new Person</h2>
        <div className="p-1.5 flex items-center justify-center h-screen">
            <form className="max-w-sm" onSubmit={createPerson}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className=" md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Name
                        </label>
                        <input name="name" onChange={(evt)=>setPerson({...person,name:evt.target.value})} className="appearance-none block  bg-gray-50 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name" />
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Age
                        </label>
                        <input onChange={(evt)=>setPerson({...person,age:parseInt(evt.target.value)})} className="appearance-none block  bg-gray-50 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Age" />
                        <input className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit" value="Submit" />
                    </div>
                    </div>
                    </form>
                 </div>
            </>
    )
}
export default PersonForm;