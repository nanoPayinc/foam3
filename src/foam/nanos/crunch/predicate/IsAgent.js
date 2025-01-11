/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.nanos.crunch.predicate',
  name: 'IsAgent',

  documentation: `
    Returns true if user and realUser are different.
    This is useful for agent association capabilities.
  `,

  javaImports: [
    'foam.nanos.auth.Subject'
  ],

  ruleF: 'return ((Subject) x.get("subject")).isAgent();'
});
