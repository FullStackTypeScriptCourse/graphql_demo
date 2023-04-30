import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';
import GET_ALL_PEOPLE from '../queries/GetAllPeople';

// type Props = {}
const GET_PEOPLE = gql`
  query GetPersons {
    persons {
      id
      name
      age
      address {
        id
        street
        city
        country
        zip
      }
    }
  }
`;
const GET_ADDRESSES = gql`
  query GetAllAddresses {
    addresses {
      id
      street
      city
      country
      zip
    }
  }
`;
const MOVE_ADDRESS = gql`
  mutation AddPersonToAddress($addressId: ID!, $personId: ID!) {
    addPersonToAddress(addressId: $addressId, personId: $personId)
  }
`;


export default function MoveAddress() {
  // Hooks
  const peopleQuery = useQuery(GET_PEOPLE);
  const addressQuery = useQuery(GET_ADDRESSES);
  const [movePersonMutation, moveStatus] = useMutation(MOVE_ADDRESS, {
    refetchQueries: [GET_ALL_PEOPLE]  
  });
  const [formState, setFormState] = React.useState({ personId: "", addressId: "" });

  if (peopleQuery.loading || addressQuery.loading) return (<div>Loading...</div>)

  const movePerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("movePerson", formState);
    movePersonMutation({ variables: { personId: formState.personId, addressId: formState.addressId } });
    moveStatus.error && console.log("movePersonMutation error", moveStatus.error);
  }

  return (
    <>
      <h2 className="flex items-center text-4xl  dark:text-white">MoveAddress</h2>
      <div className="mt-2"></div>
      <form onSubmit={movePerson}>
        <label htmlFor="personId" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
          Select a person
        </label>
        <select id="personId" onClick={(evt) => setFormState({ ...formState, [evt.currentTarget.id]: evt.currentTarget.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option key={0} value={0}>Choose a person</option>
          {peopleQuery.data.persons.map((person: any) => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
        <label htmlFor="addressId" className="block mt-2 mb-2 text-lg font-medium text-gray-900 dark:text-white">
          Select an address</label>
        <select id="addressId" onClick={(evt) => setFormState({ ...formState, [evt.currentTarget.id]: evt.currentTarget.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option key={0} value={0}>Choose an address</option>
          {addressQuery.data.addresses.map((address: any) => (
            <option key={address.id} value={address.id}>{address.street} in {address.city}</option>
          ))}
        </select>
        <button type="submit" className="mt-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">Move in</button>
      </form>
    </>

  )
}