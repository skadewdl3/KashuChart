import { v4 as uuid } from "uuid";
import { FabricCanvas } from "./Chart";

export class BlockFactory {
  canvas: FabricCanvas;

  constructor(canvas: FabricCanvas) {
    this.canvas = canvas;
  }

  if() {}

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
