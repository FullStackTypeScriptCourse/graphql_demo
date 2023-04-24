import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import GET_ALL_PEOPLE from '../queries/GetAllPeople';
import { Person } from '../types';
import DELETE_PERSON from "../queries/DeletePerson";
import GET_PERSONS from "../queries/GetAllPeople";

const PersonTable = ({setPerson}:{setPerson:(person:Person)=>void}) => {
    const { loading, error, data } = useQuery(GET_ALL_PEOPLE);

    if (loading) return <p>Loading ...</p>;

    return (
        <>
            {error && <p>Error: ${error.message}</p>}
            <h2 className="flex items-center text-4xl  dark:text-white">Show People From Mongo</h2>
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
                               <PersonTableRow key={person.id} person={person} setPerson={setPerson} style={style} />
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
type RowProps = {
    person: Person,
    style: string,
    setPerson: (person: Person) => void,
}

const PersonTableRow = ({ person, setPerson, style }: RowProps) => {
    const [deletePerson, deletePersonData] = useMutation(DELETE_PERSON,{
        refetchQueries: [GET_PERSONS]
    });
    if(deletePersonData.loading) return (<p>Deleting...</p>)
    if(deletePersonData.error) return (<p>Error: {deletePersonData.error.message}</p>)
    
    return (
        <tr key={person.id}>
            <td className={style}>{person.name}</td>
            <td className={style}>{person.age}</td>
            <td className={style}><button onClick={
                () => deletePerson({variables: { id: person.id }})
            }>Delete</button> / <button onClick={
                () => setPerson(person)
            }>Edit</button></td>
        </tr>
    );
}
export default PersonTable;