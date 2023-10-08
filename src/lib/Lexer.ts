import { Direction } from "./Arrows";

enum TokenType {
  If,
  Store,
  Switch,
  Node,
  Gate,
  Math,
  Flag,
  Goto,
  Stop,
  Start,
  Reset,
  Ui,
}

enum State {
  ExpectingVariable, // if = ...
  ExpectingBlock, // if (...)
  ExpectingText, // (Hello World)
  ExpectingProps, // {key: value, key: value}
  ExpectingJoin, // join {}
  ExpectingConnection, // -> is a connection
  ExpectingModifier, // if.yes is a modifier
}

type TokenProps = {
  [key: string]: string | number | boolean | Direction;
};

type Token = {
  type: TokenType;
  text: string;
  props: TokenProps;
  name: string;
};

export default class Lexer {
  code: string[];
  state: State = State.ExpectingVariable;

  constructor(code: string) {
    this.code = code.split("\n");
  }

  lex(): Token[] {
    return [];
  }
}
