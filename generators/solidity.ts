/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @file Instantiate a SolidityGenerator and populate it with the
 * complete set of block generator functions for Solidity. This is
 * the entrypoint for solidity_compressed.js.
 */

import {SolidityGenerator} from './solidity/solidity_generator.js';
import * as smart_contracts_all from './solidity/smart_contracts_all.js';

export * from './solidity/solidity_generator.js';

/**
 * Solidity code generator instance.
 */
export const solidityGenerator = new SolidityGenerator();

// Install per-block-type generator functions:
const generators: {[key: string]: any} = {
  'contract': smart_contracts_all.contract,
  'state_variable': smart_contracts_all.state_variable,
  'function': smart_contracts_all.function_,
  'constructor': smart_contracts_all.constructor,
  'return': smart_contracts_all.return_,
  'function_parameter': smart_contracts_all.function_parameter,
  'require': smart_contracts_all.require,
  'assert': smart_contracts_all.assert,
  'revert': smart_contracts_all.revert,
};

for (const name in generators) {
  solidityGenerator.forBlock[name] = generators[name];
}
