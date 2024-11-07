/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.notification.push',
  name: 'PushSetting',
  extends: 'foam.nanos.notification.NotificationSetting',
  label: 'Push Notifications',

  javaImports: [
    'foam.core.Agency',
    'foam.core.ContextAgent',
    'foam.core.FObject',
    'foam.core.X',
    'foam.core.XLocator',
    'foam.nanos.logger.Logger',
    'foam.nanos.logger.Loggers',
    'foam.nanos.notification.push.PushService',
    'foam.util.SafetyUtil'
  ],

  properties: [
    {
      class: 'String',
      name: 'threadPoolName',
      value: 'threadPool'
    }
  ],

  methods: [
    {
      name: 'sendNotification',
      javaCode: `
        Agency agency = (Agency) x.get(getThreadPoolName());
        agency.submit(x, new ContextAgent() {
          public void execute(X x) {
            x = XLocator.get();
            PushService pushService = (PushService) x.get("pushService");
            String title = notification.getToastMessage();    // restricted to 30 chars
            String body  = notification.getToastSubMessage(); // restricted to 60 chars
            if ( SafetyUtil.isEmpty(title) ||
                 SafetyUtil.isEmpty(body) ) {
              // Loggers.logger(x, this).debug("push suppressed, title or body empty");
              return;
            }
            try {
              pushService.sendPush(user, title, body);
            } catch (Throwable t) {
              Loggers.logger(x, this).error(t);
            }
          }
        }, "PushService");
      `
    }
  ]
});
