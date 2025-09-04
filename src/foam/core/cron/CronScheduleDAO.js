/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.cron',
  name: 'CronScheduleDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: 'Recalculate next scheduledTime on update',

  javaImports: [
    'foam.core.script.ScriptStatus',
    'foam.util.SafetyUtil'
  ],

  methods: [
    {
      name: 'put_',
      javaCode: `
        Cron newCron = (Cron) obj;
        Cron oldCron = (Cron) getDelegate().find_(x, obj);
        if ( newCron.getEnabled() &&
             ( newCron.getStatus() == ScriptStatus.UNSCHEDULED ||
               newCron.getStatus() == ScriptStatus.ERROR ||
               ( oldCron != null &&
                 ! SafetyUtil.equals(oldCron.getSchedule(), newCron.getSchedule()) ) ) ) {
          if ( newCron.isFrozen() ) {
            newCron = (Cron) newCron.fclone();
          }
          newCron.setScheduledTime(newCron.getNextScheduledTime(x));
        }
        return getDelegate().put_(x, newCron);
      `
    }
  ]
});
