/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.auth',
  name: 'CreateUserCapabilityJunctionOnSpidSet',

  implements: [
    'foam.core.ruler.RuleAction'
  ],

  documentation: `
    Create a UserCapabilityJunction between User and ServiceProvider when spid
    is set on user create or update.

    CreateUserCapabilityJunctionOnSpidSet should only be used with after rules
    so the user object is saved before ucjs are created/updated.
  `,

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.X',
    'foam.core.auth.User',
    'foam.core.logger.Logger'
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAgent() {
          X systemX = ruler.getX();
          @Override
          public void execute(X x) {
            Logger logger = (Logger) x.get("logger");
            User   user   = (User) obj;
            User   old    = (User) oldObj;

            String spid    = user.getSpid() == null ? null : user.getSpid().trim();
            String oldSpid = old == null || old.getSpid() == null ? null : old.getSpid().trim();

            if ( spid == null || spid.isEmpty() || spid.equals(oldSpid) ) return;

            ServiceProvider sp = (ServiceProvider) user.findSpid(systemX);
            if ( sp == null ) {
              logger.error("Cannot find capability for service provider : ", spid);
              return;
            }

            sp.removeSpid(systemX, user);
            sp.setupSpid(systemX, user);
            logger.debug("Setup spid for user", sp.getId(), user.getId());
          }
        }, "Create ucj on user spid set");
      `
    }
  ]
});
