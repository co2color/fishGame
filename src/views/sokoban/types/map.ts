export enum EmapType {
  Border,
  Content,
}

export interface IMapItemContent {
  x: number
  y: number
  type: EmapType
}
