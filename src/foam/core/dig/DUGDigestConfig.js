/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
foam.CLASS({
  package: 'foam.core.dig',
  name: 'DUGDigestConfig',
  documentation: 'DUG config for adding a hashed secretKey to webhook headers',

  implements: [
    'foam.core.auth.EnabledAware',
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
      class: 'Boolean',
      name: 'enabled'
    },
    {
      class: 'String',
      name: 'algorithm',
      value: 'SHA-256'
    },
    {
      class: 'Password',
      name: 'secretKey'
    }
  ]
});
