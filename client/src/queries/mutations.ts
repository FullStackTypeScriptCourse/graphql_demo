import { gql } from '@apollo/client';
// createTask(input: CreateTaskInput!): Task!
// updateTask(id: String!, input: UpdateTaskInput!): Task!
// deleteTask(id: String!): Task!
// createUser(input: CreateUserInput!): User!
// updateUser(email: String!, input: UpdateUserInput!): User!
// deleteUser(username: String!): User!
// completeTask(userId: String!, taskId: String!, answer:Float!, measureUnitId:String!): Completed!

const CREATE_TASK = gql`
 mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
        id
        name
        title
        imageUrl
        description
        level
        studyPoints
        correctAnswer
        measureUnit {
            name
            category
        }
    }
    }   
`;
const UPDATE_TASK = gql`
    mutation UpdateTask($id: String!, $input: UpdateTaskInput!) {
        updateTask(id: $id, input: $input) {
            id
            name
            title
            imageUrl
            description
            level
            studyPoints
            correctAnswer
            measureUnit {
                name
                category
            }
        }
    }
`;
const DELETE_TASK = gql`
    mutation DeleteTask($id: String!) {
        deleteTask(id: $id) {
            id
            name
            title
            imageUrl
            description
            level
            studyPoints
            correctAnswer
            measureUnit {
                name
                category
            }
        }
    }
`;
const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            username
            email
        }
    }
`;
const UPDATE_USER = gql`
    mutation UpdateUser($email: String!, $input: UpdateUserInput!) {
        updateUser(email: $email, input: $input) {
            username
            email
            roles
        }
    }
`;
const DELETE_USER = gql`
    mutation DeleteUser($username: String!) { 
        deleteUser(username: $username) { 
            email 
        } 
    }
`;
const COMPLETE_TASK = gql`
    mutation CompleteTask($userId: String!, $taskId: String!, $answer: Float!, $measureUnitId: String!) { 
        completeTask(userId: $userId, taskId: $taskId, answer: $answer, measureUnitId: $measureUnitId) { 
            approved date 
        } 
    } 
`;
export { CREATE_TASK, UPDATE_TASK, DELETE_TASK, CREATE_USER, UPDATE_USER, DELETE_USER, COMPLETE_TASK};