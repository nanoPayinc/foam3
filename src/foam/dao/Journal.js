/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.dao',
  name: 'Journal',

  methods: [
    {
      name: 'put',
      type: 'FObject',
      args: [
        { name: 'x',      type: 'Context' },
        { name: 'prefix', type: 'String' },
        { name: 'dao',    type: 'DAO' },
        { name: 'obj',    type: 'foam.core.FObject' }
      ]
    },
    {
      name: 'remove',
      type: 'FObject',
      args: [
        { name: 'x',      type: 'Context' },
        { name: 'prefix', type: 'String' },
        { name: 'dao',    type: 'DAO' },
        { name: 'obj',    type: 'foam.core.FObject' }
      ]
    },
    {
      name: 'replay',
      args: [
        { name: 'x',   type: 'Context' },
        { name: 'dao', type: 'foam.dao.DAO' }
      ]
    },
    {
      name: 'cmd',
      args: [
        { name: 'x',   type: 'Context' },
        { name: 'obj', type: 'Object' }
      ],
      type: 'Object'
    }
  ]
});


foam.CLASS({
  package: 'foam.dao',
  name: 'AbstractJournal',
  abstract: true,

  implements: [
    'foam.dao.Journal'
  ],

  methods: [
    {
      name: 'cmd',
      args: 'Context x, Object obj',
      type: 'Object',
      javaCode: `
      return obj;
      `
    }
  ]
});


foam.CLASS({
  package: 'foam.dao',
  name: 'ProxyJournal',
  extends: 'foam.dao.AbstractJournal',

  documentation: 'Proxy journal class',

  properties: [
    {
      class: 'Proxy',
      of: 'foam.dao.Journal',
      name: 'delegate',
      forwards: [ 'put', 'remove', 'replay', 'cmd' ]
    }
  ]
});
