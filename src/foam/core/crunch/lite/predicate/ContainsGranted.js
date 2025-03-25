/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.core.crunch.lite.predicate',
  name: 'ContainsGranted',

  javaImports: [
    'foam.core.crunch.lite.Capable',
    'static foam.core.crunch.CapabilityJunctionStatus.*',
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
