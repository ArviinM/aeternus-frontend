export default interface IGravePlotData {
  id?: any | null;
  lot_address: string;
  status: { id: string; name: string };
  southWest: [any, any];
  northEast: [any, any];
}
