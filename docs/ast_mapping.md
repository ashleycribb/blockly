# AST to Blockly Block Mapping

This document outlines the mapping from the Solidity AST (as produced by `@solidity-parser/parser`) to our Blockly blocks.

## `ContractDefinition`

*   **AST Node Type:** `ContractDefinition`
*   **Blockly Block Type:** `contract`
*   **Field Mapping:**
    *   `name` -> `NAME` field

---

## `StateVariableDeclaration`

*   **AST Node Type:** `StateVariableDeclaration`
*   **Blockly Block Type:** `state_variable`
*   **Field Mapping:**
    *   `variables[0].typeName.name` -> `TYPE` field
    *   `variables[0].name` -> `NAME` field

---

## `FunctionDefinition`

*   **AST Node Type:** `FunctionDefinition`
*   **Blockly Block Type:** `function`
*   **Field Mapping:**
    *   `name` -> `NAME` field
    *   `body.statements` -> `BODY` statement input

---

## `ExpressionStatement` (inside a function)

*   **AST Node Type:** `ExpressionStatement`
*   **Blockly Block Type:** Varies depending on the expression.
*   **Example:** For an assignment expression (`=`), we would use the `variables_set` block.
    *   `expression.left.name` -> `VAR` field
    *   `expression.right` -> `VALUE` input

---
