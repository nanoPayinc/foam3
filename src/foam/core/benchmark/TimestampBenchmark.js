/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.benchmark',
  name: 'TimestampBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.X',
    'foam.core.bench.Benchmark',
    'foam.util.FastTimestamper',
    'foam.util.SyncFastTimestamper'
  ],

  javaCode: `
    protected FastTimestamper ts_ = new SyncFastTimestamper();
  `,

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
        ts_.createTimestamp();
      `
    }
  ]
});