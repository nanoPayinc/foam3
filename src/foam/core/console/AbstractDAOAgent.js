/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'AbstractDAOAgent',

  implements: [
    'foam.mlang.Expressions'
  ],

  imports: [ 'block', 'dao as referenceDAO', 'sinkDAO as dao', 'sinkUnlimitedDAO as unlimitedDAO' ],

  properties: [
    {
      name: 'of',
      factory: function() { return this.referenceDAO.of; }
    }
  ],

  methods: [
    function value(s) { return null; },
    function createSink() { return foam.dao.ArraySink.create(); },
    function execute(e) {
      return this.dao.select(this.createSink()).then(s => {
        this.block.value = this.value(s);
        e.add(s);
      });
    },
    function addToE() {}
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'ScriptDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  properties: [
    {
      class: 'String',
      name: 'code',
      value: '// var o is the current object\n\nconsole.log(o);\n',
      view: { class: 'foam.u2.tag.TextArea', rows: 6 },
      displayWidth: 60
    },
  ],

  methods: [
    function execute(e) {
      debugger;
      return this.dao.select(this.createSink()).then(s => {
        var a = s.array;
        for ( var i = 0 ; i < a.length ; i++ ) {
          var o = a[i];
          // TODO: get a better scope from Console
          with ( { o: o, log: this.__context__.log } ) {
            eval(this.code);
          }
//          console.log(i);
        }
      });
    },
    function createSink() { return this.ArraySink.create(); },
    function addToE(e) {
      e.startContext({data: this}).start().style({display: 'flex'}).
        add(this.CODE);
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'CountDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  methods: [
    function value(s) {
      if ( this.block.value && s.cls_ === this.block.value.cls_ ) {
        this.block.value.copyFrom(s);
        return this.block.value;
      }
      return s;
    },
    function createSink() { return this.COUNT(); }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'MinDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  properties: [
    {
      name: 'prop',
      view: function(_, X) {
       return { class: 'foam.core.console.PropertyChoiceView', of: X.data.of };
      }
    }
  ],

  methods: [
    function value(s) { return s; },
    function createSink() { return this.MIN(this.prop); },
    function addToE(e) {
      e.startContext({data: this}).start().style({display: 'flex'}).add(this.PROP);
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'MaxDAOAgent',
  extends: 'foam.core.console.MinDAOAgent',
  methods: [
    function createSink() { return this.MAX(this.prop); }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'AvgDAOAgent',
  extends: 'foam.core.console.MinDAOAgent',

  properties: [
    {
      name: 'prop',
      view: function(_, X) {
        return {
          class: 'foam.core.console.PropertyChoiceView',
          of: X.data.of,
          predicate: function(p) {
            return foam.lang.Int.isInstance(p) || foam.lang.Float.isInstance(p);
          }
        };
      }
    }
  ],

  methods: [
    function createSink() { return this.AVG(this.prop); }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'SumDAOAgent',
  extends: 'foam.core.console.AvgDAOAgent',
  methods: [
    function createSink() { return this.SUM(this.prop); }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'ScrollTableDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  methods: [
    function execute(e) {
      e.tag({class: 'foam.u2.table.TableView', data: this.unlimitedDAO});
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'TableDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  methods: [
    function createSink() { return foam.u2.mlang.Table.create({}, this); }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'CSVDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.dao.CSVSink' ],

  methods: [
    function createSink() { return this.CSVSink.create({of: this.of}); }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'XMLDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.core.console.XMLSink' ],

  methods: [
    function createSink() { return this.XMLSink.create({of: this.of}); }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'JSONDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.core.console.JSONSink' ],

  methods: [
    function createSink() { return this.JSONSink.create({of: this.of}); }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'GroupByDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  properties: [
    {
      name: 'prop',
      view: function(_, X) {
       return { class: 'foam.core.console.PropertyChoiceView', of: X.data.of };
      }
    },
    { name: 'sink', view: 'foam.core.console.SinkView' }
  ],

  methods: [
    function createSink() { return this.GROUP_BY(this.prop, this.sink.createSink()); },
    function addToE(e) {
      e.startContext({data: this}).start().style({display: 'flex'}).add(this.PROP, ', ', this.SINK);
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'DuplicateDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.core.console.DuplicateSink' ],

  properties: [
    {
      name: 'prop',
      view: function(_, X) {
       return { class: 'foam.core.console.PropertyChoiceView', of: X.data.of };
      }
    },
    { name: 'sink', view: 'foam.core.console.SinkView' }
  ],

  methods: [
    function createSink() { return this.DuplicateSink.create({expr: this.prop, sink: this.sink.createSink()}); },
    function addToE(e) {
      e.startContext({data: this}).start().style({display: 'flex'}).add(this.PROP, ', ', this.SINK);
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'GridByDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.core.console.GridBy' ],

  properties: [
    {
      name: 'prop1',
      view: function(_, X) {
       return { class: 'foam.core.console.PropertyChoiceView', of: X.data.of };
      }
    },
    {
      name: 'prop2',
      view: function(_, X) {
       return { class: 'foam.core.console.PropertyChoiceView', of: X.data.of };
      }
    },
    { name: 'sink', view: { class: 'foam.core.console.SinkView', choice: 'Count' } }
  ],

  methods: [
    function createSink() { return this.GridBy.create({
      yFunc: this.prop1,
      xFunc: this.prop2,
      acc:   this.sink.createSink()
    }); },
    function addToE(e) {
      e.startContext({data: this}).start().style({display: 'flex'}).add(this.PROP1, ', ', this.PROP2, ', ', this.SINK);
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'PieDAOAgent',
  extends: 'foam.core.console.GroupByDAOAgent',

  requires: [ 'foam.u2.mlang.Pie' ],

  properties: [ { class: 'Int', name: 'radius', value: 50 } ],

  methods: [
    function createSink() {
      return this.Pie.create({arg1: this.prop, radius: this.radius});
    },
    function addToE(e) {
      e.startContext({data: this}).start().style({display: 'flex'}).
        add(' r:', this.RADIUS,' ', this.PROP);
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'ViewDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.core.console.ViewSink' ],

  methods: [
    function createSink() { return this.ViewSink.create({arg1: this.prop}); },
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'EditDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.core.console.EditSink' ],

  methods: [
    function createSink() { return this.EditSink.create({arg1: this.prop}); },
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'ControllerDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  methods: [
    function execute(e) {
      e.tag({class: 'foam.comics.v3.DAOView', data: this.unlimitedDAO});
    }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'CitationDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.core.console.CitationSink' ],

  methods: [
    function createSink() { return this.CitationSink.create({of: this.of}); }
  ]
});



foam.CLASS({
  package: 'foam.core.console',
  name: 'CellsDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.core.console.CellsSink' ],

  methods: [
    function createSink() { return this.CellsSink.create({of: this.of}); }
  ]
});


foam.CLASS({
  package: 'foam.core.console',
  name: 'AllDAOAgent',
  extends: 'foam.core.console.AbstractDAOAgent',

  requires: [ 'foam.u2.CitationView' ],

  methods: [
    function execute(e) {
      foam.core.console.SinkView.AGENTS.forEach(a => {
        a = a[0];
        if ( a == 'All' ) return;
        if ( a == 'Duplicate' ) return;
        if ( a == 'GroupBy' ) return;
        if ( a == 'GridBy' ) return;
        if ( a == 'Pie' ) return;
        if ( a == 'Min' ) return;
        if ( a == 'Max' ) return;
        if ( a == 'Sum' ) return;
        if ( a == 'Avg' ) return;

        var cls = foam.lookup(this.cls_.package + '.' + a + 'DAOAgent');
        var agent = cls.create({}, this);
        e.start('h2').add(a).end().start().call(function () { agent.execute(this); });
      });
    }
  ]
});
