/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'PropertyListView',
  extends: 'foam.u2.Controller',

  css: `
    ^ { display: inline-flex; }
  `,

  properties: [
    'of',
    {
      class: 'String',
      name: 'data',
      width: '80',
      placeholder: '*'
    },
    {
      name: 'choice',
      view: function(_, X) { return { class: 'foam.core.console.PropertyChoiceView', of: X.data.of, optionalChoice: '*' } },
      preSet: function(o, n) {
        if ( n == '*' ) {
          this.data = '';
        } else {
          if ( this.data ) this.data += ',';
          this.data += n.name;
        }
        return n;
      }
    }
  ],

  methods: [
    function render() {
      this.SUPER();
      this.addClass();
      this.add(this.DATA, ' ', this.CHOICE);
    }
  ]
});
