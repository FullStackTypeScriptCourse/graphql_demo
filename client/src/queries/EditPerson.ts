import { gql } from '@apollo/client';

const UPDATE_PERSON = gql`
# Update a person
mutation UpdatePerson($updateId: ID!, $name:String!, $age:Int!) {
    updatePerson(id: $updateId, name:$name, age:$age) {
      id
      name
      age
      address {
        id
        street
        city
        zip
        country
      }
    }
  }`;
export default UPDATE_PERSON;
