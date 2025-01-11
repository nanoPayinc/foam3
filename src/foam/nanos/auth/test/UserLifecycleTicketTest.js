/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth.test',
  name: 'UserLifecycleTicketTest',
  extends: 'foam.nanos.test.Test',

  documenation: `
// create user
// add ucj
// change user state - disabled
// check that ucj state also changed
// change user stage - deleted
// check all deleted - no teardown required
`,

  javaImports: [
    'foam.core.X',
    'foam.dao.ArraySink',
    'foam.dao.DAO',
    'foam.dao.MDAO',
    'static foam.mlang.MLang.*',
    'foam.nanos.auth.*',
    'foam.nanos.crunch.*',
    'foam.nanos.logger.Loggers',
    'foam.test.TestUtils',
    'java.util.List'
  ],

  methods: [
    {
      name: 'setup',
      args: 'X x',
      type: 'X',
      javaCode: `
      return x;
      `
    },
    {
      name: 'runTest',
      javaCode: `
      try {
        x = setup(x);
    DAO userDAO = (DAO) x.get("userDAO");
    DAO ticketDAO = (DAO) x.get("ticketDAO");
    DAO capabilityDAO = (DAO) x.get("capabilityDAO");
    DAO userCapabilityJunctionDAO = (DAO) x.get("userCapabilityJunctionDAO");
    DAO prerequisiteCapabilityJunctionDAO = (DAO) x.get("prerequisiteCapabilityJunctionDAO");

    User user = new User();
    user.setUserName(this.getClass().getSimpleName());
    user.setFirstName(user.getUserName());
    user.setLastName(user.getUserName());
    user.setSpid("test");
    user.setGroup("test");
    user.setEmail(user.getUserName()+"@foam.test");
    user.setEmailVerified(true);
    user.setId(user.getUserName().hashCode());
    user = (User) userDAO.put(user);

    Capability dep = new Capability();
    dep.setId(user.getUserName()+"-dep");

    Capability pre = new Capability();
    pre.setId(user.getUserName()+"-pre");

    dep = (Capability) capabilityDAO.put(dep);
    pre = (Capability) capabilityDAO.put(pre);

    // CapabilityCapabilityJunction ccjunction = new CapabilityCapabilityJunction();
    // ccjunction.setSourceId(dep.getId());
    // ccjunction.setTargetId(pre.getId());
    // prerequisiteCapabilityJunctionDAO.put_(x, ccjunction);

    UserCapabilityJunction ucjunction = new UserCapabilityJunction();
    ucjunction.setSourceId(user.getId());
    ucjunction.setTargetId(dep.getId());
    userCapabilityJunctionDAO.put_(x, ucjunction);

    List<UserCapabilityJunction> userCapabilityJunctions = (List<UserCapabilityJunction>) ((ArraySink) userCapabilityJunctionDAO
        .where(EQ(UserCapabilityJunction.SOURCE_ID, user.getId()))
        .select(new ArraySink()))
        .getArray();

    test(userCapabilityJunctions.size() > 0, "UCJs created > 0 "+userCapabilityJunctions.size());

    var ticket = new UserLifecycleTicket();
    ticket.setCreatedFor(user.getId());
    ticket.setSpid(user.getSpid());
    ticket.setRequestedLifecycleState(LifecycleState.DISABLED);
    ticket.setIncludeRelationships(true);
    ticket = (UserLifecycleTicket) ticketDAO.put(ticket).fclone();
    ticket.setStatus("CLOSED");
    ticket = (UserLifecycleTicket) ticketDAO.put(ticket);
    ticket = (UserLifecycleTicket) ticketDAO.find(ticket.getId()).fclone();
    test ( ticket.getStatus() == "CLOSED", "ticket CLOSED "+ticket.getMessage());
    test ( ticket.getUpdated().size() > 0, "ticket updated data "+ ticket.getUpdated().size());

    user = (User) ((DAO) x.get("userDAO")).find(user.getId());
    test ( user.getLifecycleState() == LifecycleState.DISABLED, "User ACTIVE -> DISABLED "+ user.getLifecycleState().toString());

    userCapabilityJunctions = (List<UserCapabilityJunction>) ((ArraySink) userCapabilityJunctionDAO
        .where(EQ(UserCapabilityJunction.SOURCE_ID, user.getId()))
        .select(new ArraySink()))
        .getArray();
    for ( UserCapabilityJunction ucj : userCapabilityJunctions ) {
      test ( ucj.getLifecycleState() == LifecycleState.DISABLED, "UCJ ACTIVE -> DISABLED "+ ucj.getLifecycleState().toString());
    }

    ticket.setRequestedLifecycleState(LifecycleState.ACTIVE);
    ticket.setRevertRelationships(true);
    ticket.setStatus("OPEN");
    ticket = (UserLifecycleTicket) ticketDAO.put(ticket).fclone();
    ticket.setStatus("CLOSED");
    ticket = (UserLifecycleTicket) ticketDAO.put(ticket).fclone();

    user = (User) ((DAO) x.get("userDAO")).find(user.getId());
    test ( user.getLifecycleState() == LifecycleState.ACTIVE, "User DISABLED -> ACTIVE "+ user.getLifecycleState().toString());

    userCapabilityJunctions = (List<UserCapabilityJunction>) ((ArraySink) userCapabilityJunctionDAO
        .where(EQ(UserCapabilityJunction.SOURCE_ID, user.getId()))
        .select(new ArraySink()))
        .getArray();
    test(userCapabilityJunctions.size() > 0, "UCJs active > 0 "+userCapabilityJunctions.size());

    // Delete in Active state - will trigger
    // 1. LifecycleAwareDAO which will map remove to put lifecycleState DELETED
    // 2. which in turn triggers UserLifecycleDeletedRuleAction to create ticket
    // and deleted associated data.
    ((DAO) x.get("userDAO")).remove(user);
    user = (User) ((DAO) x.get("userDAO")).find(user.getId());
    test ( user == null || user.getLifecycleState() == LifecycleState.DELETED, "user deleted");

    userCapabilityJunctions = (List<UserCapabilityJunction>) ((ArraySink) userCapabilityJunctionDAO
        .where(EQ(UserCapabilityJunction.SOURCE_ID, user.getId()))
        .select(new ArraySink()))
        .getArray();
    for ( UserCapabilityJunction ucj : userCapabilityJunctions ) {
      test ( ucj.getLifecycleState() == LifecycleState.DELETED, "UCJ ACTIVE -> DELETED "+ ucj.getLifecycleState().toString());
    }

    capabilityDAO.remove(dep);
    capabilityDAO.remove(pre);
    ticketDAO.remove(ticket);
      } catch ( Throwable t ) {
        Loggers.logger(x, this).error(t);
      } finally {
        teardown(x);
      }
      `
    },
    {
      name: 'teardown',
      args: 'X x',
      javaCode: `
      // nop
      `
    },
  ]
});
