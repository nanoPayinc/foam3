/**
* @license
* Copyright 2022 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.core.notification.broadcast',
  name: 'BroadcastNotification',
  extends: 'foam.core.notification.Notification',

  tableColumns: [
    'id',
    'body',
    'notificationType',
    'broadcasted',
    'createdBy.userName'
  ],
});
