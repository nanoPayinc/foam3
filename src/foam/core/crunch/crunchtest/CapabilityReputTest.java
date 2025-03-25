/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.crunch.crunchtest;

import foam.lang.X;
import foam.dao.DAO;
import foam.core.auth.User;
import foam.core.crunch.Capability;
import foam.core.crunch.CapabilityCapabilityJunction;
import foam.core.crunch.CapabilityGrantMode;
import foam.core.crunch.CapabilityJunctionStatus;
import foam.core.crunch.CrunchService;
import foam.core.crunch.UserCapabilityJunction;
import foam.core.test.Test;
import foam.util.Auth;

public class CapabilityReputTest extends Test {

  public void runTest(X x) {
    // Test reput on dependent ucjs when a prerequisite ucj has been granted
    // create test user
    DAO userDAO = (DAO) x.get("localUserDAO");
    User user = new User();
    user.setUserName("testUser");
    user.setFirstName("first");
    user.setLastName("last");
    user.setEmail("testUser@test.com");
    user.setEmailVerified(true);
    user.setSpid("test");
    user.setGroup("anonymous");
    user = (User) userDAO.put(user);
    X userX = Auth.sudo(x, user);

    // get crunch services
    var crunchService = (CrunchService) x.get("crunchService");
    var capabilityDAO = (DAO) x.get("capabilityDAO");
    var prereqDAO = (DAO) x.get("prerequisiteCapabilityJunctionDAO");
    var ucjDAO = (DAO) x.get("bareUserCapabilityJunctionDAO");

    // create capabilities and junctions
    Capability c1 = new Capability.Builder(x).setId("c1").build();
    Capability c2 = new Capability.Builder(x).setId("c2").build();
    CapabilityCapabilityJunction p = new CapabilityCapabilityJunction.Builder(x)
      .setSourceId(c1.getId())
      .setTargetId(c2.getId())
      .build(); // c2 is a prerequisite of c1
    c1 = (Capability) capabilityDAO.put_(x, c1);
    c2 = (Capability) capabilityDAO.put_(x, c2);
    p = (CapabilityCapabilityJunction) prereqDAO.put_(x, p);

    // create ucj with dependent
    // using bareUserCapabilityJunctionDAO here since we want to force a reput scenario
    // and SetUcjStatusOnPut rule will try to grant prerequisites
    // ( SetUcjStatusOnPut.checkPrereqsChainedStatus -> Capability.getPrereqsChainedStatus )
    UserCapabilityJunction ucj_dep = new UserCapabilityJunction.Builder(x)
      .setSourceId(user.getId())
      .setTargetId(c1.getId())
      .build();
    ucj_dep = (UserCapabilityJunction) ucjDAO.put_(userX, ucj_dep);
    test(ucj_dep.getStatus() != CapabilityJunctionStatus.GRANTED, "ucj_dep status: " + ucj_dep.getStatus());

    // create ucj with prerequisite and test that the dependent has been updated after prerequisite was granted
    UserCapabilityJunction ucj_pre = crunchService.updateJunctionFor(x, c2.getId(), null, CapabilityJunctionStatus.GRANTED, user, user);
    test(ucj_pre.getStatus() == CapabilityJunctionStatus.GRANTED, "ucj_pre status: " + ucj_pre.getStatus());
    ucj_dep = crunchService.getJunction(userX, c1.getId());
    test(ucj_dep.getStatus() == CapabilityJunctionStatus.GRANTED, "ucj_dep status: " + ucj_dep.getStatus());
  }
}
