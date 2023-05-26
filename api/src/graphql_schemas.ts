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
  SPEED
}

enum TaskCategoryName {
  TRIGONOMETRI
  GEOMETRI
  MAENGDELAERE
  BROEKER
  PROCENTER
  LIGNINGER
  FUNKTIONER
  STATISTIK
  ALGEBRA
  TALTEORI
  LOGARITMER
  DIFFERENTIALLIGNINGER
  INTEGRALER
  VEKTORER
  MATRICER
  KOMBINATORIK
  SANDSYNLIGHEDSREGNING
  STOKASTIK
  ANALYSE
  GEOMETRI_3D
  SPEJLINGER
  AREAL
  RUMFANG
  OVERFLADEAREAL
  VALUTA
  DIVISION_MULTIPLIKATION
}

type MeasureUnit {
  id: ID!
  name: String!
  category: MeasureUnitCategory!
}

type TaskCategory {
  id: ID!
  #name: TaskCategoryName! # Could not use the graphql enum with dansih letters, so I had to use a string instead
  name: String!
}

type Task {
  id: ID!
  name: String!
  title: String!
  imageUrl: String!
  description: String!
  level: Int
  studyPoints: Int
  correctAnswer: Float
  # Comment: how to retrieve the measureUnit is described in resolvers/resolverTypes.ts
  measureUnit: MeasureUnit!
  category: TaskCategory!
}

type User {
  id: ID!
  username: String!
  email: String!
  password: String
  roles: [String!]!
}

type Student {
  id: ID!
  studentId: String
  class: Class!
  studyPoints: Int!
}

type Class {
  id: ID!
  name: String!
  level: Int
  students: [Student!]!
  assignments: [Assignment!]!
}

type Assignment {
  id: ID!
  class: Class!
  tasks: [Task!]!
  dueDate: Date!
}

type Completed {
  id: ID!
  date: Date!
  task: Task!
  user: User!
  approved: Boolean!
}

type Query {
  task(id: String!): Task
  tasks: [Task!]!
  user(email: String!): User
  users: [User!]!
  measureUnits: [MeasureUnit!]!
  taskCategories: [TaskCategory!]!
  completedTasks(studentId: String!): [Task!]!
  notCompletedTasks(studentId: String!): [Task!]!
  tasksByLevel(level: Int!): [Task!]!
  assignmentsByStudent(studentId: String!): [Assignment!]!
  studentsByClass(classId: String!): [Student!]!
  student: Student!
  class: Class!
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
  createTaskCategory(name: String!): TaskCategory!
  createClass(name: String!, level: Int): Class!
  createAssignment(classId: String!, taskId: String!, dueDate:Date): Assignment!
  createStudent(studentId: String!, classId: String!): Student!
  updateStudent(studentId: String!, classId: String!, studyPoints: Int!): Student!
  #assignUserToClass(email: String!, classId: String!): Class!
  #createAssignment(classId: String!, taskId: String!, dueDate:Date): Assignment!

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
  category: String!
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