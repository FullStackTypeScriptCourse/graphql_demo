import { gql } from '@apollo/client';
// Define mutation
const CREATE_PERSON = gql`
  # Create a new person
  mutation CreatePerson($name: String!, $age:Int!) {
    createPerson(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;
export default CREATE_PERSON;