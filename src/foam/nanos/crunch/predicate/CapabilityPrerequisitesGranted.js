/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.nanos.crunch.predicate',
  name: 'CapabilityPrerequisitesGranted',

  documentation: 'Returns true if the prerequisites of a capability on a ucj are granted',

  javaImports: [
    'foam.nanos.crunch.Capability',
    'foam.nanos.crunch.CapabilityJunctionStatus',
    'foam.nanos.crunch.UserCapabilityJunction'
  ],

  ruleF: `
    UserCapabilityJunction ucj        = (UserCapabilityJunction) n;
    Capability             capability = (Capability) ucj.findTargetId(x);

    return capability.getPrereqsChainedStatus(x, ucj) == CapabilityJunctionStatus.GRANTED;
  `
});
