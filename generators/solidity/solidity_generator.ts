/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @file Solidity code generator class, including helper methods for
 * generating Solidity for blocks.
 */

import type {Block} from '../../core/block.js';
import {CodeGenerator} from '../../core/generator.js';
import {Names, NameType} from '../../core/names.js';
import * as Variables from '../../core/variables.js';
import type {Workspace} from '../../core/workspace.js';

// prettier-ignore
export enum Order {
  ATOMIC = 0,            // 0 "" ...
  NEW = 1.1,             // new
  MEMBER = 1.2,          // . []
  FUNCTION_CALL = 2,     // ()
  INCREMENT = 3,         // ++
  DECREMENT = 3,         // --
  BITWISE_NOT = 4.1,     // ~
  UNARY_PLUS = 4.2,      // +
  UNARY_NEGATION = 4.3,  // -
  LOGICAL_NOT = 4.4,     // !
  TYPEOF = 4.5,          // typeof
  VOID = 4.6,            // void
  DELETE = 4.7,          // delete
  AWAIT = 4.8,           // await
  EXPONENTIATION = 5.0,  // **
  MULTIPLICATION = 5.1,  // *
  DIVISION = 5.2,        // /
  MODULUS = 5.3,         // %
  SUBTRACTION = 6.1,     // -
  ADDITION = 6.2,        // +
  BITWISE_SHIFT = 7,     // << >> >>>
  RELATIONAL = 8,        // < <= > >=
  IN = 8,                // in
  INSTANCEOF = 8,        // instanceof
  EQUALITY = 9,          // == != === !==
  BITWISE_AND = 10,      // &
  BITWISE_XOR = 11,      // ^
  BITWISE_OR = 12,       // |
  LOGICAL_AND = 13,      // &&
  LOGICAL_OR = 14,       // ||
  CONDITIONAL = 15,      // ?:
  ASSIGNMENT = 16,       // = += -= **= *= /= %= <<= >>= ...
  YIELD = 17,            // yield
  COMMA = 18,            // ,
  NONE = 99,             // (...)
}

export class SolidityGenerator extends CodeGenerator {
  ORDER_OVERRIDES: [Order, Order][] = [];

  constructor(name = 'Solidity') {
    super(name);
    this.addReservedWords(
      'after,alias,apply,auto,case,copyof,default,define,final,implements,' +
      'in,inline,let,macro,match,mutable,null,of,partial,promise,reference,' +
      'relocatable,sealed,sizeof,static,supports,switch,try,typedef,typeof,var,'
    );
  }

  init(workspace: Workspace) {
    super.init(workspace);

    if (!this.nameDB_) {
      this.nameDB_ = new Names(this.RESERVED_WORDS_);
    } else {
      this.nameDB_.reset();
    }

    this.nameDB_.setVariableMap(workspace.getVariableMap());
    this.nameDB_.populateVariables(workspace);
    this.nameDB_.populateProcedures(workspace);

    this.isInitialized = true;
  }

  finish(code: string): string {
    // Convert the definitions dictionary into a list.
    const definitions = Object.values(this.definitions_);
    // Call Blockly.CodeGenerator's finish.
    super.finish(code);
    this.isInitialized = false;

    this.nameDB_!.reset();
    return definitions.join('\n\n') + '\n\n\n' + code;
  }

  scrubNakedValue(line: string): string {
    return line + ';\n';
  }

  quote_(string: string): string {
    string = string
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\\n')
      .replace(/'/g, "\\'");
    return "'" + string + "'";
  }

  multiline_quote_(string: string): string {
    const lines = string.split(/\n/g).map(this.quote_);
    return lines.join(" + '\\n' +\n");
  }

  scrub_(block: Block, code: string, thisOnly = false): string {
    const nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = thisOnly ? '' : this.blockToCode(nextBlock);
    return code + nextCode;
  }
}
