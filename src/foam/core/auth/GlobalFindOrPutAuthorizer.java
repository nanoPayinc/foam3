/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.auth;

import foam.lang.X;


public class GlobalFindOrPutAuthorizer
  extends GlobalPutAuthorizer
{

  // This authorizer allows global find() and put() operations.

  public GlobalFindOrPutAuthorizer(String permissionPrefix) {
    super(permissionPrefix);
  }

  @Override
  public boolean checkGlobalFind(X x) {
    // return true to enable any find()
    return true;
  }
}
