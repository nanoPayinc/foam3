/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.auth.twofactor',
  name: 'OTPAuthService',

  proxy: true,
  skeleton:true,

  documentation: 'One-time password auth service',

  methods: [
    {
      name: 'generateKeyAndQR',
      async: true,
      type: 'foam.core.auth.twofactor.OTPKey',
      javaThrows: [ 'foam.core.auth.AuthenticationException' ],
      args: [
        {
          name: 'x',
          type: 'Context'
        }
      ]
    },
    {
      name: 'verifyToken',
      async: true,
      type: 'Boolean',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'token',
          type: 'String'
        }
      ]
    },
    {
      name: 'disable',
      async: true,
      type: 'Boolean',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'token',
          type: 'String'
        }
      ]
    }
  ]
});
