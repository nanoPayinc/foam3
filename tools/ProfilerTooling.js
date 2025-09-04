/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.POM({
  name: 'profiler',

  options: {
    profiler: [ '', 'profiler', 'PROFILER', 'Enable JVM profiling', false, function(arg) { PROFILER = arg ? this.bool(arg) : true; }],
    profilerPort: [ '', 'profiler-port', 'PROFILER_PORT', 'Port JVM will listen on for profiler to connect', 8849, () => PROFILER_PORT = args ]
  },

  tasks: {
    buildRunArgs: ['build-run-args', 'Add profiler port',[], function() {
      if ( PROFILER ) RUN_ARGS += ` -P${PROFILER_PORT}`;
    }]
  }
});
