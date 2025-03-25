/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.auth',
  name: 'SetUserServiceProviderJunctionRuleAction',

  implements: [
    'foam.core.ruler.RuleAction'
  ],

  documentation: `
    On create of User-ServiceProvider junction, find old User-ServiceProvider junctions,
    remove the old junctions and its prerequisites, and set up the new serviceprovider
    junctions, then update the spid reference on the user to the new serviceprovider.
  `,

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.core.auth.User',
    'foam.core.crunch.Capability',
    'foam.core.crunch.UserCapabilityJunction',
    'foam.core.logger.Logger'
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            UserCapabilityJunction ucj = (UserCapabilityJunction) obj;

            Capability target = ucj.findTargetId(x);
            if ( ! ( target instanceof ServiceProvider ) ) return;

            AuthService auth = (AuthService) x.get("auth");
            Logger logger = (Logger) x.get("logger");

            // check that the user is authorized to perform this Service Provider update
            User admin = ((Subject) x.get("subject")).getUser();
            if ( 
              admin == null || ( 
              admin.getId() != foam.core.auth.User.SYSTEM_USER_ID && 
              ! admin.getGroup().equals("admin") && 
              ! admin.getGroup().equals("system") && 
              ! auth.check(x, "*") )
            )
              throw new RuntimeException("You are not authorized to perform this update");

            // get the
            User user = (User) ucj.findSourceId(x).fclone();
            ServiceProvider serviceProvider = (ServiceProvider) target;

            // if is create, check if any old user-serviceprovider junctions exist, and remove it and its grant path   
            serviceProvider.removeSpid(x, user);

            // get grantpath and create/reput grantpath
            serviceProvider.setupSpid(x, user);
            logger.debug("Updating spid capabilities for user", serviceProvider.getId(), user.getId());

            // finally set user spid to new spid
            DAO userDAO = (DAO) x.get("bareUserDAO");
            user.setSpid(serviceProvider.getId());
            userDAO.put(user);
          }
        }, "Re-assign user spid on update of User-ServiceProvider junction where ServiceProvider changed");
      `
    }
  ]
});
