export default interface IDeceasedData {
  id?: any | null;
  first_name: string;
  middle_name: string;
  last_name: string;
  profile_picture: any;
  birth_date: any;
  death_date: any;
  obituary: string;
  grave_plot: {
    _id: string;
    block: { id: string; name: string };
    lot: string;
    status: { id: string; name: string };
    southWest: [any, any];
    northEast: [any, any];
    lot_owner: {
      id?: any | null;
      first_name: string;
      last_name: string;
      username: string;
      contact_no: string;
      address: string;
      email: string;
    };
  };
}
