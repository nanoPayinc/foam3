/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.benchmark',
  name: 'JSONUtilEscapeBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.X',
    'foam.core.bench.Benchmark'
  ],

  javaCode: `
    protected StringBuilder b_ = new StringBuilder();
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
        b_.setLength(0);
        for ( int i = 0 ; i < 1000 ; i++ ) {
          foam.lib.json.Util.escape("abcdefg\\n\\t\\u2605\\u0007xjxjxjxjxjxjxjxjxjxj", b_);
        }
      `
    }
  ]
});