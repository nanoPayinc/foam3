/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.benchmark',
  name: 'JSONOutputterBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.X',
    'foam.core.auth.Subject',
    'foam.core.auth.User',
    'foam.core.bench.Benchmark',
    'foam.core.bench.BenchmarkResult',
    'foam.lib.json.Outputter'
  ],

  javaCode: `
    protected Outputter o_ = new Outputter(null);
    protected User      u_ = null;
  `,

  methods: [
    {
      name: 'setup',
      args: [
        {
          name: 'x',
          type: 'X'
        },
        {
          name: 'br',
          type: 'BenchmarkResult'
        }
      ],
      javaCode: `
        u_ = ((Subject) x.get("subject")).getUser();
      `
    },
    {
      name: 'execute',
      args: [
        {
          name: 'x',
          type: 'X'
        }
      ],
      javaCode: `
        o_.stringify(u_);
      `
    }
  ]
});

