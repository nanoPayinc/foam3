/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification',
  name: 'NotificationHostnameRuleAction',

  implements: [
    'foam.core.ruler.RuleAction'
  ],

  documentation: 'Set hostname on new Notification',

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.X'
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            Notification notification = (Notification) obj;
            notification.setHostname(System.getProperty("hostname", "localhost"));
          }
        }, "Notification hostname");
      `
    }
  ]
});
