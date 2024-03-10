export enum EmapType {
  Border,
  Box,
  Player,
  Empty,
}

export interface IMapItemContent {
  x: number
  y: number
  type: EmapType
}
