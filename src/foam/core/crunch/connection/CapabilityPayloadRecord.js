/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.connection',
  name: 'CapabilityPayloadRecord',
  documentation: `
    Recording of CapabilityPayload requests.
  `,

  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.CreatedByAware'
  ],

  properties: [
    {
      name: 'id',
      class: 'String'
    },
    {
      class: 'FObjectProperty',
      name: 'capabilityPayload',
      of: 'foam.core.crunch.connection.CapabilityPayload'
    },
    {
      class: 'DateTime',
      name: 'created'
    },
    {
      class: 'Reference',
      of: 'foam.core.auth.User',
      name: 'createdBy'
    },
    {
      class: 'Reference',
      of: 'foam.core.auth.User',
      name: 'createdByAgent'
    }
  ]
});