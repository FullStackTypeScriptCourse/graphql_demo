const typeDefs = `#graphql

type Comment {
  body: String!
  email: String!
  author: String!
}

type Post {
id: ID!
body: String!
permalink: String!
author: String!
title: String!
tags: [String!]!
comments: [Comment!]!
date: String!
}

type Query {
  posts: [Post!]!
  posts_paginated1(page: Int!, limit: Int!): [Post!]!
  # posts_paginated2(page: Int!, limit: Int!, sort: PostSortParameters): [Post!]!
}

enum PostStateEnum {
  ID
  AUTHOR
  TITLE
  DATE
}

type PostSortParameters {
  field: PostStateEnum!
  asc: Boolean!
}
`;

export default typeDefs;