/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.email',
  name: 'EmailMessageStatusRule',
  extends: 'foam.core.ruler.Rule',

  documentation: 'Almost last Rule for setting status to UNSENT',

  // Predicate shall predicate on status == DRAFT
  properties: [
    {
      name: 'action',
      transient: true,
      visibility: 'HIDDEN',
      javaGetter: 'return new EmailMessageStatusRuleAction(getX());'
    }
  ]
});
