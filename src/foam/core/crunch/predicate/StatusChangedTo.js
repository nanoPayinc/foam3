/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.core.crunch.predicate',
  name: 'StatusChangedTo',

  javaImports: [
    'foam.dao.DAO',
    'foam.core.crunch.CrunchService',
    'foam.core.crunch.UserCapabilityJunction',
    'static foam.core.crunch.CapabilityJunctionStatus.*',
  ],

  properties: [
    {
      name: 'status',
      class: 'Enum',
      of: 'foam.core.crunch.CapabilityJunctionStatus'
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
