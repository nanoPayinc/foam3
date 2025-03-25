/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.edit',
  name: 'NullEditBehaviour',
  extends: 'foam.core.crunch.edit.AbstractEditBehaviour',

  methods: [
    {
      name: 'maybeApplyEdit',
      javaCode: `
        return false;
      `
    }
  ]
});
