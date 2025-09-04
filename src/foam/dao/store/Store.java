/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.dao.store;

public interface Store {
  public Stored root();
  public Stored storeRoot(Object obj);
  public Stored store(Object obj);
}
