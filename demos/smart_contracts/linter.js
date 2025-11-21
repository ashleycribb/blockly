'use strict';

const Linter = {
  rules: [
    {
      name: 'function-requires-require',
      description: 'A function should have at least one `require` statement.',
      check: function(block) {
        if (block.type === 'function') {
          const requireBlocks = block.getDescendants().filter(b => b.type === 'require');
          return requireBlocks.length > 0;
        }
        return true;
      }
    },
    {
      name: 'state-variable-public',
      description: 'State variables should not be public unless necessary.',
      check: function(block) {
        if (block.type === 'state_variable') {
          // This is a simplified check. A real implementation would need to
          // check the visibility property of the variable.
          return true;
        }
        return true;
      }
    }
  ],

  run: function(workspace) {
    const allBlocks = workspace.getAllBlocks(false);
    let issueCount = 0;
    for (const block of allBlocks) {
      let warnings = [];
      for (const rule of this.rules) {
        if (!rule.check(block)) {
          warnings.push(rule.description);
          issueCount++;
        }
      }
      if (warnings.length > 0) {
        block.setWarningText(warnings.join('\n'));
      } else {
        block.setWarningText(null);
      }
    }
    const status = document.getElementById('status');
    if (issueCount > 0) {
      status.textContent = `${issueCount} issue(s) found.`;
    } else {
      status.textContent = 'No issues found.';
    }
  }
};
