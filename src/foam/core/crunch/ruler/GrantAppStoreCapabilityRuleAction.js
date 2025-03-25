/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.ruler',
  name: 'GrantAppStoreCapabilityRuleAction',

  documentation: 'Grant App Store capability when referralFee userCapabilityJunction created',

  implements: [
    'foam.core.ruler.RuleAction'
  ],

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.core.auth.User',
    'foam.core.crunch.UserCapabilityJunction',
    'foam.core.crunch.CapabilityJunctionStatus',
    'foam.core.crunch.CrunchService',
    'foam.core.logger.Logger'
  ],

  properties: [
    {
      class: 'String',
      name: 'capability'
    }
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            Logger logger = (Logger) x.get("logger");
            UserCapabilityJunction ucj = (UserCapabilityJunction) obj;
            CrunchService crunchService = (CrunchService) x.get("crunchService");
            User user = ucj.findSourceId(x);
            if ( foam.util.SafetyUtil.isEmpty(getCapability()) ) {
              logger.error("Capability is not provided for GrantAppStoreCapabilityRuleAction");
              return;
            }
            crunchService.updateJunctionFor(x, getCapability(), null, CapabilityJunctionStatus.GRANTED, user, user);

          }
        }, "Grant AppStore capability when user gets capability");
      `
    }
  ]
})
