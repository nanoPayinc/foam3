/**
* @license
* Copyright 2024 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.core.auth.ruler',
  name: 'PreventInvalidUsernameAction',

  documentation: `Prevents putting a user with an invalid username.`,

  implements: ['foam.core.ruler.RuleAction'],

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.mlang.sink.Count',
    'foam.core.auth.DuplicateUserNameException',
    'foam.core.auth.LifecycleState',
    'foam.core.auth.Subject',
    'foam.core.auth.User',
    'foam.util.SafetyUtil',
    'static foam.mlang.MLang.*'
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        DAO userDAO = (DAO) x.get("localUserDAO");

        User user = (User) obj;

        if ( ! User.USER_NAME_MATCHER.matcher(user.getUserName()).matches() ) {
          throw new RuntimeException(User.INVALID_USERNAME);
        }
      `
    }
  ]
});
