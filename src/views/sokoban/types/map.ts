export enum EmapType {
  Border = 'Border',
  Ball = 'Ball',
  Player = 'Player',
  Empty = 'Empty',
  Target = 'Target',
}

export interface IMapItemContent {
  x: number
  y: number
  type: EmapType
}
