/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.benchmark',
  name: 'DateFormatBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.X',
    'foam.core.bench.Benchmark',
    'java.text.SimpleDateFormat'
  ],

  javaCode: `
    protected SimpleDateFormat format_ = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss.SSS");
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
        format_.format(System.currentTimeMillis());
      `
    }
  ]
});
