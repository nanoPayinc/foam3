/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.fs',
  name: 'FileArray',
  extends: 'foam.lang.FObjectArray',

  properties: [
    [ 'of', 'foam.core.fs.File' ],
    [ 'tableCellView', function () {} ]
  ]
});
