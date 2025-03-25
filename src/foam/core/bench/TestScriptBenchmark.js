/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.bench',
  name: 'TestScriptBenchmark',
  extends: 'foam.core.bench.Benchmark',

  documentation: `Execute a Test script as a benchmark.`,

  javaImports: [
    'foam.core.test.Test'
  ],

  properties: [
    {
      name: 'test',
      class: 'Reference',
      of: 'foam.core.test.Test'
    }
  ],

  methods: [
    {
      name: 'execute',
      javaCode: `
      Test test = (Test) findTest(x);
      if ( test == null ) {
        throw new RuntimeException("Test not found");
      }
foam.core.logger.Loggers.logger(x, this).info("testv", test.getId(), test.getLanguage());
      test.runScript(x);
      if ( test.getFailed() > 0 ) {
        throw new RuntimeException("Test failures: "+test.getFailed());
      }
      if ( test.getPassed() == 0 ) {
        throw new RuntimeException("Test not run");
      }
     `
    }
  ]
});
