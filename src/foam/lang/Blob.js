/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.lang',
  name: 'Blob',
  extends: 'foam.lang.FObjectProperty',

  flags: [],

  properties: [
    [ 'type', 'foam.blob.Blob' ],
    [ 'of', 'foam.blob.Blob' ],
    [ 'tableCellView', function() {} ],
    [ 'view', { class: 'foam.u2.view.BlobView' } ]
  ]
});
