/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'UserPropertyAvailabilityService',

  documentation:
    `This is a service that checks whether a user with matching values for a unique given property
    (restricted use for Username and Email) already exists in the system. Thus, this service allows the client to check
    the availability of these property values.
    `,

  implements: [
    'foam.nanos.auth.UserPropertyAvailabilityServiceInterface'
  ],

  imports: [
    'DAO localUserDAO'
  ],

  javaImports: [
    'foam.dao.DAO',
    'foam.nanos.auth.User',
    'foam.nanos.theme.Theme',
    'foam.nanos.theme.Themes',
    'static foam.mlang.MLang.*',

    'foam.nanos.auth.ruler.PreventDuplicateEmailAction'
  ],

  methods: [
    {
      name: 'checkAvailability',
      javaCode: `
        if ( getX().get("crunchService") == null ||
             ( ! targetProperty.equals("username") &&
               ! targetProperty.equals("email") )
        ) {
          throw new AuthorizationException();
        }
        String spid = (String) x.get("spid");
        DAO userDAO = ((DAO) getX().get("localUserDAO")).inX(getX());
        if ( "email".equals(targetProperty) ) {
          if ( PreventDuplicateEmailAction.spidPreventDuplicateEmailPermission(getX(), spid) ) {
            return
              userDAO
                .find(AND(
                  EQ(User.SPID, spid),
                  EQ(User.EMAIL, value),
                  EQ(User.TYPE, "User"),
                  NEQ(User.LIFECYCLE_STATE, LifecycleState.DELETED)
                )) == null;
          }
          return true;
        }
        return
          userDAO
            .find(AND(
              EQ(User.SPID, spid),
              EQ(User.USER_NAME, value),
              EQ(User.TYPE, "User"),
              NEQ(User.LIFECYCLE_STATE, LifecycleState.DELETED)
            )) == null;
      `
    }
  ]
});
