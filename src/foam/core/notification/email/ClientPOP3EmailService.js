/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.email',
  name: 'ClientPOP3EmailService',

  implements: [
    'foam.core.notification.email.POP3Email'
  ],

  properties: [
    {
      class: 'Stub',
      of: 'foam.core.notification.email.POP3Email',
      name: 'delegate'
    }
  ]
});