/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.dao.store;

class MemoryStored
  implements Stored
{
  protected final Object obj_;

  public MemoryStored(Object obj) {
    obj_ = obj;
  }

  public Object get() {
    return obj_;
  }
}


public class MemoryStore
  implments Store
{
  protected Stored root_;

  public MemoryStore() {
  }

  public Stored root() {
    return root_;
  }

  public Stored storeRoot(Object obj) {
    root_ = store(obj);
    return root_;
  }

  public Stored store(Object obj) {
    return new MemoryStored(obj);
  }
}
