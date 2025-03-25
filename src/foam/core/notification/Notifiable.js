
/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.notification',
  name: 'Notifiable',

  documentation: `
    A model should implement this interface if its objects can opt into receiving notifications.
  `,

  methods: [
    {
      name: 'doNotify',
      args: [
        { name: 'x', type: 'Context' },
        { name: 'notification', type: 'foam.core.notification.Notification' }
      ]
    }
  ]
});
