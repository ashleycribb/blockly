/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {createBlockDefinitionsFromJsonArray, defineBlocks} from '../core/common.js';

/**
 * A dictionary of the block definitions provided by this module.
 */
export const blocks = createBlockDefinitionsFromJsonArray([
  // Block for a smart contract.
  {
    'type': 'contract',
    'message0': 'contract %1',
    'args0': [
      {
        'type': 'field_input',
        'name': 'NAME',
        'text': 'MyContract',
      },
    ],
    'message1': '%1',
    'args1': [
      {
        'type': 'input_statement',
        'name': 'BODY',
      },
    ],
    'style': 'logic_blocks',
    'tooltip': 'A smart contract.',
    'helpUrl': '',
  },
  // Block for a state variable.
  {
    'type': 'state_variable',
    'message0': 'state variable %1 %2',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'TYPE',
        'options': [
          ['uint', 'UINT'],
          ['string', 'STRING'],
          ['address', 'ADDRESS'],
          ['bool', 'BOOL'],
        ],
      },
      {
        'type': 'field_input',
        'name': 'NAME',
        'text': 'myVariable',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'style': 'logic_blocks',
    'tooltip': 'A state variable.',
    'helpUrl': '',
  },
  // Block for a function.
  {
    'type': 'function',
    'message0': 'function %1() %2',
    'args0': [
      {
        'type': 'field_input',
        'name': 'NAME',
        'text': 'myFunction',
      },
      {
        'type': 'input_statement',
        'name': 'BODY',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'style': 'logic_blocks',
    'tooltip': 'A function.',
    'helpUrl': '',
  },
    // Block for a constructor.
  {
    'type': 'constructor',
    'message0': 'constructor() %1',
    'args0': [
      {
        'type': 'input_statement',
        'name': 'BODY',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'style': 'logic_blocks',
    'tooltip': 'The constructor of the contract.',
    'helpUrl': '',
  },
  // Block for a return statement.
  {
    'type': 'return',
    'message0': 'return %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'VALUE',
      },
    ],
    'previousStatement': null,
    'style': 'logic_blocks',
    'tooltip': 'Returns a value from a function.',
    'helpUrl': '',
  },
]);

// Register provided blocks.
defineBlocks(blocks);
