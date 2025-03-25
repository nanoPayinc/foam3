/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.core.crunch.predicate',
  name: 'IsAgentUpdate',

  documentation: `
    Returns true if session user(s) is not the same as the user(s) of the usercapabilityjunction,
    excludes system updates
  `,

  javaImports: [
    'foam.core.auth.Subject',
    'foam.core.crunch.AgentCapabilityJunction',
    'foam.core.crunch.UserCapabilityJunction',
    'foam.core.session.Session'
  ],

  ruleF: `
    UserCapabilityJunction ucj = (UserCapabilityJunction) n;

    Session session = (Session) x.get(Session.class);
    if ( session == null ) return false;

    Long userId  = session.getUserId();
    Long agentId = session.getAgentId();

    if ( userId == 1 ) return false;

    Subject ucjSubject = ucj.getSubject(x);
    if ( ucjSubject.isAgent() ) {
      return userId != ucjSubject.getUser().getId() || agentId != ucjSubject.getRealUser().getId();
    }

    return userId != ucjSubject.getUser().getId() && agentId != ucjSubject.getUser().getId();
  `
});
