/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from '../core/blockly.js';
import {createBlockDefinitionsFromJsonArray, defineBlocks} from '../core/common.js';
import * as Extensions from '../core/extensions.js';

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
    'mutator': 'function_mutator',
  },
  // Block for a function parameter.
  {
    'type': 'function_parameter',
    'message0': 'parameter %1 %2',
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
        'text': 'myParameter',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'style': 'logic_blocks',
    'tooltip': 'A function parameter.',
    'helpUrl': '',
  },
  // Block for the mutator container.
  {
    'type': 'function_mutator_container',
    'message0': 'parameters',
    'nextStatement': null,
    'enableContextMenu': false,
    'style': 'logic_blocks',
    'tooltip': 'A container for function parameters.',
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
  // Block for a require statement.
  {
    'type': 'require',
    'message0': 'require %1 %2',
    'args0': [
      {
        'type': 'input_value',
        'name': 'CONDITION',
        'check': 'Boolean',
      },
      {
        'type': 'input_value',
        'name': 'MESSAGE',
        'check': 'String',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'style': 'logic_blocks',
    'tooltip': 'Requires a condition to be true.',
    'helpUrl': '',
  },
  // Block for an assert statement.
  {
    'type': 'assert',
    'message0': 'assert %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'CONDITION',
        'check': 'Boolean',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'style': 'logic_blocks',
    'tooltip': 'Asserts that a condition is true.',
    'helpUrl': '',
  },
  // Block for a revert statement.
  {
    'type': 'revert',
    'message0': 'revert %1',
    'args0': [
      {
        'type': 'input_value',
        'name': 'MESSAGE',
        'check': 'String',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'style': 'logic_blocks',
    'tooltip': 'Reverts the transaction.',
    'helpUrl': '',
  },
]);

type FunctionBlock = Blockly.Block & {
  parameterCount_: number;
  updateShape_: () => void;
};

const FUNCTION_MUTATOR_MIXIN = {
  parameterCount_: 0,

  mutationToDom: function(this: FunctionBlock) {
    const container = document.createElement('mutation');
    if (this.parameterCount_) {
      container.setAttribute('parameters', String(this.parameterCount_));
    }
    return container;
  },

  domToMutation: function(this: FunctionBlock, xmlElement: Element) {
    this.parameterCount_ = parseInt(xmlElement.getAttribute('parameters') || '0', 10);
    this.updateShape_();
  },

  decompose: function(this: FunctionBlock, workspace: Blockly.Workspace) {
    const containerBlock = workspace.newBlock('function_mutator_container') as Blockly.BlockSvg;
    containerBlock.initSvg();
    let connection = containerBlock.nextConnection;
    for (let i = 0; i < this.parameterCount_; i++) {
      const parameterBlock = workspace.newBlock('function_parameter') as Blockly.BlockSvg;
      parameterBlock.initSvg();
      if (connection) {
        connection.connect(parameterBlock.previousConnection);
        connection = parameterBlock.nextConnection;
      }
    }
    return containerBlock;
  },

  compose: function(this: FunctionBlock, containerBlock: Blockly.Block) {
    this.parameterCount_ = 0;
    let clauseBlock = containerBlock.nextConnection && containerBlock.nextConnection.targetBlock();
    while (clauseBlock) {
      this.parameterCount_++;
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
  },

  updateShape_: function(this: FunctionBlock) {
    let i = 1;
    while (this.getInput('PARAM' + i)) {
      this.removeInput('PARAM' + i);
      i++;
    }

    for (let i = 1; i <= this.parameterCount_; i++) {
      this.appendValueInput('PARAM' + i)
          .appendField('parameter');
    }

    this.moveInputBefore('BODY', null);
    if (this.parameterCount_) {
      this.moveInputBefore('PARAM1', 'BODY');
      for (let i = 2; i <= this.parameterCount_; i++) {
        this.moveInputBefore('PARAM' + i, 'BODY');
      }
    }
  },
};

Extensions.registerMutator(
  'function_mutator',
  FUNCTION_MUTATOR_MIXIN,
  undefined,
  ['function_parameter']
);

// Register provided blocks.
defineBlocks(blocks);
