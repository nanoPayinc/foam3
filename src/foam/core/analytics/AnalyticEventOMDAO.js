/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.analytics',
  name: 'AnalyticEventOMDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: 'Create OM each on event',

  javaImports: [
    'foam.core.om.OMLogger'
  ],

  methods: [
    {
      name: 'put_',
      javaCode: `
      AnalyticEvent event = (AnalyticEvent) getDelegate().put_(x, obj);
      ((OMLogger) x.get("OMLogger")).log("analytic.event", event.getName());
      return event;
      `
    }
  ]
});
