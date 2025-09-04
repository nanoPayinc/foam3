/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.fs',
  name: 'Watcher',
  abstract: true,
  implements: [
    'foam.lang.ContextAgent',
    'foam.core.COREService'
  ],

  documentation: `Monitor directory for the apperance of a file,
process the file name as a 'request',
and finally remove the file if it was 'handled'.
`,

  javaImports: [
    'foam.core.app.AppConfig',
    'foam.core.logger.Logger',
    'foam.core.logger.Loggers',
    'foam.dao.DAO',
    'foam.lang.Agency',
    'foam.lang.AgencyTimerTask',
    'foam.lang.ContextAgent',
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.util.SafetyUtil',
    'java.util.Timer',
    'java.io.File',
    'java.io.IOException',
    'java.nio.file.Files',
    'java.nio.file.Path',
    'java.nio.file.Paths',
    'java.nio.file.FileSystem',
    'java.nio.file.FileSystems',
    'java.nio.file.WatchEvent',
    'java.nio.file.WatchKey',
    'java.nio.file.WatchService',
    'java.nio.file.StandardWatchEventKinds'
  ],

  properties: [
    {
      name: 'tmpDir',
      class: 'String',
      javaFactory: `
      return System.getProperty("java.io.tmpdir", "tmp");
      `
    },
    {
      documentation: 'Create unique tmp directory for this watcher',
      name: 'watchDir',
      class: 'String',
      javaFactory: `
      AppConfig appConfig = (AppConfig) getX().get("appConfig");
      String appName = appConfig.getName().trim().replaceAll(" ","");
      String hostname = System.getProperty("hostname", "localhost");
      if ( hostname.equals("localhost") ) {
        hostname = System.getProperty("user.name", "localhost");
      }
      String name = getClass().getSimpleName().replace("Watcher","").toLowerCase();
      Path path = FileSystems.getDefault().getPath(getTmpDir(), hostname, appName, name);
      return path.toString();
      `
    },
    {
      name: 'initialTimerDelay',
      class: 'Int',
      value: 5000
    },
    {
      name: 'threadPoolName',
      class: 'String',
      value: 'threadPool'
    },
    {
      documentation: 'Store reference to timer so it can be cancelled, and agent restarted.',
      name: 'timer',
      class: 'Object',
      visibility: 'HIDDEN',
      networkTransient: true
    }
 ],

  methods: [
    {
      documentation: 'Start as a COREService',
      name: 'start',
      javaCode: `
      Timer timer = new Timer(this.getClass().getSimpleName(), true);
      setTimer(timer);
      timer.schedule(
        new AgencyTimerTask(getX(), getThreadPoolName(), this),
        getInitialTimerDelay());
      `
    },
    {
      name: 'execute',
      args: 'Context x',
      javaCode: `
      Logger logger = Loggers.logger(x, this);
      logger.info("execute", getWatchDir());


      try {
        mkdirs(x, getWatchDir());

        preCleanup(x);

        WatchService watchService = FileSystems.getDefault().newWatchService();
        Path path = Paths.get(getWatchDir());
        path.register(
          watchService,
          StandardWatchEventKinds.ENTRY_CREATE
        );

        WatchKey key;
        while ((key = watchService.take()) != null) {
          for (WatchEvent<?> event : key.pollEvents()) {
            if ( event.kind() == StandardWatchEventKinds.ENTRY_CREATE ) {
              String request = event.context().toString();
              logger.info("Detected", request);
              try {
                if ( acceptRequest(x, request) ) {
                  handleRequest(x, request);
                } else {
                  logger.warning("Rejected", request);
                }
                postCleanup(x, request);
              } catch (Throwable t) {
                logger.warning(t);
              }
            }
          }
          key.reset();
        }
        logger.info("exit");
      } catch (IOException e) {
        logger.error("exit", e);
      } catch (InterruptedException e) {
        // noop
      }
      `
    },
    {
      documentation: 'Return true if this agent can process the event',
      name: 'acceptRequest',
      args: 'X x, String request',
      type: 'Boolean',
      javaCode: `
        throw new UnsupportedOperationException("Abstract method not implemented: "+this.getClass().getSimpleName() + ".acceptRequest");
      `
    },
    {
      documentation: 'Process the event',
      name: 'handleRequest',
      args: 'X x, String request',
      javaCode: `
        throw new UnsupportedOperationException("Abstract method not implemented: "+this.getClass().getSimpleName() + ".handleRequest");
      `
    },
    {
      documentation: 'Cleanup on system start.',
      name: 'preCleanup',
      args: 'X x',
      javaCode: `
        // nop
      `
    },
    {
      documentation: 'Cleanup after accepting the request for processing',
      name: 'postCleanup',
      args: 'X x, String request',
      javaCode: `
      try {
        Path existing = Paths.get(getWatchDir(), request);
        Files.deleteIfExists(existing);
        existing.toFile().deleteOnExit();
      } catch ( IOException e) {
        Loggers.logger(x, this).warning(e);
      }
      `
    },
    {
      name: 'mkdirs',
      args: 'X x, String name',
      javaCode: `
      File dir = new File(name);
      if ( ! dir.exists() ) {
        if ( ! dir.mkdirs() ) {
          Loggers.logger(x, this).error("Failed directory creation", name);
          throw new RuntimeException(this.getClass().getSimpleName() + " Failed watch directory creation");
        }
      }
      `
    }
  ]
});
