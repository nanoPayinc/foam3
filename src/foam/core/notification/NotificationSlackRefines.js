/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
foam.CLASS({
  package: 'foam.core.notification',
  name: 'NotificationSlackRefines',
  refines: 'foam.core.notification.Notification',

  properties: [
    {
      class: 'String',
      name: 'slackWebhook',
      documentation: 'Webhook associated to Slack.'
    },
    {
      class: 'String',
      name: 'slackMessage',
      documentation: 'Message to be sent to Slack.'
    }
  ]
});
