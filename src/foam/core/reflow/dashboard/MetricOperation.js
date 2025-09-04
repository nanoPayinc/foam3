/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.ENUM({
  package: 'foam.core.reflow.dashboard',
  name: 'MetricOperation',

  documentation: 'Operations available for dashboard metrics',

  requires: [
    'foam.mlang.sink.Count',
    'foam.mlang.sink.Sum',
    'foam.mlang.sink.Min',
    'foam.mlang.sink.Max',
    'foam.mlang.sink.Average'
  ],

  properties: [
    {
      name: 'createSink',
      value: function(valueProp) {
        console.warn('createSink not implemented for MetricOperation', this.name);
      }
    }
  ],

  values: [
    { 
      name: 'COUNT', 
      label: 'Count',
      createSink: function(valueProp) {
        return this.Count.create();
      }
    },
    { 
      name: 'SUM',   
      label: 'Sum',
      createSink: function(valueProp) {
        return this.Sum.create({ arg1: valueProp });
      }
    },
    { 
      name: 'MIN',   
      label: 'Min',
      createSink: function(valueProp) {
        return this.Min.create({ arg1: valueProp });
      }
    },
    { 
      name: 'MAX',   
      label: 'Max',
      createSink: function(valueProp) {
        return this.Max.create({ arg1: valueProp });
      }
    },
    { 
      name: 'AVG',   
      label: 'Avg',
      createSink: function(valueProp) {
        return this.Average.create({ arg1: valueProp });
      }
    }
  ]
});