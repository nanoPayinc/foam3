/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.cm',
  name: 'CM',
  plural: 'Computed Measures',

  implements: [
    'foam.core.ContextAgent'
  ],

  javaImports: [ 
    'foam.dao.DAO',
    'foam.nanos.cron.CronSchedule',
    'foam.nanos.logger.Loggers'
  ],

  documentation: `
    A computed measure.
    Beanshell code that should call setResult.
    eg: x.get("this").setResult("Foo")
  `,

  tableColumns: [ 'id', 'description', 'keywords', 'result', 'lastComputed', 'update' ],

  properties: [
    {
      class: 'String',
      name: 'id'
    },
    {
      class: 'String',
      name: 'description',
      tableWidth: 450
    },
    {
      class: 'StringArray',
      name: 'keywords',
      shortName: 'k'
    },
    {
      class: 'Boolean',
      name: 'enabled',
      value: true
    },
    {
      class: 'String',
      name: 'result',
      storageTransient: true
    },
    {
      class: 'DateTime',
      name: 'lastComputed',
      storageTransient: true
    },
    {
      class: 'DateTime',
      name: 'expiry',
      storageTransient: true
    },
    {
      class: 'Int',
      name: 'validity',
      value: 1
    },
    {
      class: 'Enum',
      of: 'foam.time.TimeUnit',
      name: 'timeUnit',
      value: 'HOUR'
    },
    {
      name: 'schedule',
      class: 'FObjectProperty',
      of: 'foam.nanos.cron.Schedule',
      view: {
        class: 'foam.u2.view.FObjectView',
        of: 'foam.nanos.cron.Schedule'
      },
      javaFactory: `
        return new CronSchedule
                .Builder(getX())
                .setSecond(0)
                .setMinute(0)
                .setHours("-1")
                .build();
      `
    },
    {
      class: 'Code',
      name: 'code',
      documentation: 'Beanshell code that should call x.get("this").setResult(result).',
      writePermissionRequired: true
    }
  ],

  methods: [
    {
      name: 'execute',
      type: 'Void',
      args: 'Context x',
      javaCode: `
        try {
          new foam.nanos.script.BeanShellExecutor(null).execute(
            x.put("this", this),
            new java.io.PrintStream(new java.io.ByteArrayOutputStream()),
            getCode());
        } catch(Exception e) {
          setResult(e.toString());
          Loggers.logger(x, this).error("CM: \`" + getId() + "\` failed to execute", e);
        }
      `
    },
    {
      name: 'reschedule',
      type: 'Void',
      args: 'Context x',
      javaCode: `
        try {
          setLastComputed(new java.util.Date());
          setExpiry(getSchedule().getNextScheduledTime(x, null));
        } catch (Exception e) {
          Loggers.logger(x, this).error("CM: \`" + getId() + "\` failed to schedule", e);
        }
      `
    },
    {
      name: 'executeAndReschedule',
      type: 'CM',
      args: 'Context x',
      javaCode: `
        CM  cm  = (CM) this.fclone();
        DAO dao = (DAO) x.get("cmDAO");

        cm.execute(x);
        cm.reschedule(x);

        return (CM) dao.put_(x, cm);
      `
    }
  ],

  actions: [
    {
      name: 'update',
      code: async function(x) {
        var cm = await x.cmDAO.cmd(['update', this.id]);
        this.copyFrom(cm);
      }
    }
  ]
});
