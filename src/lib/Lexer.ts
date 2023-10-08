import { Direction } from "./Arrows";
import { blockTypes, BlockType } from "./Blocks";
// import isVarName from "is-var-name";

const isValidVarName = (str = "") => {
  if (!str) return false;
  if (!str.trim()) return false;
  if (blockTypes.includes(str)) return false;
  let matches = str.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/);
  return matches != null && matches.length != 0;
};

export const customSplit = (
  str: string,
  splitAt: string,
  startDelimiter = "(",
  endDelimiter = ")"
) => {
  // Write a function that split str at the splitAt character
  // but not if the splitAt character occurs between startDelimiter and endDelimiter
  // Code is:
  str = str.concat("\n");
  let stack = [startDelimiter];
  let current = "";
  let result = [];
  let i = 0;
  while (true && i < str.length - 1) {
    if (str[i] === startDelimiter) stack.push(startDelimiter);
    else if (str[i] === endDelimiter) {
      stack.pop();
      if (stack.length == 0) {
        break;
      }
    }
    if (str[i] === splitAt && stack.length == 1) {
      result.push(current);
      current = "";
    } else current += str[i];
    i++;
  }
  result.push(current);
  return result;
};

const skipBetweenDelimiters = (
  string: string,
  startIndex: number,
  startDelimiter: string,
  endDelimiter: string,
  callback?: (str: string) => void
): number => {
  let stack = [startDelimiter];
  let i = startIndex;
  while (true && i < string.length - 1) {
    i++;
    if (callback) callback(string[i]);
    if (string[i] === startDelimiter) stack.push(startDelimiter);
    else if (string[i] === endDelimiter) {
      stack.pop();
      if (stack.length == 0) {
        break;
      }
    }
  }
  return i + 1;
};

const customExtract = (
  str: string,
  startExtract: string,
  endExtract: string,
  startDelimiter: string = "(",
  endDelimiter = ")"
) => {
  let current = "";
  let result = [];
  let i = 0;

  if (startDelimiter == startExtract || endDelimiter == endExtract) {
    let extracting = false;
    for (let i = 0; i < str.length; i++) {
      if (str[i] == startExtract) {
        extracting = true;
      } else if (extracting) {
        if (str[i] == endExtract) {
          break;
        } else current += str[i];
      }
    }
    result.push(current);
  } else {
    while (true && i < str.length - 1) {
      if (str[i] == startDelimiter) {
        i = skipBetweenDelimiters(str, i, startDelimiter, endDelimiter);
      }
      if (str[i] == startExtract) {
        break;
      }
      i++;
    }

    while (true && i < str.length - 1) {
      i++;
      if (str[i] == endExtract) {
        result.push(current);
        break;
      }
      if (str[i] == startDelimiter) {
        i = skipBetweenDelimiters(
          str,
          i,
          startDelimiter,
          endDelimiter,
          (char) => (current += char)
        );
      }
      current += str[i];
    }
  }

  return result;
};

const addDefaultProps = (token: Token) => {
  let newObj = token;
  if (token.type == BlockType.Condition) {
    newObj.props = {
      yes: "down",
      no: "right",
      ...newObj.props,
    };
  } else {
    newObj.props = {
      yesDir: "down",
      noDir: "right",
      yes: "yes",
      no: "no",
      ...newObj.props,
    };
  }
  return newObj;
};

enum State {
  ExpectingVariable = "ExpectingVariable", // if ...
  ExpectingAssignment = "ExpectingAssignment", // ... = ...
  ExpectingBlock = "ExpectingBlock", // if (...)
  ExpectingText = "ExpectingText", // (Hello World)
  ExpectingProps = "ExpectingProps", // {key: value, key: value}
  ExpectingKeyValuePair = "ExpectingKeyValuePair", // key: value
  ExpectingJoin = "ExpectingJoin", // join {}
  ExpectingConnection = "ExpectingConnection", // -> is a connection
  ExpectingModifier = "ExpectingModifier", // if.yes is a modifier
}

enum ErrorType {
  ExpectedVariableName = "ExpectedVariableName",
  UndefinedVariableName = "UndefinedVariableName",
  InvalidVariableName = "InvalidVariableName",
  ExpectedBlock = "ExpectedBlock",
  InvlaidBlockName = "InvlaidBlockName",
  ExpectedAssignment = "ExpectedAssignment",
  ExpectedText = "ExpectedText",
  UnexpectedEndOfText = "UnexpectedEndOfText",
  InvalidText = "InvalidText",
  ExpectedProps = "ExpectedProps",
  InvalidPropName = "InvalidPropName",
  InvalidPropValue = "InvalidPropValue",
  ExpectedColor = "ExpectedColor",
  InvalidColor = "InvalidColor",
  ExpectedJoin = "ExpectedJoin",
  UnexpectedStartOfJoin = "UnexpectedStartOfJoin",
  UnexpectedEndOfJoin = "UnexpectedEndOfJoin",
  ExpectedModifier = "ExpectedModifier",
  ExpectedTextArrow = "ExpectedTextArrow",
}

type TokenProps = {
  [key: string]: string | number | boolean | Direction;
};

