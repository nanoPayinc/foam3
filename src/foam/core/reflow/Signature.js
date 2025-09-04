/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */


foam.CLASS({
  package: 'foam.core.reflow',
  name: 'SignatureView',
  extends: 'foam.u2.View',

  css: `
    ^ .foam-u2-ActionView {
      margin-left: 24px;
      height: 24px;
    }
  `,

  methods: [
    function render() {
      this.
        addClass().
        add(this.data.label$, ' Signature: ').
        start('span').
          show(this.data.signor$).
          style({border: '3px solid black', padding: '0 3px' }).
          add(this.data.signor$).
        end().
        add(' ', this.data.timestamp$.map(ts => ts ? '' + ts : ''), ' ')
        .start('span').style({color: 'red'}).add(this.data.prerequisite$).end().
        add(this.data.SIGN, this.data.UNSIGN);
      // TODO: I don't know why the timestamp$.map is required
    }
  ]
});


foam.CLASS({
  package: 'foam.core.reflow',
  name: 'Signature',

  properties: [
    {
      class: 'String',
      name: 'label',
      visibility: function(signed) {
        return signed ? foam.u2.DisplayMode.RO : foam.u2.DisplayMode.RW;
      }
    },
    {
      class: 'Boolean',
      name: 'signed',
      visibility: 'RO'
    },
    {
      class: 'String',
      name: 'signor',
      visibility: 'RO'
    },
    {
      class: 'DateTime',
      name: 'timestamp',
      visibility: 'RO'
    },
    {
      class: 'String',
      name: 'prerequisite',
      visibility: function(signed) {
        return signed ? foam.u2.DisplayMode.RO : foam.u2.DisplayMode.RW;
      }
    },
    {
      class: 'String',
      name: 'permission',
      visibility: function(signed) {
        return signed ? foam.u2.DisplayMode.RO : foam.u2.DisplayMode.RW;
      }
    }
  ],

  methods: [
    function addToE(e) {
      e.tag(foam.core.reflow.SignatureView, {data: this});
    }
  ],

  actions: [
    {
      name: 'sign',
      isAvailable: function(signed, prerequisite) { return ! signed && ! prerequisite; },
      code: function() {
        this.signor    = 'Kevin Greer';
        this.timestamp = new Date();
        this.signed    = true;
      }
    },
    {
      name: 'unsign',
      isAvailable: function(signed) { return signed; },
      code: function() {
        this.signor = this.timestamp = this.signed = undefined;
      }
    }
  ]
});
