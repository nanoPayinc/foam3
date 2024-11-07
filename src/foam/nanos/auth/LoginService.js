foam.CLASS({
    package: 'foam.nanos.auth',
    name: 'LoginService',
    documentation: 'Server only service for signing a session into a particular user',
    imports: [
        'foam.dao.DAO localSessionDAO',
        'foam.nanos.auth.AuthService auth'
    ],
    methods: [
        {
            name: 'login',
            documentation: `Helper function to reduce duplicated code.`,
            type: 'User',
            args: [
                {
                    name: 'x',
                    type: 'Context'
                },
                {
                    name: 'user',
                    type: 'foam.nanos.auth.User'
                },
            ],
            javaThrows: ['foam.nanos.auth.AuthenticationException'],
            javaCode: `
      try {
        if ( user == null ) {
          throw new foam.nanos.auth.UserNotFoundException();
        }
        user.validateAuth(x);

        // check if group enabled
        foam.core.X userX = x.put("subject", new foam.nanos.auth.Subject.Builder(x).setUser(user).build());
        foam.nanos.auth.Group group = user.findGroup(userX);
        if ( group != null && ! group.getEnabled() ) {
          throw new foam.nanos.auth.AccessDeniedException();
        }
        try {
          group.validateCidrWhiteList(x);
        } catch (foam.core.ValidationException e) {
          throw new foam.nanos.auth.AccessDeniedException(e);
        }

        foam.nanos.session.Session session = x.get(foam.nanos.session.Session.class);
        // check for two-factor authentication
        if ( user.getTwoFactorEnabled() && ! session.getTwoFactorSuccess() ) {
          throw new foam.nanos.auth.AuthenticationException("User requires two-factor authentication");
        }
        // Re use the session context if the current session context's user id matches the id of the user trying to log in
        if ( session.getUserId() == user.getId() ) {
          return user;
        }

        // Freeze user
        user = (foam.nanos.auth.User) user.fclone();
        user.freeze();
        session.setUserId(user.getId());
        if ( getAuth().check(userX, "*") ) {
          String msg = "Admin login for " + user.getId() + " succeeded on " + System.getProperty("hostname", "localhost");
          ((foam.nanos.logger.Logger) x.get("logger")).warning(msg);
        }
        getLocalSessionDAO().inX(x).put(session);
        session.setContext(session.applyTo(session.getContext()));
        return user;
      } catch ( foam.nanos.auth.AuthenticationException e ) {
        if ( user != null &&
             (getAuth().check(x.put("subject", new Subject.Builder(x).setUser(user).build()), "*") ) ) {
          String msg = "Admin login for " + user.getId() + " failed on " + System.getProperty("hostname", "localhost");
          ((foam.nanos.logger.Logger) x.get("logger")).warning(msg);
        }
        throw e;
      }
      `
        },
    ]
})