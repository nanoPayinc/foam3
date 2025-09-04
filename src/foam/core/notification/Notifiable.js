
/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.notification',
  name: 'Notifiable',

  documentation: 'A notifiable object can generate notifications when it is written into a DAO.  Apple the NotifiableNotificationRuleAction to the associated DAO to utilize.',

  methods: [
    {
      name: 'doNotify',
      args: [
        { name: 'x', type: 'Context' },
        { name: 'oldObj', type: 'foam.lang.FObject' }
      ]
    }
  ]
});
