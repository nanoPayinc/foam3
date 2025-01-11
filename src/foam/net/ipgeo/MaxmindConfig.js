/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.net.ipgeo',
  name: 'MaxmindConfig',

  properties: [
    {
      class: 'String',
      name: 'accountId',
    },
    {
      class: 'String',
      name: 'licenseKey'
    },
    {
      class: 'String',
      name: 'path'
    },
    {
      class: 'String',
      name: 'scriptPath'
    }
  ]
});
