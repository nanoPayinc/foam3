/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao.compaction',
  name: 'LifecycleDeletedCompactionSink',
  extends: 'foam.dao.ProxySink',
  implements: ['foam.lang.ContextAware'],

  documentation: `Sink which discards Lifeycle DELETED`,

  javaImports: [
    'foam.core.auth.LifecycleAware',
    'foam.core.auth.LifecycleState',
    'foam.dao.Sink',
    'foam.lang.FObject',
    'foam.lang.X'
  ],

  properties: [
    {
      name: 'discardDeleted',
      class: 'Boolean',
      value: false
    }
  ],

  javaCode: `
  public LifecycleDeletedCompactionSink(X x, Boolean discardDeleted, Sink delegate) {
    super(x, delegate);
    setDiscardDeleted(discardDeleted);
  }
  `,

  methods: [
    {
      name: 'put',
      args: 'Any obj, foam.lang.Detachable sub',
      javaCode: `
      X x = getX();
      if ( getDiscardDeleted() &&
           obj instanceof LifecycleAware &&
           ((LifecycleAware) obj).getLifecycleState() == LifecycleState.DELETED ) {
        // ((foam.core.logger.Logger) x.get("logger")).info("LifecycleDeletedCompactionSink,discard", ((FObject) obj).toSummary());
      } else { 
        getDelegate().put(obj, sub);
      }
      `
    }
  ]
});
