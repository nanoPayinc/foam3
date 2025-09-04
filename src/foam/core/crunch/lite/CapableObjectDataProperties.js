/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.lite',
  name: 'CapableObjectDataProperties',

  properties: [
    {
      name: 'capablePayloads',
      class: 'FObjectArray',
      // javaType: 'java.util.List<foam.core.crunch.crunchlite.CapablePayload>',
      of: 'foam.core.crunch.CapabilityJunctionPayload',
      columnPermissionRequired: true,
      section: 'capabilityInformation',
      autoValidate: true,
      externalTransient: true,
      createVisibility: 'HIDDEN',
      readVisibility: 'RO',
      updateVisibility: 'RO'
    },
    {
      name: 'userCapabilityRequirements',
      class: 'StringArray',
      columnPermissionRequired: true,
      section: 'capabilityInformation',
      externalTransient: true,
      createVisibility: 'HIDDEN',
      readVisibility: 'RO',
      updateVisibility: 'RO'
    },
    {
      name: 'isWizardIncomplete',
      class: 'Boolean',
      section: 'systemInformation',
      columnPermissionRequired: true,
      transient: true,
      externalTransient: true,
      visibility: 'HIDDEN'
    },
    {
      class: 'StringArray',
      name: 'capabilityIds',
      columnPermissionRequired: true,
      section: 'capabilityInformation',
      externalTransient: true,
      createVisibility: 'HIDDEN',
      readVisibility: 'RO',
      updateVisibility: 'RO'
    },
    {
      class: 'String',
      name: 'DAOKey',
      columnPermissionRequired: true,
      section: 'capabilityInformation',
      externalTransient: true,
      visibility: 'HIDDEN'
    }
  ]
});
