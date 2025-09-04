/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.benchmark',
  name: 'JSONOutputterEscapeBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.X',
    'foam.core.bench.Benchmark',
    'foam.lib.json.Outputter'
  ],

  javaCode: `
    protected Outputter out_ = new Outputter(null);
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
        for ( int i = 0 ; i < 1000 ; i++ ) {
          out_.escape("abcdefg\\n\\t\\u2605\\u0007xjxjxjxjxjxjxjxjxjxj");
        }
      `
    }
  ]
});
