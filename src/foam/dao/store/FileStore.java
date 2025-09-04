/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.dao.store;

class FileStored
  implements Stored
{
  // TODO: use https://docs.oracle.com/javase/8/docs/api/java/nio/channels/FileChannel.html

  protected final FileStore store_;
  protected final long      pos_;
  protected final short     len_;

  public FileStored(FileStore store, pos, len) {
    store_ = store;
    pos_   = pos;
    len    = len;
  }

  public Object get() {
    return store_.load(pos_, len_);
  }
}


public class FileStore
  implments Store
{
  protected final String filename_;

  protected Stored root_;

  public FileStore(String filename) {
    filename_ = filename;

    // TODO: find root
  }

  public Stored root() {
    return root_;
  }

  public Stored storeRoot(Object obj) {
    root_ = store(obj);
    // TODO: save root
    return root_;
  }

  public Stored store(Object obj) {
  }

  Object load(FileStored stored) {
    long  pos = stored.pos_;
    short len = stored.len_;

    // TODO: read len bytes at position pos and convert to an Object
  }
}
