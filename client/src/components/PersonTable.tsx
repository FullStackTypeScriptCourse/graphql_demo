import { useState } from 'react';

// apollo client
import { useQuery } from '@apollo/client';
import GetPersons from '../queries/GetAllPeople';
import { Person } from '../types';

const PersonTable = () => {
    const [people, setPeople] = useState<Person[]>([{ id: '', name: '', age: 0 }]);


    const { loading, error, data } = useQuery(GetPersons
        // , { variables: { id: category.id}, }
    );

    if (loading) return <p>Loading ...</p>;

    return (
                <div className="p-1.5 flex items-center justify-center h-screen">
                        <table className=" divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >Name</th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >Age</th>
                                </tr>
                            </thead >
                            <tbody>
                                {data.persons.map((person: Person, idx: number) => {
                                    const style = idx % 2 === 0 ? `align-center px-8 py-4 text-sm text-gray-800 whitespace-nowrap` : `align-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap bg-gray-50`;
                                    return (
                                        <tr key={person.id}>
                                            <td className={style}>{person.name}</td>
                                            <td className={style}>{person.age}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                 </div>
    )
}
export default PersonTable;