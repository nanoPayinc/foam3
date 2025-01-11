/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.nanos.crunch.predicate',
  name: 'IsCapabilityJunctionOf',

  documentation: 'Returns true if the ucj object of a specific capability and user class',

  javaImports: [
    'foam.nanos.crunch.UserCapabilityJunction'
  ],

  properties: [
    {
      class: 'String',
      name: 'capabilityId'
    },
    {
      class: 'Class',
      name: 'of',
      documentation: 'Expected class of the ucj.source_id reference. Eg. foam.nanos.auth.User'
    }
  ],

  ruleF: `
    var ucj = (UserCapabilityJunction) n;
    return ucj.getTargetId().equals(getCapabilityId())
      && ucj.findSourceId(x).getClass() == getOf().getObjClass();
  `
});
