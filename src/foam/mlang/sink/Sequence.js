/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.mlang.sink',
  name: 'Sequence',
  extends: 'foam.dao.AbstractSink',
  implements: [ 'foam.lang.Serializable' ],

  properties: [
    {
      class: 'Boolean',
      name: 'horizontal'
    },
    {
      class: 'Array',
      type: 'foam.dao.Sink[]',
      name: 'args'
    }
  ],

  methods: [
    {
      name: 'put',
      code: function(obj, s) {
        this.args.forEach(function(a) {
          a.put(obj, s);
        });
      },
      javaCode: `for ( int i = 0 ; i < getArgs().length ; i++ ) {
  getArgs()[i].put(obj, sub);
}`
    },
    {
      name: 'remove',
      code: function(obj, s) {
        this.args.forEach(function(a) { a.remove(obj, s); });
      },
      javaCode: `for ( int i = 0 ; i < getArgs().length ; i++ ) {
  getArgs()[i].remove(obj, sub);
}`
    },
    {
      name: 'reset',
      code: function(s) {
        this.args.forEach(function(a) { a.reset(s); });
      },
      javaCode: `for ( int i = 0 ; i < getArgs().length ; i++ ) {
  getArgs()[i].reset(sub);
}`
    },
    function toString() {
      return 'SEQ(' + this.args.map(function(a) { return a.toString(); }).join(',') + ')';
    },
    function addToE(e) {
      var self = this;
      if ( this.horizontal ) {
        e.start('span').style({display:'flex'}).call(function() {
          self.args.forEach(a => e.start('span').style({padding: '8px'}).add(a));
        });
      } else {
        this.args.forEach(a => e.start('div').add(a));
      }
    },

    function toProperties() {
      return this.args.map(a => a.toProperties ? a.toProperties() : a.VALUE ).flat();
    },
    function setPropertyValues(o, sink, ps) {
      for ( var i = 0 ; i < this.args.length ; i++ )
        ps[i].set(o, sink.args[i].value);
    }
  ]
});
