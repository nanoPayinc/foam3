/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.app',
  name: 'SupportConfig',

  documentation: 'Support configuration for email',

  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.core.notification.email.EmailConfig',
      name: 'emailConfig',
      view: 'foam.u2.view.OptionalFObjectView'
    },
    {
      class: 'String',
      name: 'supportEmail'
    },
    {
      class: 'String',
      name: 'supportPhone'
    },
    {
      class: 'URL',
      name: 'supportLink'
    },
    {
      class: 'Reference',
      of: 'foam.core.auth.User',
      name: 'personalSupportUser'
    },
    {
      class: 'FObjectProperty',
      of: 'foam.core.auth.Address',
      name: 'supportAddress',
      factory: function() {
        return foam.core.auth.Address.create({}, this);
      }
    },
    {
      class: 'String',
      name: 'supportLogo'
    }
  ]
});
