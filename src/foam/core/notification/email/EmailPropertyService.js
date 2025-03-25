/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.notification.email',
  name: 'EmailPropertyService',

  methods: [
    {
      name: 'apply',
      type: 'foam.core.notification.email.EmailMessage',
      javaThrows: ['NoSuchFieldException'],
      args: [
        {
          name: 'x',
          type: 'Context',
        },
        {
          name: 'group',
          class: 'String',
          documentation: 'group of user whose the recipient of the email being sent'
        },
        {
          name: 'emailMessage',
          type: 'foam.core.notification.email.EmailMessage',
          documentation: 'Email message'
        },
        {
          name: 'templateArgs',
          type: 'Map',
          documentation: 'Template arguments'
        }
      ],
    }
  ]
});
