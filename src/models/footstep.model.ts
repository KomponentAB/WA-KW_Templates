export enum MaterialType {
  wood = "wood",
  forest = "forest",
  snow = "snow",
  marble = "marble",
  stone = "stone",
  mud = "mud",
  path = "path",
  water = "water",
  sand = "sand",
  ice = "ice"
}

export interface SoundArea {
  name: string;
  y: number;
  x: number;
  width?: number;
  height?: number;
  material?: MaterialType;
}
