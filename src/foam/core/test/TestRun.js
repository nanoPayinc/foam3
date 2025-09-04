/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.test',
  name: 'TestRun',

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.LastModifiedAware'
  ],

  tableColumns: [
    'created',
    'server',
    'description',
    'cases',
    'tests',
    'passed',
    'failed',
    'completed'
  ],

  properties: [
    {
      name: 'id',
      class: 'String'
    },
    {
      name: 'description',
      class: 'String'
    },
    {
      name: 'server',
      class: 'Boolean',
      value: true
    },
    {
      name: 'suites',
      class: 'String'
    },
    {
      name: 'filter',
      class: 'String'
    },
    {
      name: 'completed',
      class: 'Boolean'
    },
    {
      name: 'cases',
      class: 'Int'
    },
    {
      name: 'tests',
      class: 'Int'
    },
    {
      name: 'passed',
      class: 'Int'
    },
    {
      name: 'failed',
      class: 'Int'
    },
    {
      name: 'failures',
      class: 'List'
    }
  ]
});
