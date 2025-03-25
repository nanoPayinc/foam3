/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.dashboard',
  name: 'Demo',
  extends: 'foam.dashboard.view.Dashboard',

  flags: ['web'],

  imports: [
    'cSpecDAO',
  ],

  requires: [
    'foam.dashboard.model.Count',
    'foam.dashboard.model.GroupBy',
    'foam.dashboard.model.GroupByGroupBy',
    'foam.dashboard.model.Table',
    'foam.dashboard.model.VisualizationSize'
  ],

  properties: [
    [ 'nodeName', 'div' ]
  ],

  methods: [
    function render() {
      this.SUPER();

      this.
        add(this.Count.create({
          daoName: 'cSpecDAO',
          predicate: 'is:lazy',
          size: this.VisualizationSize.TINY,
          label: 'Lazy services'
        })).
        add(this.GroupBy.create({
          daoName: 'cSpecDAO',
          arg1: 'serve',
          size: this.VisualizationSize.SMALL,
          label: 'Served/Unserved Services'
        })).
        add(this.GroupByGroupBy.create({
          daoName: 'cSpecDAO',
          arg1: 'serve',
          arg2: 'authenticate',
          size: this.VisualizationSize.MEDIUM,
          label: 'Grouped by served/authenticate',
        })).
        add(this.GroupBy.create({
          daoName: 'cSpecDAO',
          arg1: 'serve',
          size: this.VisualizationSize.MEDIUM,
          label: 'Served/Unserved Services'
        })).
        add(this.GroupBy.create({
          daoName: 'cSpecDAO',
          arg1: 'serve',
          size: this.VisualizationSize.SMALL,
          label: 'Served/Unserved Services'
        })).
        add(this.GroupBy.create({
          daoName: 'cSpecDAO',
          arg1: 'serve',
          size: this.VisualizationSize.LARGE,
          label: 'Served/Unserved Services'
        })).
        add(this.Table.create({
          daoName: 'cSpecDAO',
          size: this.VisualizationSize.LARGE,
          label: 'Served/Unserved Services'
        }));
    }
  ]
});
