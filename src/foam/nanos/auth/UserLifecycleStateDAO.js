/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'UserLifecycleStateDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: `User has permission to change lifecycleState, but should
be restricted to DISABLED or DELETED. A user should not be able to ACTIVE
themselves`,

  javaImports: [
    'foam.core.X',
    'foam.dao.DAO',
    'foam.nanos.logger.Loggers'
  ],

  javaCode: `
    public UserLifecycleStateDAO(X x, DAO delegate) {
      setX(x);
      setDelegate(delegate);
    }
  `,

  methods: [
    {
      name: 'put_',
      javaCode: `
      User user = (User) obj;
      User subjectUser = ((Subject) x.get("subject")).getUser();
      User old = (User) getDelegate().find_(x, user.getId());
      if ( old == null ||
           old.getLifecycleState() == user.getLifecycleState() ||
           subjectUser.getId() != user.getId() ||
           ( old != null &&
             old.getLifecycleState() != user.getLifecycleState() &&
             user.getLifecycleState() != LifecycleState.ACTIVE ) ) {
        return getDelegate().put_(x, user);
      }

      // User trying to activate self.
      throw new AuthorizationException();
      `
    }
  ]
})
