import { MeasureUnitCategory } from "./types"; // import the enum, BUT cannot be used in the graphql schema. So it has to be repeated in the schema.
const typeDefs = `#graphql 

enum MeasureUnitCategory {
  DISTANCE
  AREA
  VOLUME
  TIME
  TEMPERATURE
  WEIGHT
  ANGLE
}

type MeasureUnit {
  name: String!
  category: MeasureUnitCategory!
}

type Task {
  name: String!
  title: String!
  imageUrl: String!
  description: String!
  level: Int
  studyPoints: Int
  correctAnswer: Float
  # Comment: how to retrieve the measureUnit is described in resolvers/resolverTypes.ts
  measureUnit: MeasureUnit!
}

type User {
  username: String!
  email: String!
  password: String
  roles: [String!]!
}

type Completed {
  date: Date!
  task: Task!
  user: User!
  approved: Boolean!
}

type Query {
  task(id: String!): Task
  tasks: [Task!]!
  user(username: String!): User
  users: [User!]!
  measureUnits: [MeasureUnit!]!
  completedTasks(userId: String!): [Completed!]!
  tasksByLevel(level: Int!): [Task!]!
}

type Mutation {
  createTask(input: CreateTaskInput!): Task!
  updateTask(id: String!, input: UpdateTaskInput!): Task!
  deleteTask(id: String!): Task!
  createUser(input: CreateUserInput!): User!
  updateUser(email: String!, input: UpdateUserInput!): User!
  deleteUser(username: String!): User!
  completeTask(userId: String!, taskId: String!, answer:Float!, measureUnitId:String!): Completed!
  createMeasureUnit(name: String, category: MeasureUnitCategory): MeasureUnit!
}

input CreateTaskInput {
  name: String!
  title: String!
  imageUrl: String
  description: String
  level: Int
  studyPoints: Int
  correctAnswer: Float
  # proplem area here
  measureUnit: MeasureUnitInput!
}

input UpdateTaskInput {
  name: String
  title: String
  imageUrl: String
  description: String
  level: Int
  studyPoints: Int
  correctAnswer: Float
  measureUnit: MeasureUnitInput
}

input CreateUserInput {
  username: String!
  email: String!
  password: String!
}

input UpdateUserInput {
  username: String
  password: String
  roles: [String!]
}

input MeasureUnitInput {
  name: String!
  category: MeasureUnitCategory
}

scalar Date`;

export default typeDefs;