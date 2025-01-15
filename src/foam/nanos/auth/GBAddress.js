/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'GBAddress',
  extends: 'foam.nanos.auth.Address',

  javaImports: [
    'foam.util.SafetyUtil'
  ],

  properties: [
    {
      name: 'regionId',
      required: false
    }
  ]
});
