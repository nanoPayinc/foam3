/**
* @license
* Copyright 2024 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.nanos.cron',
  name: 'UnscheduleSchedulableRuleAction',
 
  documentation: 'Remove schedulable from cronjobDAO',
 
  implements: [
    'foam.nanos.ruler.RuleAction'
  ],
 
  javaImports: [
    'foam.core.ContextAgent',
    'foam.core.FObject',
    'foam.core.X',
    'foam.dao.DAO',
    'foam.nanos.cron.Schedulable'
  ],
 
  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            var schedulable = (Schedulable) ((FObject)obj).fclone();

            DAO cronJobDAO = (DAO) x.get("cronJobDAO");
            var cronJob = cronJobDAO.find(schedulable.getId());
            if ( cronJob != null )
              cronJobDAO.remove(cronJob);
          }
        }, "Remove schedulable from cronjobDAO");
      `
    }
  ]
 });
 