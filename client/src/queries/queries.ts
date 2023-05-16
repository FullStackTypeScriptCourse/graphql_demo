import { gql } from '@apollo/client';
const GET_TASKS = gql`
query Tasks {
    tasks {
        id
        title
        level
        studyPoints
    }
  }
`;
const GET_TASK = gql`
query Task($taskId: String!) {
    task(id: $taskId) {
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
const GET_USERS = gql`
query Users {
    users {
      username
      email
      password
      roles
    }
  }
`;
const GET_USER = gql`
query User($email: String!) {
    user(email: $email) {
      username
      email
      roles
      id
    }
  }
`;
const GET_MEASURE_UNITS = gql`
query MeasureUnits {
    measureUnits {
      name
      category
    }
  }
`;
const GET_COMPLETED_TASKS = gql`
query CompletedTasks($userId: String!) {
    completedTasks(userId: $userId) {
        id
        task {
            id
            title
            measureUnit {
                name
            }
        }
        answer
        measureUnit {
            name
        }
    }
}
`;
const GET_NOT_COMPLETED_TASKS = gql`
query ($userId: String!) {
    notCompletedTasks(userId: $userId) {
        id
        task {
            id
            title
            measureUnit {
                name
            }
        }
        answer
        measureUnit {
            name
        }
    }
}
`;
const GET_TASKS_BY_LEVEL = gql`
query TasksByLevel($level: Int!) {
    tasksByLevel(level: $level) {
        id
        title
        measureUnit {
            name
        }
    }
}
`;
export  {GET_TASKS, GET_TASK, GET_USERS, GET_USER, GET_MEASURE_UNITS, GET_COMPLETED_TASKS, GET_NOT_COMPLETED_TASKS, GET_TASKS_BY_LEVEL};