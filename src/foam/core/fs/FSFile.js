/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.fs',
  name: 'FSFile',

  properties: [
    {
      class: 'String',
      name: 'id',
      documentation: 'path of file relative to the root'
    },
    {
      class: 'Boolean',
      name: 'writable',
      value: false
    },
    {
      class: 'String',
      name: 'path',
      documentation: 'the file name'
    },
    {
      class: 'Reference',
      of: 'foam.core.fs.FSFileContent',
      name: 'content'
    },
    {
      class: 'Boolean',
      name: 'isDirectory'
    },
    {
      class: 'String',
      name: 'extension'
    }
  ]
});
