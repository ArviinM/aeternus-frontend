export default interface IUser {
  id?: any | null;
  first_name: string;
  last_name: string;
  username: string;
  address: string;
  contact_no: string;
  email: string;
  password: string;
  newPassword?: string;
  roles?: Array<string>;
  grave_name?: [];
  grave_plot2?: [
    {
      id?: any | null;
      name: string;
    }
  ];
  grave_block?: string;
  grave_lot?: string;
  grave_plot: {
    id?: any | null;
    block: { id: string; name: Array<string> };
    lot: Array<string>;
  };
}
