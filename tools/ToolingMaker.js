/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

const envs    = {};
const tasks   = {};
const options = {};

exports.description = 'Assemble build environment.';

exports.visitPOM = function(pom) {
  pom.envs &&
    Object.keys(pom.envs).forEach(k => {
      if ( ! envs[k] ) {
        envs[k] = pom.envs[k];
      } else {
        this.warning(`[Tooling] duplicate env '${k}\' ignored from pom '${pom.name}'`);
      }
    });

  pom.options &&
    Object.keys(pom.options).forEach(k => {
      if ( ! options[k] ) {
        options[k] = pom.options[k];
      } else {
        this.warning(`[Tooling] duplicate arg '${k}' ignored from pom '${pom.name}'`);
      }
    });

  pom.tasks &&
    Object.keys(pom.tasks).forEach(k => {
      let list = tasks[k] || [];
      let task = pom.tasks[k];
      task.pom = pom.name;
      list.push(task);
      tasks[k] = list;
    });
};

exports.envs    = envs;
exports.tasks   = tasks;
exports.options = options;
