/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'CitationSink',
  extends: 'foam.dao.ArraySink',

  requires: [ 'foam.u2.CitationView' ],

  methods: [
    function addToE(e) {
      this.array.forEach(o => e.tag(this.CitationView, {data: o}));
    }
  ]
});
