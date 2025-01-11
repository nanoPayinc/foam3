/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'UserPasswordHashingDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: `Hash user's desired (human readable) password and update real password property with encoded value.`,

  javaImports: [
    'foam.core.FObject',
    'foam.core.X',
    'foam.dao.DAO',
    'foam.dao.ProxyDAO',
    'foam.util.Password',
    'foam.util.SafetyUtil',
    'java.util.Calendar'
  ],

  javaCode: `
    public UserPasswordHashingDAO(X x, DAO delegate) {
      setX(x);
      setDelegate(delegate);
    }
  `,

  methods: [
    {
      name: 'put_',
      javaCode: `
        User user   = (User) obj;
        User stored = (User) getDelegate().find(user.getId());

        // hash desired password if provided
        if ( ! SafetyUtil.isEmpty(user.getDesiredPassword()) ) {
          user.setPassword(Password.hash(user.getDesiredPassword()));
          user.setPasswordLastModified(Calendar.getInstance().getTime());
          // set previous password if present
          if ( stored != null && ! SafetyUtil.isEmpty(stored.getPassword()) ) {
            user.setPreviousPassword(stored.getPassword());
          }

          // erase desired password after hashing
          user.setDesiredPassword(null);
          return super.put_(x, obj);
        }

        return super.put_(x, obj);
      `
    }
  ]
});
