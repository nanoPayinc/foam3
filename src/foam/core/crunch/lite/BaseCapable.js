/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.lite',
  name: 'BaseCapable',

  implements: [
    'foam.core.crunch.lite.Capable'
  ],
  mixins: [
    'foam.core.crunch.lite.CapableObjectData'
  ]
});
