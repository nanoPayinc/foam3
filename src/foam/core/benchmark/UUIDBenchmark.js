/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.benchmark',
  name: 'UUIDBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.dao.ArraySink',
    'foam.dao.DAO',
    'foam.mlang.sink.Count',
    'foam.core.app.AppConfig',
    'foam.core.auth.LifecycleState',
    'foam.core.auth.Language',
    'foam.core.bench.Benchmark',
    'foam.core.boot.CSpec',
    'foam.core.logger.PrefixLogger',
    'foam.core.logger.Logger',
    'foam.core.logger.StdoutLogger',
    'static foam.mlang.MLang.EQ',
    'java.util.UUID'
  ],

  properties: [
    {
      name: 'logger',
      class: 'FObjectProperty',
      of: 'foam.core.logger.Logger',
      visibility: 'HIDDEN',
      transient: true,
      javaCloneProperty: '//noop',
      javaFactory: `
      Logger logger = (Logger) getX().get("logger");
      if ( logger == null ) {
        logger = StdoutLogger.instance();
      }
      return new PrefixLogger(new Object[] {
        this.getClass().getSimpleName()
      }, logger);
      `
    }
  ],

  methods: [
    {
      name: 'execute',
      args: [
        {
          name: 'x',
          type: 'X'
        }
      ],
      javaCode: `
    AppConfig config = (AppConfig) x.get("appConfig");

    if ( config.getMode() == foam.core.app.Mode.PRODUCTION ) {
      return;
    }

    UUID.randomUUID().toString();
      `
    }
  ]
});
