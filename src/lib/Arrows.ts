import { FabricCanvas } from "./Chart";

export enum Direction {
  Up = "North",
  Down = "South",
  Right = "East",
  Left = "West",
  up = "North",
  down = "South",
  right = "East",
  left = "West",

  U = "North",
  D = "South",
  R = "East",
  L = "West",
  u = "North",
  d = "South",
  r = "East",
  l = "West",

  UpRight = "NorthEast",
  UpLeft = "NorthWest",
  DownRight = "SouthEast",
  DownLeft = "SouthWest",

  upRight = "NorthEast",
  upLeft = "NorthWest",
  downRight = "SouthEast",
  downLeft = "SouthWest",

  upright = "NorthEast",
  upleft = "NorthWest",
  downright = "SouthEast",
  downleft = "SouthWest",

  UR = "NorthEast",
  UL = "NorthWest",
  DR = "SouthEast",
  DL = "SouthWest",
  ur = "NorthEast",
  ul = "NorthWest",
  dr = "SouthEast",
  dl = "SouthWest",

  North = "North",
  South = "South",
  East = "East",
  West = "West",
  north = "North",
  south = "South",
  east = "East",
  west = "West",

  N = "North",
  S = "South",
  E = "East",
  W = "West",
  n = "North",
  s = "South",
  e = "East",
  w = "West",

  NorthEast = "NorthEast",
  NorthWest = "NorthWest",
  SouthEast = "SouthEast",
  SouthWest = "SouthWest",
  northEast = "NorthEast",
  northWest = "NorthWest",
  southEast = "SouthEast",
  southWest = "SouthWest",

  NE = "NorthEast",
  NW = "NorthWest",
  SE = "SouthEast",
  SW = "SouthWest",
  ne = "NorthEast",
  nw = "NorthWest",
  se = "SouthEast",
  sw = "SouthWest",

  // Angle = "Angle",
}

export class ArrowFactory {
  canvas: FabricCanvas;

  constructor(canvas: FabricCanvas) {
    this.canvas = canvas;
  }
}

export class Arrow {}
