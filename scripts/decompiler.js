const parser = require('@solidity-parser/parser');

function decompile(solidityCode) {
  try {
    const ast = parser.parse(solidityCode, { loc: true });
    const xml = astToXml(ast);
    return xml;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function astToXml(ast) {
  let xml = '<xml xmlns="https://developers.google.com/blockly/xml">';
  for (const node of ast.children) {
    xml += nodeToXml(node);
  }
  xml += '</xml>';
  return xml;
}

function nodeToXml(node) {
  if (node.type === 'ContractDefinition') {
    return contractDefinitionToXml(node);
  }
  if (node.type === 'StateVariableDeclaration') {
    return stateVariableDeclarationToXml(node);
  }
  if (node.type === 'FunctionDefinition') {
    return functionDefinitionToXml(node);
  }
  // TODO: Add other node types.
  return '';
}

function stateVariableDeclarationToXml(node) {
  const variable = node.variables[0];
  let xml = `<block type="state_variable">`;
  xml += `<field name="TYPE">${variable.typeName.name.toUpperCase()}</field>`;
  xml += `<field name="NAME">${variable.name}</field>`;
  xml += `</block>`;
  return xml;
}

function functionDefinitionToXml(node) {
  let xml = `<block type="function">`;
  xml += `<field name="NAME">${node.name}</field>`;
  xml += '<statement name="BODY">';
  if (node.body) {
    for (const statement of node.body.statements) {
      xml += nodeToXml(statement);
    }
  }
  xml += '</statement>';
  xml += `</block>`;
  return xml;
}

function contractDefinitionToXml(node) {
  let xml = `<block type="contract">`;
  xml += `<field name="NAME">${node.name}</field>`;
  xml += '<statement name="BODY">';
  for (const subNode of node.subNodes) {
    xml += nodeToXml(subNode);
  }
  xml += '</statement>';
  xml += `</block>`;
  return xml;
}

module.exports = { decompile };
