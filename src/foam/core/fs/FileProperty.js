/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.fs',
  name: 'FileProperty',
  extends: 'foam.lang.FObjectProperty',

  properties: [
    [ 'of', 'foam.core.fs.File' ],
    [ 'type', 'foam.core.fs.File' ],
    [ 'tableCellView', function () {} ],
    [ 'view', { class: 'foam.u2.view.FileView' } ]
  ]
});
