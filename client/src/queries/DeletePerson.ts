import { gql } from '@apollo/client';
// Define mutation
const DELETE_PERSON = gql`
  # Delete a person 
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id)
  }`;
export default DELETE_PERSON;