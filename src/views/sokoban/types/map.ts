export enum EmapType {
  Border = 'Border',
  Ball = 'Ball',
  Player = 'Player',
  Empty = 'Empty',
}

export interface IMapItemContent {
  x: number
  y: number
  type: EmapType
}
