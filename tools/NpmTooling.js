/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.POM({
  name: 'npm',

  tasks: {
    // TODO: install - install node, npm itself. and use 'update' for current install.
    install: ['install', 'Install npm tools that foam and the build use.', [], function() {
      process.chdir(PROJECT_HOME);
      this.execSync('npm install', { stdio: 'inherit'} );
    }]
  }
});
