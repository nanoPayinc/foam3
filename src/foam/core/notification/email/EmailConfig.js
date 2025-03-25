/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.email',
  name: 'EmailConfig',

  implements: [
    'foam.core.auth.ServiceProviderAware'
  ],

  ids: ['spid'],

  properties: [
    {
      class: 'Reference',
      of: 'foam.core.auth.ServiceProvider',
      name: 'spid'
    },
    {
      class: 'String',
      name: 'from'
    },
    {
      class: 'String',
      name: 'displayName'
    },
    {
      class: 'String',
      name: 'replyTo'
    }
  ]
});
