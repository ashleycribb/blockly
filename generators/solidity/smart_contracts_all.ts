/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @file Generating Solidity for blockchain blocks.
 */

import type {Block} from '../../core/block.js';
import type {SolidityGenerator} from './solidity_generator.js';
import {Order} from './solidity_generator.js';

export function contract(block: Block, generator: SolidityGenerator): string {
  const name = block.getFieldValue('NAME');
  const body = generator.statementToCode(block, 'BODY');
  return `contract ${name} {\n${body}}\n`;
}

export function state_variable(block: Block, generator: SolidityGenerator): string {
  const type = block.getFieldValue('TYPE').toLowerCase();
  const name = block.getFieldValue('NAME');
  return `${type} ${name};\n`;
}

export function function_(block: Block, generator: SolidityGenerator): string {
  const name = block.getFieldValue('NAME');
  const body = generator.statementToCode(block, 'BODY');
  // TODO: Add arguments and return type.
  return `function ${name}() public {\n${body}}\n`;
}

export function constructor(block: Block, generator: SolidityGenerator): string {
  const body = generator.statementToCode(block, 'BODY');
  return `constructor() public {\n${body}}\n`;
}

export function return_(block: Block, generator: SolidityGenerator): string {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '';
  return `return ${value};\n`;
}
