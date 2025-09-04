/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.app',
  name: 'ShutdownWatcher',
  extends: 'foam.core.fs.Watcher',
  javaImplements: [ 'Runnable' ],

  documentation: `Agent, when trigger, will System.exit.
Install example:
p({
  "class": "foam.core.boot.CSpec",
  "name": "shutdownWatcher",
  "lazy": false,
  "serviceClass": "foam.core.app.ShutdownWatcher"
})

Use Runtime.getRuntime.addShutdownHook(Runnable) to register shtudown hook
`,

  javaImports: [
    'foam.core.logger.Logger',
    'foam.core.logger.Loggers',
    'foam.core.logger.StdoutLogger',
    'foam.dao.DAO',
    'foam.lang.X',
    'foam.util.SafetyUtil',
    'java.io.File',
    'java.io.IOException',
    'java.nio.file.Files',
    'java.nio.file.Path',
    'java.nio.file.Paths',
    'java.nio.file.FileSystems',
    'java.nio.file.WatchEvent',
    'java.nio.file.WatchKey',
    'java.nio.file.WatchService',
    'java.nio.file.StandardWatchEventKinds'
  ],

  properties: [
    {
      documentation: 'Delay between receive shutdown request and System.exit. Value in seconds',
      name: 'delay',
      class: 'Int',
      unitValue: 's',
      value: 30
    },
    {
      documentation: 'set true to abort an in-progress shudown',
      name: 'abort',
      class: 'Boolean',
      value: false,
      visibility: 'HIDDEN'
    }
  ],

  constants: [
    {
      name: 'SHUTDOWN',
      type: 'String',
      value: 'SHUTDOWN'
    },
    {
      name: 'ABORT_SHUTDOWN',
      type: 'String',
      value: 'ABORT_SHUTDOWN'
    }
  ],

  methods: [
    {
      name: 'acceptRequest',
      javaCode: `
        return SHUTDOWN.equals(request) ||
               ABORT_SHUTDOWN.equals(request);
      `
    },
    {
      documentation: 'Request shutdown',
      name: 'handleRequest',
      javaCode: `
      if ( ABORT_SHUTDOWN.equals(request) ) {
        Loggers.logger(x, this).warning("Shutdown abort requested.");
        setAbort(true);
        return;
      }

      Loggers.logger(x, this).warning("Shutdown requested.");

      Thread t = new Thread(this);
      t.setName(getClass().getSimpleName());
      t.setDaemon(false);
      t.start();
      `
    },
    {
      name: 'preCleanup',
      javaCode: `
      try {
        Path existing = Paths.get(getWatchDir(), SHUTDOWN);
        Files.deleteIfExists(existing);
        existing.toFile().deleteOnExit();
      } catch ( IOException e) {
        Loggers.logger(x, this).warning("preCleanup", e);
      }
      `
    },
    {
      name: 'run',
      type: 'void',
      javaCode: `
      Logger logger = StdoutLogger.instance();
      StringBuilder sb = new StringBuilder();
      sb.append("Shutdown ");
      if ( getDelay() > 0 ) {
        sb.append("in ");
        sb.append(String.valueOf(getDelay()));
        sb.append(" seconds");
      } else {
        sb.append(" now");
      }
      logger.warning("ShutdownWatcher", sb.toString());
      try {
        Thread.currentThread().sleep(getDelay() * 1000);
        if ( getAbort() ) {
          logger.warning("ShutdownWatcher", "Shutdown aborted");
        } else {
          logger.warning("ShutdownWatcher", "Shutdown now");
          System.exit(0);
        }
      } catch (InterruptedException e) {
        // cancel shutdown
        logger.warning("ShutdownWatcher", "Shutdown interrupted");
      }
      `
    }
  ]
});
