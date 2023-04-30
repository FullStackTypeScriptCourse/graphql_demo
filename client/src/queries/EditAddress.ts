import { gql } from '@apollo/client';

const UPDATE_ADDRESS = gql`
# Update a address
mutation UpdateAddress($updateId: ID!, $street:String!, $city:String!, $country:String!, $zip:String!) {
    updatePerson(id: $updateId, street:$street,city:$city,country:$country,zip:$zip) {
        street
        city
        country
        zip
    }
  }`;
export default UPDATE_ADDRESS;
