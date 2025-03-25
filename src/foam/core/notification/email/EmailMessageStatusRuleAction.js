/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.email',
  name: 'EmailMessageStatusRuleAction',
  implements: [ 'foam.core.ruler.RuleAction' ],

  documentation: 'Almost last Rule Action for setting status to UNSENT',

  javaImports: [
    'foam.core.notification.email.EmailMessage',
    'foam.core.notification.email.Status',
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
      var emailMessage = (EmailMessage) obj;
      emailMessage.setStatus(Status.UNSENT);
     `
    }
  ]
});
