/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.pm',
  name: 'PMTemperatureCellFormatter',
  implements: ['foam.u2.view.Formatter'],

  requires: ['foam.core.pm.TemperatureCView'],

  methods: [
    function format(e, value, obj, axiom) {
      e.tooltip = foam.lang.Duration.duration(value);
      e.tag({ class: 'foam.core.pm.TemperatureCView', totalTime: value });
    }
  ]
});
