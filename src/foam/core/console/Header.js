/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */


foam.CLASS({
  package: 'foam.core.console',
  name: 'HeaderView',
  extends: 'foam.u2.View',

  css: `
  `,

  methods: [
    function render() {
      this.
        addClass().
        add(this.data.dynamic(function(color, type, visible, text) {
          if ( visible ) this.start(type).style({color: color}).add(text).end();
        }));
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'Header',

  properties: [
    {
      class: 'String',
      name: 'type',
      value: 'h1',
      displayWidth: 10,
      view: { class: 'foam.u2.TextField', choices: [ 'H1', 'H2', 'H3', 'H4', 'B', 'I' ] }
    },
    {
      class: 'String',
      name: 'text',
      onKey: true,
      displayWidth: 60
    },
    {
      class: 'Boolean',
      name: 'visible',
      value: true
    },
    {
      class: 'Color',
      name: 'color',
      value: '#333'
    }
  ],

  methods: [
    function addToE(e) {
      e.tag(foam.core.console.HeaderView, {data: this});
    }
  ]
});
