/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.auth;

import foam.lang.FObject;
import foam.lang.X;
import foam.mlang.predicate.Predicate;

public class GlobalReadAuthorizer
  extends StandardAuthorizer
{

  // this authorizer is an extension of the standardauthorizer that is meant
  // to replace the authorizeReads flag on services using the standardAuthorizer.
  // setAuthorize(true) => setAuthorizer(new foam.core.auth.GlobalReadAuthorizer(\"permissionPrefix\"))

  public GlobalReadAuthorizer(String permissionPrefix) {
    super(permissionPrefix);
  }

  @Override
  public boolean checkGlobalRead(X x, Predicate predicate) {
    // return true in checkGlobalRead to save time checking each object
    return true;
  }
}
