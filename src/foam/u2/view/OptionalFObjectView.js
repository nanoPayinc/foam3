/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.view',
  name: 'OptionalFObjectView',
  extends: 'foam.u2.Controller',

  documentation: `
    View for editing FObjects we can be undefined.
    The regular FObjectView will create an new object of type 'of'
    if given a null or undefined data value. This FObjectView
    allows for the object to remain as undefined and it allows for
    a previously defined value to become undefined.
  `,

  properties: [
    {
      class: 'Boolean',
      name: 'defined',
      postSet: function(o, n) {
        if ( ! o && n && ! this.data ) {
          this.data = this.oldData || this.of.create();
        } else if ( o && ! n ) {
          this.oldData = this.data;
          this.data = null;
        }
      }
    },
    {
      name: 'data',
      postSet: function(o, n) {
        this.instance_.defined = !! n;
      }
    },
    // Last known data, so if moved to undefined and then back, old values
    // aren't lost.
    'oldData',
    {
      name: 'of'
    }
  ],

  methods: [
    function fromProperty(prop) {
      this.of = prop.of;
    },

    function render() {
      this.SUPER();
      this.tag(this.DEFINED).tag({class: 'foam.u2.DetailView', data$: this.data$});
    }
  ]
});
