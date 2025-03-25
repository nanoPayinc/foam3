/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
 foam.CLASS({
  package: 'foam.core.auth.predicate',
  name: 'IsAnonymousPredicate',

  extends: 'foam.mlang.predicate.AbstractPredicate',

  implements: [ 'foam.lang.Serializable' ],

  documentation: 'Check if user in authservice is anonymous. Requires no arguments.',

  javaImports: [
    'foam.lang.X',
    'foam.core.auth.Subject',
    'foam.core.auth.AuthService'
  ],

  methods: [
    {
      name: 'f',
      javaCode: `
        if ( ! (obj instanceof X) ) return false;
        X x = (X)obj;
        AuthService authService = (AuthService)x.get("auth");
        if ( authService == null ) return false;
        return authService.isAnonymous(x);
      `
    }
  ]
});
