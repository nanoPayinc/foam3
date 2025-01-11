/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.flow',
  name: 'MarkupEditor',
  extends: 'foam.u2.View',

  requires: [
    // We don't require Document as it causes a circular dependency
    // that the classloader can't deal with yet.
//    'foam.flow.Document',
    'foam.u2.tag.TextArea'
  ],

  css: `
^{
table-layout: fixed;
}

^left {
}
^right {
}`,

  properties: [
    {
      name: 'preview'
    }
  ],

  methods: [
    function render() {
      this.onDetach(this.data$.sub(this.updatePreview));
      this.updatePreview();

      this.
        start('table').
        style({width: '80%'}).
        addClass(this.myClass()).
        start('tr').
        start('td').
          attrs({ valign: 'top', width: '50%' }).
          addClass(this.myClass('left')).
          tag(this.TextArea, { rows: 24, cols: 80, onKey: true, data$: this.data$ }).
        end('td').
        start('td').
          attrs({ valign: 'top', width: '50%' }).
          style({'word-break': 'break-word'}).
          addClass(this.myClass('right')).
        add(this.dynamic(function(preview) {
          if ( preview ) this.tag(preview.toE(null, this.__subSubContext__));
          })).
        end('td').
        end('tr').
        end('table');
    }
  ],

  listeners: [
    {
      name: 'updatePreview',
      isMerged: 1000,
      code: function() {
        this.preview = this.__context__.lookup('foam.flow.Document').create({markup: this.data});
      }
    }
  ]
});
