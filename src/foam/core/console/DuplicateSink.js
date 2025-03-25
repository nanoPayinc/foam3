/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'DuplicateSink',
  extends: 'foam.dao.AbstractSink',

  implements: [
    'foam.mlang.Expressions',
    'foam.lang.Serializable'
  ],

  javaImports: [
    'foam.dao.ArraySink',
    'foam.mlang.sink.GroupBy',
    'java.util.ArrayList',
    'java.util.List',
    'static foam.mlang.MLang.*'
  ],

  properties: [
    {
      class: 'foam.mlang.ExprProperty',
      name:  'expr',
      label: 'Expression'
    },
    {
      class: 'foam.mlang.SinkProperty',
      name: 'sink',
      javaFactory: 'return new ArraySink();',
      factory: function() { return this.ARRAY(); }
    },
    {
      class: 'foam.mlang.SinkProperty',
      name:  'groups',
      hidden: true,
      transient: true,
      factory: function() { return this.GROUP_BY(this.expr, this.ARRAY()); },
      javaFactory: 'return GROUP_BY(getExpr(), new ArraySink());'
    }
  ],

  methods: [
    {
      name: 'put',
      code: function put(obj, sub) {
        this.groups.put(obj, sub);
      },
      javaCode: `
        getGroups().put(obj, sub);
      `
    },

    {
      name: 'eof',
      code: function() {
        for ( var key in this.groups.groups ) {
          var a = this.groups.groups[key].array;
          if ( a.length > 1 )
            a.forEach(e => this.sink.put(e));
        }
        this.sink.eof();
      },
      javaCode: `
        GroupBy gb = (GroupBy) getGroups();

        for ( Object obj : gb.getGroups().values() ) {
          ArraySink s = (ArraySink) obj;
          List      l = s.getArray();
          if ( l.size() > 1 )
            for ( Object o : l ) getSink().put(o, null);
        }
        getSink().eof();
      `
    },

    function addToE(e) {
      this.sink?.addToE(e);
    }
  ]
});
