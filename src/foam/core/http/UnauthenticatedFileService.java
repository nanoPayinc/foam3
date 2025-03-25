/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.http;

import foam.blob.BlobService;
import foam.lang.X;
import foam.core.blob.FileService;

// Class that prewents user from file uploading but allowing file to be downloaded
public class UnauthenticatedFileService extends FileService {

  public UnauthenticatedFileService(X x, BlobService delegate) {
    this(x, "UnauthenticatedFileService", delegate);
  }

  public UnauthenticatedFileService(X x, String name, BlobService delegate) {
    super(x, name, delegate);
  }

  @Override
  protected void upload(X x) {
    // Do nothing on upload
  }

}
