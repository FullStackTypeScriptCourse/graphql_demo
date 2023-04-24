import { useState } from 'react';

// apollo client
import { useQuery, useMutation } from '@apollo/client';
import GET_ALL_PEOPLE from '../queries/GetAllPeople';
import { Person } from '../types';

const PersonTable = () => {
    const [people, setPeople] = useState<Person[]>([{ id: '', name: '', age: 0 }]);

    const deletePerson = (id:String) => {
        console.log('deletePerson', id);
    }
    const editPerson = (id:String) => {
        console.log('editPerson', id);
    }

    // const [mutateFunction, { data, loading, error }] = useMutation(CREATE_PERSON,{
    //     refetchQueries: [GET_ALL_PEOPLE]
    // }); //mutateFunction is the function to call for server update. refetchQueries is the list of queries to refetch after the mutation is done. And if they were used with useQuery, they will be updated with the new data.
    // if (loading) return <>'Submitting...'</>;
    // if (error) return <>`Submission error! ${error.message}`</>;


    const { loading, error, data } = useQuery(GET_ALL_PEOPLE
        // , { variables: { id: category.id}, }
    );

    if (loading) return <p>Loading ...</p>;

    return (
        <>
            <h2 className="flex justify-center pt-5">Show People From Mongo</h2>
            <div className="p-1.5 flex items-center justify-center h-screen">
                <table className=" divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase "
                            >Name</th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase "
                            >Age</th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase "
                            ></th>
                        </tr>
                    </thead >
                    <tbody>
                        {data.persons.map((person: Person, idx: number) => {
                            const style = idx % 2 === 0 ? `align-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap` : `align-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap bg-gray-50`;
                            return (
                                <tr key={person.id}>
                                    <td className={style}>{person.name}</td>
                                    <td className={style}>{person.age}</td>
                                    <td className={style}><button onClick={
                                        ()=>deletePerson(person.id)
                                    }>Delete</button> / <button onClick={
                                        ()=>editPerson(person.id)
                                    }>Edit</button></td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default PersonTable;