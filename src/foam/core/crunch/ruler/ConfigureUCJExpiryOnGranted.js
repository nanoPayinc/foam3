/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.ruler',
  name: 'ConfigureUCJExpiryOnGranted',

  implements: [
    'foam.core.ruler.RuleAction'
  ],

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.core.crunch.Capability',
    'foam.core.crunch.CapabilityJunctionStatus',
    'foam.core.crunch.UserCapabilityJunction',
    'foam.core.logger.Logger',
    'foam.core.logger.Loggers',
    'java.util.Calendar',
    'java.util.Date'
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        final var clsName = getClass().getSimpleName();
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            UserCapabilityJunction ucj = (UserCapabilityJunction) obj;

            Capability capability = (Capability) ucj.findTargetId(x);
            if ( capability == null ) {
              Loggers.logger(x, null, clsName).debug("Capability not found for target", ucj.getTargetId());
              return;
            }

            if ( ucj.getExpiry() == null ) {
              ucj.copyFromRenewable(x, capability);
              ucj.setExpiry(ucj.calculateDate(x, null, ucj.getExpiryPeriod(), ucj.getExpiryPeriodTimeUnit()));
            }
          }
        }, "");
      `
    }
  ]
});
