/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.auth.token',
  name: 'ClientTokenService',

  implements: [
    'foam.core.auth.token.TokenService',
  ],

  requires: [
    'foam.box.SessionClientBox',
    'foam.box.HTTPBox'
  ],

  properties: [
    {
      class: 'String',
      name: 'serviceName'
    },
    {
      class: 'Stub',
      of: 'foam.core.auth.token.TokenService',
      name: 'delegate',
      factory: function () {
        return this.SessionClientBox.create({delegate:this.HTTPBox.create({
          method: 'POST',
          url: this.serviceName
        })});
      },
      swiftFactory: `
return SessionClientBox_create(["delegate": HTTPBox_create([
  "method": "POST",
  "url": serviceName
])])
      `
    }
  ]
});
