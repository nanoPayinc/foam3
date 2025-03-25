/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.bench',
  name: 'Benchmark',
  classIsFinal: false,
  implements: [ 'foam.lang.ContextAgent' ],

  abstract: true,

  javaImports: [
    'foam.lang.X'
  ],

  properties: [
    {
      class: 'String',
      name: 'id',
      createVisibility: 'RW',
      updateVisibility: 'RO'
    },
    {
      class: 'String',
      name: 'name',
      factory: function() {
        return this.type;
      },
      javaFactory: `
        return getType();
      `
    },
    {
      class: 'String',
      name: 'type',
      tableWidth: 190,
      storageTransient: true,
      getter: function() {
         return this.cls_.name;
      },
      javaToCSVLabel: 'outputter.outputValue("Type");',
      javaGetter: `
        return getClass().getSimpleName();
      `,
      createVisibility: 'HIDDEN',
      updateVisibility: 'RO'
    },
  ],

  methods: [
    {
      name: 'setup',
      type: 'Void',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'br',
          type: 'foam.core.bench.BenchmarkResult'
        }
      ],
      javaCode: `
        // noop
      `
    },
    {
      name: 'teardown',
      type: 'Void',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'br',
          type: 'foam.core.bench.BenchmarkResult'
        }
      ],
      javaCode: `
        // noop
      `
    }
  ]
});
