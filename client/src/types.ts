type Role = "user" | "admin";
interface User {
  username: string;
  email: string;
  roleList: Role[];
}
enum Category {
  DISTANCE,
  AREA,
  VOLUME,
  TIME,
  TEMPERATURE,
  WEIGHT,
  ANGLE,
  SPEED,
}

interface NewUser extends User {
  userPass: string;
  confirmPass: string;
}
interface MeasureUnit {
  name: string;
  category: Category;
}

interface Task {
  title: string;
  description: string;
  correctAnswer: number;
  studyPoints: number;
  level: number;
  measureUnit: MeasureUnit;
  imageUrl: string;
  name: string;
}

const emptyUser: NewUser = {
  roleList: [],
  username: '',
  email: '',
  userPass: '',
  confirmPass: ''
};

const emptyTask: Task = {
  title: '',
  description: '',
  correctAnswer: 0,
  studyPoints: 0,
  level: 0,
  measureUnit: {
    name: '',
    category: Category.DISTANCE
  },
  imageUrl: '',
  name: ''
};

export { emptyUser, emptyTask, type NewUser, type User, type Role, type Task, type MeasureUnit, type Category };