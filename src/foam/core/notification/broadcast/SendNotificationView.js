/**
* @license
* Copyright 2022 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.core.notification.broadcast',
  name: 'SendNotificationView',
  extends: 'foam.u2.View',

  requires: [
    'foam.core.notification.broadcast.BroadcastNotificationFacade',
    'foam.core.notification.NotificationRowView',
    'foam.core.notification.broadcast.BroadcastNotification',
    'foam.u2.stack.BreadcrumbView',
    'foam.u2.layout.Rows',
    'foam.u2.borders.CardBorder',
    'foam.u2.detail.VerticalDetailView'
  ],
  imports: [
    'notificationDAO'
  ],

  // Make an abstract SummaryView with this CSS and props for title and primary action,
  // everything else can be populated by the parent view, maybe a border??
  css: `
    ^ {
      padding: 32px;
    }
    ^container > * + * {
      margin-top: 32px;
    }
    ^button {
      align-self: flex-end;
    }
  `,

  properties: [
    {
      name: 'data',
      factory: function() {
        return this.BroadcastNotificationFacade.create();
      }
    }
  ],
  methods: [
    function render() {
      this.data.created = new Date();
      this
      .addClass()
      .start(this.Rows)
        .addClass(this.myClass('container'))
        .start()
          .add('Send Notifications')
          .addClass('h100')
        .end()
        .start(this.CardBorder)
          .addClass(this.myClass('sectionWrapper'))
          .tag(this.VerticalDetailView, { data$: this.data$ })
          .start().add('Preview').addClass('p-semiBold').end()
          .start(this.NotificationRowView, { data$: this.data$, of: this.BroadcastNotification.id })
            .addClass(this.myClass('button'))
          .end()
        .end()
      .end();
    }
  ]
});

