import { v4 as uuid } from "uuid";
import { FabricCanvas } from "./Chart";

export enum BlockType {
  Condition = "cond",
  Store = "store",
  Switch = "switch",
  Node = "node",
  Gate = "gate",
  Math = "math",
  Flag = "flag",
  Goto = "goto",
  Stop = "stop",
  Start = "start",
  Reset = "reset",
  Ui = "ui",
}

export const blockTypes: string[] = Object.values(BlockType);

export class BlockFactory {
  canvas: FabricCanvas;

  constructor(canvas: FabricCanvas) {
    this.canvas = canvas;
  }

  cond() {}

  store() {}

  switch() {}

  node() {}

  gate() {}

  math() {}

  flag() {}

  goto() {}

  stop() {}

  start() {}

  reset() {}

  ui() {}

  // subchart () {}
}

export class Block {
  id: string;

  constructor(id = uuid()) {
    this.id = id;
  }
}
