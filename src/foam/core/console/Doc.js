/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */


foam.CLASS({
  package: 'foam.core.console',
  name: 'DocView',
  extends: 'foam.u2.View',

  requires: [ 'foam.u2.HTMLView' ],

  css: `
    ^ { margin-right: 10px; }
  `,

  methods: [
    function render() {
      this.
        addClass().
        show(this.data.visible$).
        tag(this.HTMLView, {data$: this.data.richText$});
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'Doc',

  properties: [
    {
      class: 'Boolean',
      name: 'visible',
      value: true
    },
    {
      class: 'String',
      name: 'richText',
      label: '',
      view: 'foam.u2.view.RichTextView'
    }
  ],

  methods: [
    function addToE(e) {
      e.tag(foam.core.console.DocView, {data: this});
    }
  ]
});
