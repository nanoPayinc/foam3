/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.app',
  name: 'ClientAppConfigService',
  extends: 'foam.dao.AbstractDAO',
  properties: [
    {
      class: 'Stub',
      of: 'foam.core.app.AppConfigService',
      name: 'delegate'
    }
  ]
});