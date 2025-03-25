/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.fs',
  name: 'FSFileContent',

  ids: ['fileName'],

  properties: [
    {
      class: 'Reference',
      of: 'foam.core.fs.FSFile',
      name: 'fileName'
    },
    {
      class: 'String',
      name: 'content'
    }
  ]
});
