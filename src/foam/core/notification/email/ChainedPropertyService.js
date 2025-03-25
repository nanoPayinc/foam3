/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.notification.email',
  name: 'ChainedPropertyService',

  implements: [
    'foam.core.notification.email.EmailPropertyService'
  ],

  documentation:
  `Model that stores the array of decorators that fills the emailMessage
   with service level precedence on properties.`,

  javaImports: [
    'foam.lang.X',
    'foam.core.auth.Group',
    'foam.core.auth.User',
    'foam.core.session.Session',
    'java.util.Map',
    'java.util.HashMap'
  ],

  properties: [
    {
      name: 'data',
      class: 'FObjectArray',
      of: 'EmailPropertyService'
    }
  ],

  methods: [
    {
      name: 'apply',
      javaCode:
      `
      User user = (User) emailMessage.findUser(getX());
      X userX = foam.util.Auth.sudo(getX(), user);
      group = user.getGroup();
      if ( userX.get("group") != null ) {
        // null on notification broadcast
        group = ((Group) userX.get("group")).getId();
      }

      Map args = templateArgs;
      if ( args == null ||
           args.size() == 0 ) {
        args = emailMessage.getTemplateArguments();
        if ( args == null ) {
          args = new HashMap();
        }
      }

      for ( EmailPropertyService eps: getData() ) {
        emailMessage = eps.apply(userX, group, emailMessage, args);
      }
      return emailMessage;
      `
    }
  ]
});
