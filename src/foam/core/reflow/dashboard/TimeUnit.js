/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.ENUM({
  package: 'foam.core.reflow.dashboard',
  name: 'TimeUnit',

  documentation: 'Time units for Chart.js time scale configuration',

  properties: [
    {
      class: 'String',
      name: 'chartJsUnit',
      documentation: 'Chart.js time unit string'
    },
    {
      class: 'String', 
      name: 'displayFormat',
      documentation: 'Format string for displaying dates on axis'
    },
    {
      class: 'String',
      name: 'tooltipFormat', 
      documentation: 'Format string for tooltip display'
    }
  ],

  values: [
    {
      name: 'MILLISECOND',
      label: 'Millisecond',
      chartJsUnit: 'millisecond',
      displayFormat: 'SSS [ms]',
      tooltipFormat: 'MMM dd, yyyy HH:mm:ss.SSS'
    },
    {
      name: 'SECOND',
      label: 'Second', 
      chartJsUnit: 'second',
      displayFormat: 'HH:mm:ss',
      tooltipFormat: 'MMM dd, yyyy HH:mm:ss'
    },
    {
      name: 'MINUTE',
      label: 'Minute',
      chartJsUnit: 'minute', 
      displayFormat: 'HH:mm',
      tooltipFormat: 'MMM dd, yyyy HH:mm'
    },
    {
      name: 'HOUR',
      label: 'Hour',
      chartJsUnit: 'hour',
      displayFormat: 'MMM dd, HH:mm',
      tooltipFormat: 'MMM dd, yyyy HH:mm'
    },
    {
      name: 'DAY',
      label: 'Day',
      chartJsUnit: 'day',
      displayFormat: 'MMM dd',
      tooltipFormat: 'MMM dd, yyyy'
    },
    {
      name: 'WEEK',
      label: 'Week',
      chartJsUnit: 'week', 
      displayFormat: 'MMM dd',
      tooltipFormat: 'Week of MMM dd, yyyy'
    },
    {
      name: 'MONTH',
      label: 'Month',
      chartJsUnit: 'month',
      displayFormat: 'MMM yyyy',
      tooltipFormat: 'MMM yyyy'
    },
    {
      name: 'QUARTER',
      label: 'Quarter',
      chartJsUnit: 'quarter',
      displayFormat: '[Q]Q yyyy', 
      tooltipFormat: '[Q]Q yyyy'
    },
    {
      name: 'YEAR',
      label: 'Year',
      chartJsUnit: 'year',
      displayFormat: 'yyyy',
      tooltipFormat: 'yyyy'
    }
  ]
});