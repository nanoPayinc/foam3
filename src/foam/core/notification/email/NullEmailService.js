/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.email',
  name: 'NullEmailService',

  implements: [
    'foam.core.notification.email.EmailService'
  ],

  methods: [
    {
      name: 'sendEmail',
      javaCode: 'return emailMessage;',
      code: function() { return; }
    }
  ]
});
