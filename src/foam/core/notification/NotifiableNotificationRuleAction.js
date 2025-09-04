/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification',
  name: 'NotifiableNotificationRuleAction',
  implements: [ 'foam.core.ruler.RuleAction' ],

  documentation: `Generate notifications for Notifiable objects.  Recommended to apply as an async action for CREATE_OR_UPDATE dao operations.`,

  methods: [
    {
      name: 'applyAction',
      javaCode: `
agency.submit(x, new foam.lang.ContextAgent() {
  @Override
  public void execute(foam.lang.X x) {
    if (obj instanceof Notifiable notifiable) {
      notifiable.doNotify(x, oldObj);
    }
  }
}, "Notifiable notification rule action");
`
    }
  ]
});


