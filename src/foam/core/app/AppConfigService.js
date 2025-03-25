/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.app',
  name: 'AppConfigService',

  skeleton: true,

  methods: [
    {
      name: 'getAppConfig',
      async: true,
      type: 'foam.core.app.AppConfig',
      args: 'Context x'
    }
  ]
});
