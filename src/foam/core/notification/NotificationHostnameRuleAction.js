/**
 * @license
 * Copyright 2020 nanopay Inc. All Rights Reserved.
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
