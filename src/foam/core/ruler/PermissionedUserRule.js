/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

 foam.CLASS({
  package: 'foam.core.ruler',
  name: 'PermissionedUserRule',
  extends: 'foam.core.ruler.Rule',

  documentation: `
    Authorizable rule - rule execution is permitted via permissions. 'rule.read.ruleId'
  `,

  javaImports: [
    'foam.core.auth.User'
  ],

  methods: [
    {
      name: 'getUser',
      javaCode: 'return (User) obj;'
    }
  ]
});
