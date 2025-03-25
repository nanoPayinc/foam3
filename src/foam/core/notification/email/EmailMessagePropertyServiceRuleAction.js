/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.email',
  name: 'EmailMessagePropertyServiceRuleAction',
  implements: [ 'foam.core.ruler.RuleAction' ],

  documentation: 'Rule Action for passing EmailMessage through EmailPropertyService',

  javaImports: [
    'foam.lang.X',
    'foam.core.app.AppConfig',
    'foam.core.auth.User',
    'foam.core.auth.Group',
    'foam.core.logger.Loggers',
    'foam.core.notification.email.EmailMessage',
    'java.util.HashMap',
    'java.util.Map'
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
      var emailMessage = (EmailMessage) obj;

      try {
        EmailPropertyService service = (EmailPropertyService) x.get("emailPropertyService");
        service.apply(x, null, emailMessage, null);
      } catch (Exception e) {
        Loggers.logger(x, this).warning("EmailPropertyService", e.getMessage(), e);
        throw new RuntimeException("EmailPropertyService error: "+e.getMessage());
      }

      emailMessage.setBody(emailMessage.getBody().replaceAll("\\\\.svg", ".png"));
     `
    }
  ]
});
