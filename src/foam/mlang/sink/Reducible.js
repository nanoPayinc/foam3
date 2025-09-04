/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.mlang.sink',
  name: 'Reducible',

  documentation: `
    Interface for sinks that can be reduced/merged together.
    Implementing classes must provide a reduce method that combines
    another instance into this instance (in-place modification).
  `,

  methods: [
    {
      name: 'reduce',
      args: 'foam.mlang.sink.Reducible other',
      documentation: 'Reduce/merge another sink into this one (modifies in place)'
    }
  ]
});