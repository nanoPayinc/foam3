/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.logger',
  name: 'StdoutLogger',
  extends: 'foam.core.logger.DAOLogger',

  javaImports: [
    'foam.lang.X',
    'foam.core.logger.Logger',
    'foam.core.COREService',
    'java.io.IOException',
    'java.text.SimpleDateFormat',
    'java.util.logging.*'
  ],

  properties: [
    {
      name: 'delegate',
      class: 'foam.dao.DAOProperty',
      visibility: 'HIDDEN',
      javaFactory: `
        foam.lang.X x = getX() != null ? getX() : foam.lang.XLocator.get();
        return new foam.core.logger.RepeatLogMessageDAO.Builder(x)
        .setDelegate(new foam.core.logger.LogMessageDAO.Builder(x)
          .setDelegate(new foam.core.logger.StdoutLoggerDAO.Builder(x)
            .setDelegate(new foam.dao.NullDAO(x, foam.core.logger.LogMessage.getOwnClassInfo()))
            .build())
          .build())
        .build();
      `
    }
  ],

  javaCode: `
    protected java.util.logging.Logger logger_;
    private static StdoutLogger instance__;
    public static StdoutLogger instance() { 
      if ( instance__ == null ) {
        instance__ = new StdoutLogger();
        instance__.setupJavaLoggingHandler();
      }
      return instance__; 
    }
  `,

  methods: [
    {
      name: 'setupJavaLoggingHandler',
      type: 'Void',
      javaCode: `
        logger_ = java.util.logging.Logger.getAnonymousLogger();
        logger_.setUseParentHandlers(false);
        logger_.setLevel(Level.ALL);
        Handler handler = new JavaHandler();
        logger_.addHandler(handler);
      `
    }
  ]
});