/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.om',
  name: 'CCOMRuleAction',
  extends: 'foam.core.om.OMRuleAction',

  javaImports: [
    'foam.lang.X'
  ],

  methods: [
    {
      name: 'getLogger',
      args: [ { name: 'x', type: 'X' } ],
      type: 'OMLogger',
      javaCode: `
// Return CCOMLogger if enabled otherwise OMLogger
OMLogger ccomLogger = (OMLogger) x.get("CCOMLogger");
return ccomLogger != null ? ccomLogger : (OMLogger) x.get("OMLogger");`
    }
  ]
});

