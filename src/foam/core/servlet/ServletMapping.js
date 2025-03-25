/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.servlet',
  name: 'ServletMapping',

  properties: [
    {
      class: 'String',
      name: 'className'
    },
    {
      class: 'FObjectProperty',
      of: 'foam.core.servlet.Servlet',
      name: 'servletObject'
    },
    {
      class: 'String',
      name: 'pathSpec'
    },
    {
      class: 'Map',
      name: 'initParameters'
    }
  ]
});
