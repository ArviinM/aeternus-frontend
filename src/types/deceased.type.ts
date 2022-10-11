export default interface IDeceasedData {
  id?: any | null;
  first_name: string;
  middle_name: string;
  last_name: string;
  profile_picture: any;
  birth_date: any;
  death_date: any;
  obituary: string;
  grave_plot: { _id: string; lot_address: string };
}
