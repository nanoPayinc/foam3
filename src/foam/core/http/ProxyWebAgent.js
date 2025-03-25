/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.http',
  name: 'ProxyWebAgent',
  implements: [ 'foam.core.http.WebAgent' ],

  documentation: '',

  properties: [
    {
      class: 'Proxy',
      of: 'foam.core.http.WebAgent',
      name: 'delegate'
    }
  ]
});
