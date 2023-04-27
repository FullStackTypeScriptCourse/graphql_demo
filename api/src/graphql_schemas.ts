const typeDefs = `#graphql

type Address {
  id: ID!
  street: String!
  city: String!
  country: String!
  zip: String!
  persons: [Person!]! 
}

type Person {
  id: ID!
  name: String!
  age: Int!
  address: Address
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    persons: [Person!]!
    person(id: ID): Person
    address(id: ID): Address
    addresses: [Address!]!
  }

  type Mutation {
    createPerson(name: String!, age: Int!): Person
    updatePerson(id: ID!, name: String!, age: Int!): Person
    deletePerson(id: ID!): Boolean
    createAddress(street: String!, city: String!, country: String!, zip: String!): Address
    removePersonFromAddress(personId: ID!, addressId: ID!): Boolean
    addPersonToAddress(personId: ID!, addressId: ID!): Boolean
  }
`;

export default typeDefs;