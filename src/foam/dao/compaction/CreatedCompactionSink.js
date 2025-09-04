/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao.compaction',
  name: 'CreatedCompactionSink',
  extends: 'foam.dao.ProxySink',
  implements: ['foam.lang.ContextAware'],

  documentation: `Sink which only puts CreatedAware objects with a date greater or equals to specified date`,

  javaImports: [
    'foam.core.auth.CreatedAware',
    'foam.lang.FObject',
    'foam.lang.X'
  ],

  properties: [
    {
      name: 'since',
      class: 'DateTime'
    }
  ],

  methods: [
    {
      name: 'put',
      args: 'Any obj, foam.lang.Detachable sub',
      javaCode: `
      CreatedAware created = (CreatedAware) obj;
      if ( created.getCreated().getTime() >= getSince().getTime() ) {
        getDelegate().put(obj, sub);
      }
      `
    }
  ]
});
