/**
* @license
* Copyright 2024 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.core.notification.push',
  name: 'APNSCredential',
  extends: 'foam.core.auth.Credential',

  implements: [
    'foam.core.auth.ServiceProviderAware'
  ],

  properties: [
    {
      class: 'String',
      name: 'id'
    },
    {
      class: 'String',
      name: 'host'
    },
    {
      class: 'String',
      name: 'p12Base64',
      documentation: 'base64 encoded p12 file'
    },
    {
      class: 'String',
      name: 'p12Password',
      documentation: 'password for p12 file'
    },
    {
      class: 'String',
      name: 'certificateAlias'
    },
    {
      class: 'String',
      name: 'keyAlias'
    },
    {
      class: 'String',
      name: 'appBundleId'
    }
  ]
});
