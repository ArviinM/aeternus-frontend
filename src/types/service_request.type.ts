export default interface IUserServiceRequest {
  id?: any | null;
  service: Array<string>;
  user: { id: string; username: string };
  request: { id: string; name: string };
  graveplot: { id: string; block: { id: string; name: string }; lot: string };
}
