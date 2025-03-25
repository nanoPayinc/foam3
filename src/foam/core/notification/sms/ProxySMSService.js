/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.sms',
  name: 'ProxySMSService',

  documentation: 'This class is used for the purpose of decorating the sms(service)',

  implements: [
    'foam.core.notification.sms.SMSService'
  ],

  properties: [
    {
      class: 'Proxy',
      of: 'foam.core.notification.sms.SMSService',
      name: 'delegate'
    }
  ]
});
