/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'org.chartjs',
  name: 'Line2',
  extends: 'foam.graphics.CView',

  mixins: [ 'org.chartjs.Lib' ],

  properties: [
    'chart',
    {
      name: 'data',
      factory: function() {
        return {
          datasets: []
        };
      },
      postSet: function() {
        this.update();
      }
    },
    {
      name: 'options',
      postSet: function() {
        this.update();
      }
    },
    {
      name: 'chartJSOptions',
      factory: function() {
        return {};
      },
      postSet: function() {
        this.update();
      }
    },
    {
      name: 'localOptions',
      factory: function() {
        return {
          responsive: false,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          stacked: false,
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left'
            }
          }
        };
      }
    },
    // {
    //   name: 'xAxis',
    //   postSet: function(_, v) {
    //     if ( this.chart ) {
    //       this.chart.options.scales.xAxes = [v];
    //     }
    //   }
    // },
    {
      name: 'config',
      factory: function() {
        return {
          type: 'line',
          data: this.data,
          options: this.allOptions()
        };
      }
    }
  ],

  methods: [
    function paintSelf(x) {
      if ( ! this.chart ) {
        this.chart = new Chart(x, this.config);
        this.update();
      }
      this.chart.render();
    },
    function allOptions() {
      var result = {...this.localOptions};
      
      // Merge chartJSOptions (used by DashboardDAOAgents)
      if (this.chartJSOptions && Object.keys(this.chartJSOptions).length > 0) {
        result = {...result, ...this.chartJSOptions};
      }
      
      // Merge options (existing Line2 usage)
      if (this.options && Object.keys(this.options).length > 0) {
        result = {...result, ...this.options};
      }
      
      return result;
    }
  ],

  listeners: [
    {
      name: 'update',
      isFramed: true,
      on: [
        'this.propertyChange.data',
        'this.propertyChange.options',
        'this.propertyChange.chartJSOptions'
      ],
      code: function() {
        if ( ! this.chart ) return;

        this.chart.data = this.data;
        this.chart.options = this.allOptions();
        this.chart.update();
      }
    }
  ]
});
