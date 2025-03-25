/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.test',
  name: 'ClientEchoService',
  properties: [
    {
      class: 'Stub',
      of: 'foam.core.test.EchoService',
      name: 'delegate'
    }
  ]
});
