import { BlockFactory } from "./Blocks";
import { ArrowFactory } from "./Arrows";

export type FabricCanvas = {
  logs: string[];
};

export class Chart {
  private canvas: FabricCanvas;
  private blockFactory: BlockFactory;
  private arrowFactory: ArrowFactory;

  constructor() {
    this.canvas = { logs: [] };
    this.blockFactory = new BlockFactory(this.canvas);
    this.arrowFactory = new ArrowFactory(this.canvas);
  }

  get blocks() {
    return this.blockFactory;
  }

  get arrows() {
    return this.arrowFactory;
  }
}