type Token = {
  type: BlockType;
  text: string;
  props: TokenProps;
  name: string;
  inline?: Link;
  outline?: Link;
};

type Link = {
  from: Token;
  to: Token;
  text: string;
  direction: Direction;
};

export default class Lexer {
  code: string[];
  state: State = State.ExpectingVariable;
  tokens: Token[] = [];
  links: any = [];
  currentToken: {
    type?: BlockType;
    text?: string;
    props?: TokenProps;
    name?: string;
  } = {
    type: undefined,
    text: undefined,
    props: undefined,
    name: undefined,
  };
  error: Error | null = null;

  constructor(code = "") {
    this.code = this.parseCode(code);
  }

  setCode(code: string) {
    this.code = this.parseCode(code);
  }

  parseCode(code = "") {
    if (!code) return [];
    let res = customSplit(code, "\n", "(", ")")
      .map((str) => str.trim())
      .filter((str) => str);
    return res;
  }

  throwError(err: ErrorType, lineNum: number = -1) {
    if (lineNum !== -1) {
      throw new Error(`${err} at line ${lineNum + 1}`);
    }
  }

  lex(): any {
    this.state = State.ExpectingVariable;
    if (this.code.length === 0) return [];

    this.tokens = [];
    this.links = [];

    let lineIndex = 0;

    for (let line of this.code) {
      if (this.state == State.ExpectingVariable) {
        if (line.trim() == "join {") {
          this.state = State.ExpectingJoin;
          continue;
        }

        if (!line.includes("")) this.throwError(ErrorType.ExpectedAssignment);
        let temp = customSplit(line, "=");
        if (temp.length == 0)
          this.throwError(ErrorType.ExpectedVariableName, lineIndex);
        if (temp.length != 2)
          this.throwError(ErrorType.ExpectedAssignment, lineIndex);
        let t = temp[0].trim();
        if (!t || !isValidVarName(t))
          this.throwError(ErrorType.InvalidVariableName, lineIndex);

        this.currentToken.name = t;
        this.state = State.ExpectingBlock;
      }

      if (this.state == State.ExpectingBlock) {
        // check if block name is valid
        let c = customExtract(line, "=", "(");
        if (c.length != 1) this.throwError(ErrorType.ExpectedBlock, lineIndex);
        if (!blockTypes.includes(c[0].trim()))
          this.throwError(ErrorType.InvlaidBlockName, lineIndex);
        this.currentToken.type = c[0].trim() as unknown as BlockType;

        this.state = State.ExpectingText;
      }

      if (this.state == State.ExpectingText) {
        let c = customExtract(line, "(", ")");
        if (c.length != 1) this.throwError(ErrorType.ExpectedText, lineIndex);
        if (!c[0].trim()) this.throwError(ErrorType.UnexpectedEndOfText);
        this.currentToken.text = c[0];
        this.state = State.ExpectingProps;
      }

      if (this.state == State.ExpectingProps) {
        let c = customSplit(line, "{", "(", ")").map((str) => str.trim());
        if (c.length == 1) {
          this.state = State.ExpectingVariable;
          this.currentToken.props = {};
          // @ts-ignore
          this.currentToken = addDefaultProps(this.currentToken);
          // @ts-ignore
          this.currentToken && this.tokens.push(this.currentToken);
          this.currentToken = {
            type: undefined,
            text: undefined,
            props: undefined,
            name: undefined,
          };
          continue;
        }
        if (c.length == 2 && c[1] == "") {
          this.state = State.ExpectingKeyValuePair;
          continue;
        } else {
          this.throwError(ErrorType.ExpectedProps, lineIndex);
        }
      }

      if (this.state == State.ExpectingKeyValuePair) {
        if (line.trim() != "}") {
          // continue reading to next line for props
          let c = line.split(":").map((j) => j.trim());
          console.log(c);
          if (!this.currentToken.props) {
            this.currentToken.props = {
              [c[0]]: c[1],
            };
          } else {
            this.currentToken.props[c[0]] = c[1];
          }

          continue;
        } else {
          this.state = State.ExpectingVariable;
          // @ts-ignore
          this.currentToken = addDefaultProps(this.currentToken);
          // @ts-ignore
          this.currentToken && this.tokens.push(this.currentToken);
          this.currentToken = {
            type: undefined,
            text: undefined,
            props: undefined,
            name: undefined,
          };
          console.log(this.currentToken);
          continue;
        }
      }

      if (this.state == State.ExpectingJoin) {
        if (line.trim() == "}") {
          console.log("Ending join");
          break;
        }
        let s1 = customSplit(line, ">", "(", ")");

        let tks = [];

        s1.forEach((x) => {
          let s3 = customExtract(x, "(", ")");
          let name = "";
          for (let i = 0; i < x.length; i++) {
            if (x[i] == "(") break;
            name += x[i] == "-" ? "" : x[i];
          }
          tks.push({
            name,
            text: s3[0],
          });

          // else {
          //   tks.push({
          //     name: x,
          //     text: null,
          //   });
          // }
        });
        console.log(tks);
        continue;
      }

      lineIndex++;
    }

    // @ts-ignore
    console.log(this.tokens);

    return this.code;
  }
}
