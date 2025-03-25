/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.auth.twofactor',
  name: 'TwoFactorAuthService',
  extends: 'foam.core.auth.ProxyAuthService',

  implements: [
    'foam.core.COREService'
  ],

  javaImports: [
    'foam.core.COREService',
    'foam.core.auth.Subject',
    'foam.core.auth.User',
    'foam.core.session.Session'
  ],

  methods: [
    {
      name: 'start',
      javaCode:
        `if ( getDelegate() instanceof COREService ) {
          ((COREService) getDelegate()).start();
        }`
    },
    {
      type: 'Boolean',
      name: 'check',
      javaCode: `
        Session session = x.get(Session.class);
        User user = ((Subject) x.get("subject")).getUser();

        return user != null &&
          user.getTwoFactorEnabled() &&
          ! session.getTwoFactorSuccess() ? false :
            getDelegate().check(x , permission);
      `
    }
  ]
});
