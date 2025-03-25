/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RELATIONSHIP({
  package: 'foam.core.analytics.mixpanel',
  flags: ['java'],
  cardinality: '*:*',
  sourceModel: 'foam.core.auth.ServiceProvider',
  targetModel: 'foam.core.analytics.AnalyticEvent',
  forwardName: 'whitelistedEvents',
  inverseName: 'spids',
  sourceDAOKey: 'serviceProviderDAO',
  targetDAOKey: 'analyticEventDAO',
  junctionDAOKey: 'spidWhitelistedAnalyticEventsDAO'
});