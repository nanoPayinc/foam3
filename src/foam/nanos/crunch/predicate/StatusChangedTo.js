/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.nanos.crunch.predicate',
  name: 'StatusChangedTo',

  javaImports: [
    'foam.dao.DAO',
    'foam.nanos.crunch.CrunchService',
    'foam.nanos.crunch.UserCapabilityJunction',
    'static foam.nanos.crunch.CapabilityJunctionStatus.*',
  ],

  properties: [
    {
      name: 'status',
      class: 'Enum',
      of: 'foam.nanos.crunch.CapabilityJunctionStatus'
    },
    {
      name: 'checkInequality',
      class: 'Boolean',
      value: true
    }
  ],

  ruleF: `
    UserCapabilityJunction oldUCJ = (UserCapabilityJunction) o;
    UserCapabilityJunction newUCJ = (UserCapabilityJunction) n;

    if ( getCheckInequality() && oldUCJ != null ) {
      if ( oldUCJ.getStatus() == newUCJ.getStatus() ) return false;
    }

    return newUCJ.getStatus() == getStatus();
  `
});
