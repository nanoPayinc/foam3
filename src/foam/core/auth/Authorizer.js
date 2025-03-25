/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.auth',
  name: 'Authorizer',

  documentation: `An authorizer is a class that can check if a user has
access to an FObject under different circumstances.`,

  methods: [
    {
      name: 'authorizeOnCreate',
      args: [
        {
          name: 'x',
          type: 'foam.lang.X'
        },
        {
          name: 'obj',
          type: 'foam.lang.FObject'
        },
      ],
      javaThrows: [
        'foam.core.auth.AuthorizationException'
      ]
    },
    {
      name: 'authorizeOnRead',
      args: [
        {
          name: 'x',
          type: 'foam.lang.X'
        },
        {
          name: 'obj',
          type: 'foam.lang.FObject'
        },
      ],
      javaThrows: [
        'foam.core.auth.AuthorizationException'
      ]
    },
    {
      name: 'authorizeOnUpdate',
      args: [
        {
          name: 'x',
          type: 'foam.lang.X'
        },
        {
          name: 'oldObj',
          type: 'foam.lang.FObject'
        },
        {
          name: 'newObj',
          type: 'foam.lang.FObject'
        },
      ],
      javaThrows: [
        'foam.core.auth.AuthorizationException'
      ]
    },
    {
      name: 'authorizeOnDelete',
      args: [
        {
          name: 'x',
          type: 'foam.lang.X'
        },
        {
          name: 'obj',
          type: 'foam.lang.FObject'
        }
      ],
      javaThrows: [
        'foam.core.auth.AuthorizationException'
      ]
    },
    {
      name: 'checkGlobalRead',
      args: [
        {
          name: 'x',
          type: 'foam.lang.X'
        },
        {
          name: 'predicate',
          type: 'foam.mlang.predicate.Predicate'
        }
      ],
      javaType: 'boolean'
    },
    {
      name: 'checkGlobalRemove',
      args: 'foam.lang.X x',
      javaType: 'boolean'
    },
    {
      name: 'checkGlobalFind',
      args: 'foam.lang.X x',
      javaType: 'boolean',
      javaCode: 'return checkGlobalRead(x, null);'
    }
  ]
});
