/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.auth',
  name: 'UserRefinements',
  refines: 'foam.core.auth.User',

  properties: [
    {
      class: 'Boolean',
      name: 'twoFactorEnabled',
      documentation: 'Two factor enabled flag',
      section: 'operationsInformation',
      order: 50,
      gridColumns: 6,
      columnPermissionRequired: true
    },
    {
      class: 'String',
      name: 'twoFactorSecret',
      documentation: 'Two factor secret',
      networkTransient: true,
      section: 'systemInformation',
      order: 80,
      gridColumns: 6,
      columnPermissionRequired: true
    }
  ]
});
