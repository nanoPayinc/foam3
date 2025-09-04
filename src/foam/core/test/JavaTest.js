/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.test',
  name: 'JavaTest',
  extends: 'foam.core.test.Test',
  abstract: true,

  documentation: 'Abstract base class for modelled Java tests that implement runTest directly.',

  properties: [
    {
      name: 'language',
      factory: function() { return foam.core.script.Language.BEANSHELL; },
      visibility: foam.u2.DisplayMode.RO
    }
  ]

  /*
  // Add to sub-classes:
  methods: [
    {
      name: 'runTest',
      javaCode: `
        // insert tests here
      `
    }
  ]
  */
});
