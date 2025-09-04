/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.benchmark',
  name: 'PMBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.X',
    'foam.core.bench.Benchmark',
    'foam.core.bench.BenchmarkRunner',
    'foam.core.bench.BenchmarkRunner.Builder',
    'foam.core.pm.*',
    'java.util.Map'
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
        PM pm = new PM(foam.core.bench.Benchmark.class, "abc");
        pm.log(x);
      `
    }
  ]
});