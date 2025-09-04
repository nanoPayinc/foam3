/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao.compaction',
  name: 'LastModifiedCompactionSink',
  extends: 'foam.dao.ProxySink',
  implements: ['foam.lang.ContextAware'],

  documentation: `Sink which only puts LastModifiedAware objects with a date greater or equals to specified date`,

  javaImports: [
    'foam.core.auth.LastModifiedAware',
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
      LastModifiedAware last = (LastModifiedAware) obj;
      if ( last.getLastModified().getTime() >= getSince().getTime() ) {
        getDelegate().put(obj, sub);
      }
      `
    }
  ]
});
