/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.alarming',
  name: 'AlarmHostnameRuleAction',

  implements: [
    'foam.core.ruler.RuleAction'
  ],

  documentation: 'Set hostname on new Alarm',

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.X',
    'foam.util.SafetyUtil'
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            Alarm alarm = (Alarm) obj;
            if ( SafetyUtil.isEmpty(alarm.getHostname()) ) {
              alarm.setHostname(System.getProperty("hostname", "localhost"));
            }
          }
        }, "Alarm hostname");
      `
    }
  ]
});
