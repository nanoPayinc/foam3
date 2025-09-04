/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.cron',
  name: 'CronScheduledComparator',
  implements: ['foam.mlang.order.Comparator'],

  documentation: 'Comparator function for ordering Crons for table view.',

  methods: [
    {
      name: 'compare',
      javaCode: `
          if ( o1 == null && o2 == null ) return 0;
          if ( o1 == null ) return -1;
          if ( o2 == null ) return 1;

          Cron c1 = (Cron) o1;
          Cron c2 = (Cron) o2;

          // Enabled before disabled
          if ( c1.getEnabled() && ! c2.getEnabled() ) return -1;
          if ( ! c1.getEnabled() && c2.getEnabled() ) return 1;

          // Scheduled Time - earliest first (next to run)
          if ( c1.getScheduledTime() != null && c2.getScheduledTime() != null ) {
            int result = c1.getScheduledTime().compareTo(c2.getScheduledTime());
            if ( result == 0 )
              return c1.getId().compareTo(c2.getId());
            return result;
          }
          if ( c1.getScheduledTime() != null ) return 1;
          if ( c2.getScheduledTime() != null ) return -1;

          // Last Run - greatest (most recent) first
          if ( c1.getLastRun() != null && c2.getLastRun() != null ) {
            int result = c2.getLastRun().compareTo(c1.getLastRun());
            if ( result == 0 )
              return c1.getId().compareTo(c2.getId());
            return result;
          }
          if ( c1.getLastRun() != null ) return 1;
          if ( c2.getLastRun() != null ) return -1;

          if ( c1.getEnabled() ) return -1;
          if ( c2.getEnabled() ) return 1;

          return c1.getId().compareTo(c2.getId());
      `
    },
    {
      name: 'createStatement',
      javaCode: 'return null;',
    },
    {
      name: 'prepareStatement',
      javaCode: 'return;'
    },
  ]
});
