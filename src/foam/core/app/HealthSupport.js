/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.app',
  name: 'HealthSupport',

  documentation: ``,
  axioms: [
    foam.pattern.Singleton.create()
  ],

  javaImports: [
    'foam.core.app.AppConfig',
    'foam.core.logger.Loggers',
    'foam.dao.DAO',
    'foam.lang.X'
  ],

  methods: [
    {
      name: 'getLocalHealth',
      args: 'X x',
      type: 'Health',
      javaCode: `
      String hostname = System.getProperty("hostname", "localhost");
      if ( "localhost".equals(hostname) ) {
        hostname = System.getProperty("user.name");
      }
      AppConfig appConfig = (AppConfig) x.get("appConfig");
      HealthId id = new HealthId(hostname, appConfig.getName());
      Health health = (Health) ((DAO) x.get("healthDAO")).find(id);
      if ( health == null ) {
        Loggers.logger(x, this).warning("Health not found, creating default", id);
        health = (Health) x.get("Health");
        if ( ! health.getId().equals(id) ) {
          Loggers.logger(x, this).warning("Health not found", id);
          health = null;
        }
      }
      return health;
      `
    },
    {
      name: 'getHealth',
      args: 'X x, String hostname',
      type: 'Health',
      javaCode: `
      AppConfig appConfig = (AppConfig) x.get("appConfig");
      HealthId id = new HealthId(hostname, appConfig.getName());
      Health health = (Health) ((DAO) x.get("healthDAO")).find(id);
      if ( health == null ) {
        Loggers.logger(x, this).warning("Health not found", id);
      }
      return health;
      `
    }
  ]
});
