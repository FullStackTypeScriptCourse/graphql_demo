import { gql } from '@apollo/client';
const GET_ADDRESSES = gql`
query GetAllAddresses {
  addresses {
    id
    street
    city
    state
    zip
    person {
        id
        name
        age
    }
  }
}
`;
export default GET_ADDRESSES;