/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification',
  name: 'ScriptRunNotification',
  extends: 'foam.core.notification.Notification',

  properties: [
    {
      class: 'String',
      name: 'scriptId'
    }
  ]
});
