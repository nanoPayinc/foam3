/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.app',
  name: 'ContextLookupAppConfigService',
  implements: [
    'foam.core.app.AppConfigService'
  ],
  methods: [
    {
      name: 'getAppConfig',
      type: 'foam.core.app.AppConfig',
      javaCode: `
return (foam.core.app.AppConfig) x.get("appConfig");
      `
    }
  ]
});