type Role = "user" | "admin";
interface User {
  username: string;
  email: string;
  roleList: Role[];
}

interface NewUser extends User {
  userPass: string;
  confirmPass: string;
}

const emptyUser: NewUser = {
  roleList: [],
  username: '',
  email: '',
  userPass: '',
  confirmPass: ''
};


export { emptyUser, type NewUser, type User, type Role };