/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.auth.test;

import foam.lang.X;
import foam.dao.DAO;
import foam.core.auth.User;
import foam.core.auth.ruler.PreventDuplicateEmailAction;
import foam.core.crunch.Capability;
import foam.test.TestUtils;

public class PreventDuplicateEmailTest
  extends foam.core.test.Test
{
  private DAO userDAO_;
  private String spid_ = "test";

  public void runTest(X x) {
    x = getTestingSubcontext(x);
    DAO dao = (DAO) x.get("serviceProviderDAO");
    Capability spid = (Capability) dao.find_(x, spid_).fclone();
    String[] permissionsGranted = spid.getPermissionsGranted();
    spid.setPermissionsGranted(new String[] { PreventDuplicateEmailAction.PREVENT_DUPLICATE_EMAIL_PERMISSION_NAME});
    spid = (Capability) dao.put_(x, spid).fclone();

    PreventsDuplicateEmail(x);

    spid.setPermissionsGranted(permissionsGranted);
    dao.put_(x, spid);
  }

  private X getTestingSubcontext(X x) {
    // Mock the userDAO and put a test user in it.
    x = TestUtils.mockDAO(x, "localUserDAO");
    x = TestUtils.createTestContext(x, spid_);

    return x;
  }

  private void PreventsDuplicateEmail(X x) {
    User userWithDuplicateEmail = TestUtils.createTestUser();
    userWithDuplicateEmail.setId(2); // Make sure the id is different.
    userWithDuplicateEmail.setSpid(spid_);
    DAO dao = userDAO_;
    PreventDuplicateEmailAction action = new PreventDuplicateEmailAction.Builder(x).build();
    
    testThrows(
      () -> action.applyAction(x, userWithDuplicateEmail, null, null, null, null),
      "Email already in use",
      foam.core.auth.DuplicateEmailException.class,
      "Rule throws a RuntimeException with an appropriate message when a User is put with the same email as an existing user and a different id."
    );
  }
}
