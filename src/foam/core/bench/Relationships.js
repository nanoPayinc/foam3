/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RELATIONSHIP({
  sourceModel: 'foam.core.bench.BenchmarkRunner',
  targetModel: 'foam.core.bench.BenchmarkResult',
  forwardName: 'benchmarkResults',
  inverseName: 'owner',
  cardinality: '1:*',
  sourceProperty: {
    section: 'benchmarkResultsSection',
    createVisibility: 'HIDDEN',
    updateVisibility: 'RO',
    readVisibility: 'RO'
  },
  targetProperty: {
    label: 'Benchmark Runner',
    createVisibility: 'HIDDEN',
    updateVisibility: 'RO',
    readVisibility: 'RO'
  }
});
