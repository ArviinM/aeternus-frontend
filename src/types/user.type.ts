export default interface IUser {
  id?: any | null;
  first_name: string;
  last_name: string;
  username: string;
  address: string;
  contact_no: string;
  email: string;
  password: string;
  roles?: Array<string>;
}
