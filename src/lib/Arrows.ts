import { FabricCanvas } from "./Chart";

export enum ArrowDirection {
  Up = "North",
  Down = "South",
  Right = "East",
  Left = "West",
  U = "North",
  D = "South",
  R = "East",
  L = "West",

  UpRight = "NorthEast",
  UpLeft = "NorthWest",
  DownRight = "SouthEast",
  DownLeft = "SouthWest",
  UR = "NorthEast",
  UL = "NorthWest",
  DR = "SouthEast",
  DL = "SouthWest",

  North = "North",
  South = "South",
  East = "East",
  West = "West",
  N = "North",
  S = "South",
  E = "East",
  W = "West",

  NorthEast = "NorthEast",
  NorthWest = "NorthWest",
  SouthEast = "SouthEast",
  SouthWest = "SouthWest",
  NE = "NorthEast",
  NW = "NorthWest",
  SE = "SouthEast",
  SW = "SouthWest",

  Angle = "Angle",
}

export class ArrowFactory {
  canvas: FabricCanvas;

  constructor(canvas: FabricCanvas) {
    this.canvas = canvas;
  }
}

export class Arrow {}
