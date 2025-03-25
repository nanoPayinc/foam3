/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.http.test',
  name: 'DIGBroadcastWebAgentTest',
  extends: 'foam.core.test.Test',

  javaImports: [
    'foam.lang.X',
    'foam.dao.DOP',
    'foam.core.dig.DIG',
    'foam.core.logger.Logger',
    'foam.core.logger.Loggers',
    'jakarta.servlet.http.HttpServletRequest'
  ],

  properties: [
    {
      name: 'pathSpec',
      class: 'String',
      value: 'broadcast',
    },
    {
      name: 'data',
      class: 'String',
      value: 'param1=value1'
    },
    {
      name: 'dop',
      class: 'Enum',
      of: 'foam.dao.DOP',
      value: 'PUT'
    },
    {
      documentation: 'Connection timeout in milliseconds',
      name: 'connectionTimeout',
      class: 'Long',
      units: 'ms',
      value: 20000,
      section: 'details'
    },
    {
      documentation: 'Connection timeout in milliseconds',
      name: 'requestTimeout',
      class: 'Long',
      units: 'ms',
      value: 10000,
      section: 'details'
    }
  ],

  methods: [
    {
      name: 'runTest',
      args: 'X x',
      javaCode: `
      // pull http from context to ensure it's started.
      test ( x.get("http") != null, "http initialized" );

      DIG client = new DIG.Builder(x)
        .setServiceName(getPathSpec())
        .setConnectionTimeout(getConnectionTimeout())
        .setRequestTimeout(getRequestTimeout())
        .build();

      Object reply = client.submit(x, getDop(), getData());
      test ( reply != null, "received non-null reply: "+reply);
      test ( client.getLastHttpResponseCode() == 200, "response code 200: "+client.getLastHttpResponseCode());


      client = new DIG.Builder(x)
        .setServiceName(getPathSpec()+"-fail")
        .setConnectionTimeout(getConnectionTimeout())
        .setRequestTimeout(getRequestTimeout())
        .build();

      try {
        reply = client.submit(x, getDop(), getData());
        test ( false, "expected exception: "+reply);
      } catch (Exception e) {
        test ( client.getLastHttpResponseCode() != 200, "response code ! 200: "+client.getLastHttpResponseCode());
        test ( e instanceof foam.lang.FOAMException, "expected FOAMException: "+e.getClass().getSimpleName());
      }
      `
    }
  ]
})
