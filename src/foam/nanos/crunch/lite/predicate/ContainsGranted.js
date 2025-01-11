/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.nanos.crunch.lite.predicate',
  name: 'ContainsGranted',

  javaImports: [
    'foam.nanos.crunch.lite.Capable',
    'static foam.nanos.crunch.CapabilityJunctionStatus.*',
  ],

  properties: [
    {
      class: 'String',
      name: 'capability'
    }
  ],

  ruleF: `
    var capableObj = (Capable) n;

    for ( var payload : capableObj.getCapablePayloads() ) {
      if ( ! payload.getCapability().equals(getCapability()) ) continue;
      if ( payload.getStatus() == GRANTED ) return true;
      break;
    }

    return false;
  `
});
