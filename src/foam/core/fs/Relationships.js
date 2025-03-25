/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RELATIONSHIP({
  documentation: `
    Relationship between a parent directory and its files
  `,
  cardinality: '1:*',
  sourceModel: 'foam.core.fs.FSFile',
  forwardName: 'files',
  targetModel: 'foam.core.fs.FSFile',
  inverseName: 'dir',
  sourceProperty: {
    hidden: true
  },
  targetProperty: {
    class: 'String',
    visibility: 'RO',
    view: {
      class: 'foam.u2.view.ReferenceView',
      placeholder: '--'
    }
  }
});