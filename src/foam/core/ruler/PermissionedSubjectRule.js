/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.ruler',
  name: 'PermissionedSubjectRule',
  extends: 'foam.core.ruler.Rule',

  documentation: `
    Authorizable rule - rule execution is permitted via permissions. 'rule.read.ruleId'
  `,

  javaImports: [
    'foam.core.auth.Subject'
  ],

  methods: [
    {
      name: 'getUser',
      javaCode: 'return ((Subject)x.get("subject")).getUser();'
    }
  ]
});
