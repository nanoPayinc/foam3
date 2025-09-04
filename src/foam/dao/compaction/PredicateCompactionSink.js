/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao.compaction',
  name: 'PredicateCompactionSink',
  extends: 'foam.dao.ProxySink',
  implements: ['foam.lang.ContextAware'],

  documentation: `Sink which only puts those objects which pass the predicate`,

  javaImports: [
    'foam.dao.Sink',
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.mlang.predicate.Predicate'
  ],

  properties: [
    {
      name: 'predicate',
      class: 'FObjectProperty',
      of: 'foam.mlang.predicate.Predicate',
      view: { class: 'foam.u2.view.JSONTextView' },
      javaFactory: `
      return foam.mlang.MLang.TRUE;
      `
    }
  ],

  methods: [
    {
      name: 'put',
      args: 'Any obj, foam.lang.Detachable sub',
      javaCode: `
      if ( getPredicate().f(obj) ) {
        getDelegate().put(obj, sub);
      }
      `
    }
  ]
});
