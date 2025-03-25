/**
* @license
* Copyright 2024 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.core.place',
  name: 'PlaceDetailResp',
  
  properties: [
    {
      name: "result",
      shortName: 'result',
      class: "FObjectProperty",
      of: "foam.core.place.PlaceDetailResult"
    }
  ]
})