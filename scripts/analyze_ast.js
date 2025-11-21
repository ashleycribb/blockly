const parser = require('@solidity-parser/parser');

const input = `
contract test {
  uint256 a;
  function f() public {
    a = 1;
  }
}
`;

try {
  const ast = parser.parse(input, { loc: true });
  console.log(JSON.stringify(ast, null, 2));
} catch (e) {
  console.error(e);
}
