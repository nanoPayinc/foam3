/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.test',
  name: 'DAONotificationTest',
  extends: 'foam.core.test.Test',

  documentation: 'Test DAONotificationRuleAction generates an email',

  javaImports: [
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.dao.MDAO',
    'foam.dao.ArraySink',
    'foam.dao.Sink',
    'foam.core.auth.Country',
    'foam.core.auth.User',
    'foam.core.notification.email.EmailMessage',
    'foam.util.Auth',
    'java.util.ArrayList',
    'java.util.List'
  ],

  methods: [
    {
      name: 'setUp',
      args: 'X x',
      javaCode: `
      // see deployment/test for 
      // groups, users, 
      // emailTemplate, notificationTemplate
      // notificationSettings, ... 
      `
    },
    {
      name: 'runTest',
      javaCode: `
      setUp(x);

      // update as test-fraud-ops user.
//      User user = (User) ((DAO) x.get("userDAO")).find(1012L);
//      X y = Auth.sudo(x, user);

      DAO countryDAO = (DAO) x.get("countryDAO");
      Country country = (Country) countryDAO.find("CA");
      country = (Country) country.fclone();
      country.setName("Canada Eh!");
      country = (Country) countryDAO.put_(x, country);

      // test for email
      DAO emailMessageDAO = (DAO) x.get("emailMessageDAO");
      EmailMessage message = null;

      // notifications to group submitted to agency, so may have to wait for it
      int loop = 0;
      int maxLoops = 10;
      boolean found = false;
      while ( ! found && loop < maxLoops ) {
        loop += 1;

        List<EmailMessage> emailMessages = (List) ((ArraySink) emailMessageDAO.select(new ArraySink())).getArray();
        for ( EmailMessage msg : emailMessages ) {
          if ( msg.getSubject().contains("DAONotificationEmailTemplateTest") ) {
            message = msg;
            break;
          }
        }
        try {
          Thread.currentThread().sleep(100L);
        } catch (InterruptedException e) {
          break;
        }
      }
      test( message != null, (message == null ? "message is null" : "email subject has expected text: DAONotifcationEmailTemplateTest ["+message.getSubject()+"] body: ["+message.getBody()+"] message: "+message.toString()));
      `
    }
  ]
});
