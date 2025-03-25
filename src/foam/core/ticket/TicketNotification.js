/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.ticket',
  name: 'TicketNotification',
  extends: 'foam.core.notification.Notification',

  properties: [
    {
      class: 'Reference',
      of: 'foam.core.ticket.Ticket',
      name: 'ticket'
    }
  ]
});
