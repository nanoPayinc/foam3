/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.auth.twofactor',
  name: 'ClientOTPAuthService',

  implements: [
    'foam.core.auth.twofactor.OTPAuthService'
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
      of: 'foam.core.auth.twofactor.OTPAuthService',
      name: 'delegate',
      factory: function () {
        return this.SessionClientBox.create({
          delegate: this.HTTPBox.create({
            method: 'POST',
            url: this.serviceName
          })
        });
      }
    }
  ]
});
