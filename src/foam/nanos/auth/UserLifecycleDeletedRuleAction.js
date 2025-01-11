/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'UserLifecycleDeletedRuleAction',

  documentation: `User remove, via LifecycleAwareDAO, is mapped to put
with lifecycleState DELETED.  Create a ticket, if enabled, to set all
associated data to state DELETED, and log user out, otherwise log user out.`,

  implements: [
    'foam.nanos.ruler.RuleAction'
  ],

  javaImports: [
    'foam.core.ContextAgent',
    'foam.core.Detachable',
    'foam.core.X',
    'foam.dao.AbstractSink',
    'foam.dao.DAO',
    'foam.dao.Sink',
    'static foam.mlang.MLang.*',
    'foam.nanos.logger.Logger',
    'foam.nanos.logger.Loggers',
    'foam.nanos.session.Session',
    'foam.nanos.ticket.Ticket'
  ],

  properties: [
    {
      documentation: 'Create UserLifeycleTicket on user remove for an operator to ensure all associated data is removed.',
      name: 'generateTicket',
      class: 'Boolean',
      value: true
    }
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
      final Logger logger = Loggers.logger(x, this);
      agency.submit(x, new ContextAgent() {
        @Override
        public void execute(X x) {
          User user = (User) obj;
          X rulerX = ruler.getX();

          if ( getGenerateTicket() ) {
            try {
              DAO dao = ((DAO) rulerX.get("ticketDAO"));
              UserLifecycleTicket ticket = (UserLifecycleTicket) dao.find(
                AND(
                  EQ(Ticket.CREATED_FOR, user.getId()),
                  EQ(Ticket.STATUS, "OPEN"),
                  EQ(UserLifecycleTicket.REQUESTED_LIFECYCLE_STATE, LifecycleState.DELETED)
                ));
              if ( ticket == null ) {
                ticket = new UserLifecycleTicket();
                ticket.setCreatedFor(user.getId());
                ticket.setSpid(user.getSpid());
                ticket.setRequestedLifecycleState(LifecycleState.DELETED);
                ticket.setTitle("User initiated. "+user.getNote());
                ticket = (UserLifecycleTicket) dao.put(ticket).fclone();
                ticket.setStatus("CLOSED");
                ticket = (UserLifecycleTicket) dao.put(ticket);
                ticket = (UserLifecycleTicket) dao.find(ticket.getId());
                if ( ticket.getStatus() == "CLOSED" ) {
                  logger.info("User remove complete", user.getId());
                } else {
                  // Operations needs to deal with the ticket.
                  // TODO: generate ER perhaps.
                  logger.warning("User remove pending", user.getId(), "ticket", ticket.getId());
                }
              }
              return;
            } catch (Throwable t) {
              logger.error("Failed to create UserLifecycleTicket", "user", user.getId(), t);
              // disable, for an admin to deal with.
              user.setLifecycleState(LifecycleState.DISABLED);
            }
          }

          // log out by deleting session
          try {
            AuthService auth = (AuthService) x.get("auth");
              ((DAO) rulerX.get("sessionDAO")).where(
                OR(
                  EQ(Session.USER_ID, user.getId()),
                  EQ(Session.AGENT_ID, user.getId())
                )
              ).select(new AbstractSink() {
                @Override
                public void put(Object obj, Detachable sub) {
                  Session session = (Session) obj;
                  auth.logout(session.getContext());
                }
              });
          } catch (Throwable t) {
            logger.error("Failed to logout", "user", user.getId(), t);
          }
        }
      }, "UserLifecycleDeletedRuleAction");
      `
    }
  ]
});
