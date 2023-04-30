import { gql } from '@apollo/client';

const MOVE_PERSON_IN = gql`
# Move Person to Address
mutation AddPersonToAddress($personId: ID!, $addressId: ID!){
    addPersonToAddress(personId: $personId, addressId: $addressId)
}`; 

const MOVE_PERSON_OUT = gql`
# Move Person to Address
mutation RemovePersonFromAddress($personId: ID!, $addressId: ID!){
    removePersonFromAddress(personId: $personId, addressId: $addressId)
}`; 

export { MOVE_PERSON_IN, MOVE_PERSON_OUT}