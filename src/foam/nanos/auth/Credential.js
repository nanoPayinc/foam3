/**
 * NANOPAY CONFIDENTIAL
 *
 * [2023] nanopay Corporation
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of nanopay Corporation.
 * The intellectual and technical concepts contained
 * herein are proprietary to nanopay Corporation
 * and may be covered by Canadian and Foreign Patents, patents
 * in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from nanopay Corporation.
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'Credential',
  documentation: 'Model to represent a credential.',

  implements: [
    'foam.nanos.auth.CreatedAware',
    'foam.nanos.auth.CreatedByAware',
    'foam.nanos.auth.EnabledAware',
    'foam.nanos.auth.LastModifiedAware',
    'foam.nanos.auth.LastModifiedByAware',
    'foam.nanos.auth.ServiceProviderAware'
  ],

  searchColumns: [
    'id',
    'type',
    'spid',
    'serviceName'
  ],

  tableColumns: [
    'id',
    'type',
    'spid',
    'serviceName',
    'useMock',
    'created'
  ],

  properties: [
    {
      class: 'String',
      name: 'id',
      order: 1,
      createVisibility: 'RW',
      readVisibility: 'RO',
      updateVisibility: 'RO',
    },
    {
      class: 'String',
      name: 'type',
      order: 2,
      visibility: 'RO',
      storageTransient: true,
      clusterTransient: true,
      getter: function() {
        return this.cls_.name;
      },
      javaGetter: `
        return getClass().getSimpleName();
      `
    },
    {
      class: 'Boolean',
      name: 'enabled',
      order: 3,
      value: true
    },
    {
      class: 'String',
      name: 'serviceName'
    },
    {
      class: 'String',
      name: 'url'
    },
    {
      class: 'String',
      name: 'username',
      includeInDigest: true
    },
    {
      class: 'String',
      name: 'password',
      includeInDigest: true
    },
    {
      class: 'Boolean',
      name: 'useMock'
    }
  ]
});
