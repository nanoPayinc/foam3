/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.mlang.sink',
  name: 'Average',
  extends: 'foam.mlang.sink.AbstractUnarySink',

  documentation: 'A Sink which averages put() values.',

  properties: [
    {
      class: 'foam.mlang.ExprProperty',
      name: 'arg1'
    },
    {
      class: 'Double',
      name: 'value',
      value: 0
    },
    {
      class: 'Long',
      name: 'count',
      value: 0
    }
  ],

  methods: [
    {
      name: 'put',
      code: function put(obj, sub) {
        this.count++;
        this.value = ( this.value * (this.count-1) + this.arg1.f(obj) ) / this.count;
      },
      javaCode: `
setCount(getCount() + 1);
setValue((getValue() * ( getCount()-1) + ((Number)this.getArg1().f(obj)).doubleValue()) / getCount());
      `,
    },
    function toSummary() { return this.value; },
    function addToE(e) { e.add(this.value); }
  ]
});
