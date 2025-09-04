/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.view',
  name: 'SimpleStringArrayView',
  extends: 'foam.u2.TextField',

  documentation: 'A simple StringArray View that displays values in a single TextField as a comma-separated list.',

  properties: [
    {
      name: 'data',
      preSet: function(o, n) { return n; }
    }
  ],

  methods: [
    function link() {
      function fPrime(a) { return a ? a.join(',') : ''; }
      function f(s) { return s ? s.split(',').map(s => s.trim()) : []; }
      var slot = this.attrSlot(null, this.onKey ? 'input' : null);

//      slot.follow(this.data$.map(a => a ? a.join(',') : ''));
      slot.relateFrom(this.data$, f, fPrime);
    }
  ]
});
