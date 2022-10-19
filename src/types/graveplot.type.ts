export default interface IGravePlotData {
  id?: any | null;
  block: { id: string; name: string };
  lot: string;
  status: { id: string; name: string };
  southWest: [any, any];
  northEast: [any, any];
}
