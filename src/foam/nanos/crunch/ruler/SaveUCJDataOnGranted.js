/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.crunch.ruler',
  name: 'SaveUCJDataOnGranted',

  implements: [
    'foam.nanos.ruler.RuleAction'
  ],

  javaImports: [
    'foam.core.ContextAgent',
    'foam.core.X',
    'foam.dao.DAO',
    'foam.nanos.crunch.Capability',
    'foam.nanos.crunch.CapabilityJunctionStatus',
    'foam.nanos.crunch.UserCapabilityJunction',
    'foam.nanos.logger.Logger'
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        final var clsName = getClass().getSimpleName();
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            Logger logger = (Logger) x.get("logger");
            DAO userCapabilityJunctionDAO = (DAO) x.get("userCapabilityJunctionDAO");

            UserCapabilityJunction ucj = (UserCapabilityJunction) obj;
            UserCapabilityJunction oldUcj = (UserCapabilityJunction) oldObj;

            if ( ucj.getStatus() != CapabilityJunctionStatus.GRANTED || ucj.getIsRenewable() ) return;
            if ( oldUcj != null && oldUcj.getStatus() == CapabilityJunctionStatus.GRANTED && ! oldUcj.getIsRenewable() &&
              ( ( oldUcj.getData() == null && ucj.getData() == null ) ||
                ( oldUcj.getData() != null && oldUcj.getData().equals(ucj.getData()) ) )
            ) return;

            Capability capability = (Capability) ucj.findTargetId(x);
            if ( capability == null ) throw new RuntimeException("Data not saved to target object: Capability not found.");

            foam.core.FObject obj = null;
            if ( capability.getOf() != null && capability.getDaoKey() != null ) obj = (foam.core.FObject) ucj.saveDataToDAO(x, capability, true);
          }
        }, "");
      `
    }
  ]
});
