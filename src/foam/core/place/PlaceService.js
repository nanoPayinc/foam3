/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.place',
  name: 'PlaceService',

  skeleton: true,

  methods: [
    {
      name: 'placeAutocomplete',
      async: true,
      args: 'Context x, String input, String preferCountry',
      type: 'foam.core.place.PlaceAutocompleteResp',
    },
    {
      name: 'placeDetail',
      async: true,
      args: 'Context x, String placeId',
      type: 'foam.core.place.PlaceDetailResp',
    }
  ]
})