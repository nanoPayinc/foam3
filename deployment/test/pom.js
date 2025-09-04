foam.POM({
  name:'test',
  tasks: [
    function buildJavaOpts() {
      var logLevelLower = 'info';
      if ( LOG_LEVEL ) {
        JAVA_OPTS += ` -Dlog.level=${LOG_LEVEL}`;
        logLevelLower = `${LOG_LEVEL}`.toLowerCase();
      }
      JAVA_OPTS += ` -Dorg.slf4j.simpleLogger.defaultLogLevel=${logLevelLower}`;
    }
  ]
});
