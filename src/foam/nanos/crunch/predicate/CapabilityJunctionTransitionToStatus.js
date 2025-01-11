/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.nanos.crunch.predicate',
  name: 'CapabilityJunctionTransitionToStatus',

  documentation: 'Returns true if the capability of the ucj submitted is transitioning to status defined.',

  javaImports: [
    'foam.dao.DAO',
    'foam.nanos.crunch.CapabilityJunctionStatus',
    'foam.nanos.crunch.UserCapabilityJunction'
  ],

  properties: [
    {
      class: 'Reference',
      name: 'capabilityId',
      of: 'foam.nanos.crunch.Capability',
      documentation: `Used to catch any ucj's with their targetId equaling this value.`,
      menuKeys: ['admin.capabilities']
    },
    {
      name: 'status',
      class: 'Enum',
      of: 'foam.nanos.crunch.CapabilityJunctionStatus',
      documentation: `Status to check compare to the new ucj's status. (ie. ucj's transition to status provided.)`,
      javaFactory: `
        return foam.nanos.crunch.CapabilityJunctionStatus.PENDING;
      `
    }
  ],

  ruleF: `
    UserCapabilityJunction old = (UserCapabilityJunction) o;
    UserCapabilityJunction ucj = (UserCapabilityJunction) n;

    return ( old == null || old != null && old.getStatus() != ucj.getStatus() ) &&
      ucj.getStatus() == getStatus() &&
      ucj.getTargetId().equals(getCapabilityId());
  `
});
