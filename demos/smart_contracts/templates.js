/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Contract templates for Blockly's Smart Contracts demo.
 */
'use strict';

var templates = {
  'Simple Storage': `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="contract" id="1" x="10" y="10">
    <field name="NAME">SimpleStorage</field>
    <statement name="BODY">
      <block type="state_variable" id="2">
        <field name="TYPE">UINT</field>
        <field name="NAME">myVariable</field>
        <next>
          <block type="function" id="3">
            <field name="NAME">set</field>
            <statement name="BODY">
              <block type="variables_set" id="4">
                <field name="VAR">myVariable</field>
                <value name="VALUE">
                  <block type="parameters_get" id="5">
                    <field name="VAR">newValue</field>
                  </block>
                </value>
              </block>
            </statement>
            <next>
              <block type="function" id="6">
                <field name="NAME">get</field>
                <statement name="BODY">
                  <block type="return" id="7">
                    <value name="VALUE">
                      <block type="variables_get" id="8">
                        <field name="VAR">myVariable</field>
                      </block>
                    </value>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
`,
  'Basic Token': `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="contract" id="1" x="10" y="10">
    <field name="NAME">BasicToken</field>
    <statement name="BODY">
      <block type="state_variable" id="2">
        <field name="TYPE">MAPPING_ADDRESS_UINT</field>
        <field name="NAME">balances</field>
        <next>
          <block type="function" id="3">
            <field name="NAME">mint</field>
            <statement name="BODY">
              <block type="variables_set" id="4">
                <field name="VAR">balances[msg.sender]</field>
                <value name="VALUE">
                  <block type="math_number" id="5">
                    <field name="NUM">1000</field>
                  </block>
                </value>
              </block>
            </statement>
            <next>
              <block type="function" id="6">
                <field name="NAME">balanceOf</field>
                <statement name="BODY">
                  <block type="return" id="7">
                    <value name="VALUE">
                      <block type="variables_get" id="8">
                        <field name="VAR">balances[msg.sender]</field>
                      </block>
                    </value>
                  </block>
                </statement>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
  </block>
</xml>
`,
};
