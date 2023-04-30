import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import GET_ALL_PEOPLE from '../queries/GetAllPeople';
import { Person } from '../types';
import DELETE_PERSON from "../queries/DeletePerson";
import { MOVE_PERSON_OUT } from '../queries/MovePerson';
import GET_PERSONS from "../queries/GetAllPeople";

const PersonTable = ({setPerson, setShowForm}:{setPerson:(person:Person)=>void, setShowForm:(input:String)=>void}) => {
    const { loading, error, data } = useQuery(GET_ALL_PEOPLE);

    if (loading) return <p>Loading ...</p>;

    
    return (
        <>
        
            {error && <p>Error: ${error.message}</p>}
            <h2 className="flex items-center text-4xl  dark:text-white">Show People From Mongo</h2>
            <div className="m-2"></div>
            <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 dark:focus:text-white" onClick={()=>setShowForm('Person')}>Create New Person</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 dark:focus:text-white" onClick={()=>setShowForm('Address')}>Create New Address</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 dark:focus:text-white" onClick={()=>setShowForm('MoveAddress')}>Move Person</button>
            <div className="p-1.5 flex items-center justify-center h-screen">
                <div className="shadow-lg">
                <table className=" divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase " >Name</th>
                            <th scope="col" className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase " >Age</th>
                            <th scope="col" className="px-6 py-3 text-s font-bold text-left text-gray-500 uppercase " ></th>
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
    const [movePersonOut, movePersonOutData] = useMutation(MOVE_PERSON_OUT,{
        refetchQueries: [GET_PERSONS]
    });

    if(deletePersonData.loading) return (<p>Deleting...</p>)
    if(deletePersonData.error) return (<p>Error: {deletePersonData.error.message}</p>)
    
    const moveOut = (id: string) => {
        console.log(id);
        movePersonOut({variables: { personId: person.id, addressId: person.address?.id }})
        movePersonOutData.error?
        console.log('ERROR: ', movePersonOutData.error):
        console.log('SUCCESS: ', movePersonOutData.data);
    }

    return (
        <tr key={person.id}>
            <td className={style} title={person.address?person.address.street+', '+person.address.city:'This Person has no address. Try and hover one of the other persons'}>{person.name}</td>
            <td className={style}>{person.age}</td>
            <td className={style}><button onClick={
                () => deletePerson({variables: { id: person.id }})
            }>Delete</button> / <button onClick={
                () => setPerson(person)
            }>Edit</button> / <button onClick={
                () => moveOut(person.id!)
            }>Move Out</button>
            </td>
        </tr>
    );
}
export default PersonTable;