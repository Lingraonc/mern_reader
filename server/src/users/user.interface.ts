interface User {
  _id?: string;
  nickname: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
}

export default User;
