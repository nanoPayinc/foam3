/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.logger',
  name: 'ProxyLogger',
  implements: [ 'foam.core.logger.Logger' ],

  documentation: '',

  properties: [
    {
      class: 'Proxy',
      of: 'foam.core.logger.Logger',
      view: 'foam.u2.view.FObjectView',
      name: 'delegate'
    }
  ]
});
