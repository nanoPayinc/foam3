/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'JSONSink',
  extends: 'foam.dao.ArraySink',

  methods: [
    function addToE(e) {
      e.start('pre').add(foam.json.Pretty.stringify(this.array));
    }
  ]
});
