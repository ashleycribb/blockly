'use strict';

class Simulation {
  constructor(workspace) {
    this.workspace = workspace;
    this.state = {};
  }

  run(functionName, parameters) {
    const functionBlock = this.workspace.getBlocksByType('function').find(
      (b) => b.getFieldValue('NAME') === functionName
    );

    if (functionBlock) {
      Code.animateBlock(functionBlock.id);
      const code = solidity.solidityGenerator.blockToCode(functionBlock);
      console.log('--- Simulation ---');
      console.log(`Executing function: ${functionName}`);
      console.log('Generated code:\n', code);

      // This is a very simplified simulation.
      // A real implementation would require a JavaScript interpreter for Solidity.
      const body = solidity.solidityGenerator.statementToCode(functionBlock, 'BODY');
      this.updateStateFromCode(body);

      console.log('New state:', this.state);
      this.updateContractStateUI();
      this.reportSuccess(functionName);
    } else {
      console.error(`Function "${functionName}" not found.`);
      this.reportError(functionName);
    }
  }

  reportSuccess(functionName) {
    const agentMessages = document.getElementById('agent_messages');
    const agentMessage = document.createElement('div');
    agentMessage.textContent = `Agent: Successfully executed function "${functionName}".`;
    agentMessages.appendChild(agentMessage);
    agentMessages.scrollTop = agentMessages.scrollHeight;
  }

  reportError(functionName) {
    const agentMessages = document.getElementById('agent_messages');
    const agentMessage = document.createElement('div');
    agentMessage.textContent = `Agent: Error: Function "${functionName}" not found.`;
    agentMessages.appendChild(agentMessage);
    agentMessages.scrollTop = agentMessages.scrollHeight;
  }

  updateStateFromCode(code) {
    // This is a mock interpreter.
    const assignments = code.match(/(\w+)\s*=\s*(.*);/g) || [];
    assignments.forEach((assignment) => {
      const parts = assignment.match(/(\w+)\s*=\s*(.*);/);
      const varName = parts[1];
      const value = parts[2];
      this.state[varName] = value;
    });
  }

  updateContractStateUI() {
    const contractStateDiv = document.getElementById('contract_state');
    contractStateDiv.innerHTML = '';
    for (const name in this.state) {
      const div = document.createElement('div');
      div.innerHTML = `<b>${name}</b>: <span>${this.state[name]}</span>`;
      contractStateDiv.appendChild(div);
    }
  }
}
