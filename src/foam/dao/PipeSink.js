/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'PipeSink',
  extends: 'foam.dao.ProxySink',

  properties: [
    'dao'
  ],

  methods: [
    function reset(sub) {
      this.SUPER(sub);
      this.dao.select(this.delegate);
    }
  ]
});
