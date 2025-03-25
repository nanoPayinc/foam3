/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.auth',
  name: 'EnabledAware',

  properties: [
    {
      class: 'Boolean',
      name: 'enabled'
    }
  ]
});

foam.CLASS({
  package: 'foam.core.auth',
  name: 'EnabledAwareDummy',

  properties: [
    {
      class: 'Long',
      name: 'id'
    },
    {
      class: 'Boolean',
      name: 'enabled'
    }
  ]
});
