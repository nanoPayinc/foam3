/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.place',
  name: 'ClientPlaceService',

  implements: [
    'foam.core.place.PlaceService'
  ],

  properties: [
    {
      class: 'Stub',
      of: 'foam.core.place.PlaceService',
      name: 'delegate'
    }
  ]
});
