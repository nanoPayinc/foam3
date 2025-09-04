/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.push',
  name: 'PushRegistration',

  tableColumns: [ 'endpoint', 'user' ],

  ids: [ 'session' ],

  properties: [
    {
      // primary key
      class: 'String',
      name: 'endpoint'
    },
    {
      class: 'String',
      name: 'key'
    },
    {
      class: 'String',
      name: 'auth'
    },
    {
      class: 'String',
      name: 'lastKnownState'
    },
    {
      class: 'String',
      name: 'session'
    }
  ],

  actions: [
    {
      name: 'sendTestPush',
      code: function(x) {
        x.pushService.sendPushById(this.user, "test", "push", { "launchRoute": "nbp.transactions" })
      }
    }
  ]
});


foam.RELATIONSHIP({
  cardinality: '1:*',
  sourceModel: 'foam.core.auth.User',
  forwardName: 'pushRegistrations',
  targetModel: 'foam.core.notification.push.PushRegistration',
  inverseName: 'user',
  sourceProperty: {
    hidden: true
  },
  /*
  targetProperty: {
    view: { class: 'foam.u2.view.ReferenceView', placeholder: '--' },
    menuKeys: ['admin.groups']
  }
  */
});
