/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.reflow',
  name: 'ViewSink',
  extends: 'foam.dao.ArraySink',

  methods: [
    function addToE(e) {
      e = e.startContext({controllerMode: foam.u2.ControllerMode.VIEW});
      this.array.forEach(o => e.add(o));
    }
  ]
});
