/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.mlang',
  name: 'Round',

  properties: [
    {
      class: 'foam.mlang.ExprProperty',
      name: 'delegate'
    },
    {
      class: 'Int',
      name: 'decimals'
    }
  ],

  methods: [
    {
      name: 'f',
      code: function(obj) {
        return (this.delegate.f(obj)).toFixed(this.decimals);
      }
    }
  ]
});
