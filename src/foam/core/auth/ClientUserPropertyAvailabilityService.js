/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.auth',
  name: 'ClientUserPropertyAvailabilityService',

  implements: [
    'foam.core.auth.UserPropertyAvailabilityServiceInterface'
  ],

  properties: [
    {
      class: 'Stub',
      of: 'foam.core.auth.UserPropertyAvailabilityServiceInterface',
      name: 'delegate'
    }
  ]
});
