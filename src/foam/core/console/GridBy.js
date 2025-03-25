/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'GridBy',
  extends: 'foam.dao.AbstractSink',

  implements: [
    'foam.mlang.Expressions',
    'foam.lang.Serializable'
  ],

  javaImports: [ 'static foam.mlang.MLang.*' ],

  properties: [
    {
      class: 'foam.mlang.ExprProperty',
      name:  'xFunc',
      label: 'X-Axis Function',
      // type:  'Expr',
      help:  'Sub-expression'
    },
    {
      class: 'foam.mlang.ExprProperty',
      name:  'yFunc',
      label: 'Y-Axis Function',
      // type:  'Expr',
      help:  'Sub-expression'
    },
    {
      class: 'foam.mlang.SinkProperty',
      name:  'acc',
      label: 'Accumulator',
      // type:  'Expr',
      help:  'Sub-expression',
    },
    {
      class: 'foam.mlang.SinkProperty',
      name:  'rows',
      javaCloneProperty: '// noop',
      javaFactory: 'return GROUP_BY(getYFunc(), GROUP_BY(getXFunc(), getAcc()));',
      factory: function() {
        return this.GROUP_BY(this.yFunc, this.GROUP_BY(this.xFunc, this.acc));
      }
    },
    {
      class: 'foam.mlang.SinkProperty',
      name:  'cols',
      label: 'Columns',
      help:  'Columns.',
      javaCloneProperty: '// noop',
      javaFactory: 'return foam.mlang.MLang.GROUP_BY(getXFunc());',
      factory: function() {
        return this.GROUP_BY(this.xFunc);
      }
    }
  ],

  methods: [
    {
      name: 'put',
      code: function put(obj, sub) {
        this.cols.put(obj);
        this.rows.put(obj);
      },
      javaCode: `
        getCols().put(obj, sub);
        getRows().put(obj, sub);
      `
    },

    function addToE(e) {
      var self = this;

      var cols = this.cols.sortedKeys();
//      this.cols.addToE(e);
//      this.rows.addToE(e);
      e.start('table').
        start('tr').
          tag('th').
          forEach(cols, function(c) {
            this.start('th').add(c.toString());
          }).
        end().
        forEach(this.rows.sortedKeys(), function(r) {
          var row = self.rows.groups[r];
          this.start('tr').
            start('th').add(r).end().
            forEach(cols, function(c) {
              this.start('th').add(row.groups[c] || '');
            }).
            end();
        });
    }

    /*
    renderCell: function(x, y, value) {
      var str = value ? (value.toHTML ? value.toHTML() : value) : '';
      if ( value && value.toHTML && value.initHTML ) this.children.push(value);
      return '<td>' + str + '</td>';
    },
    sortAxis: function(values, f) { return values.sort(f.compareProperty); },
    sortCols: function(cols, xFunc) { return this.sortAxis(cols, xFunc); },
    sortRows: function(rows, yFunc) { return this.sortAxis(rows, yFunc); },
    sortedCols: function() {
      return this.sortCols(
        this.cols.groupKeys,
        this.xFunc);
    },
    sortedRows: function() {
      return this.sortRows(
        this.rows.groupKeys,
        this.yFunc);
    },
    toHTML_: function() {
      return this;
    },
    toHTML: function() {
      var out;
      this.children = [];
      var cols = this.cols.groups;
      var rows = this.rows.groups;
      var sortedCols = this.sortedCols();
      var sortedRows = this.sortedRows();

      out = '<table border=0 cellspacing=0 class="gridBy"><tr><th></th>';

      for ( var i = 0 ; i < sortedCols.length ; i++ ) {
        var x = sortedCols[i];
        var str = x.toHTML ? x.toHTML() : x;
        out += '<th>' + str + '</th>';
      }
      out += '</tr>';

      for ( var j = 0 ; j < sortedRows.length ; j++ ) {
        var y = sortedRows[j];
        out += '<tr><th>' + y + '</th>';

        for ( var i = 0 ; i < sortedCols.length ; i++ ) {
          var x = sortedCols[i];
          var value = rows[y].groups[x];
          if ( value ) {
            value.x = x;
            value.y = y;
          }
          out += this.renderCell(x, y, value);
        }

        out += '</tr>';
      }
      out += '</table>';

      return out;
    },

    initHTML: function() {
      for ( var i = 0; i < this.children.length; i++ ) {
        this.children[i].initHTML();
      }
      this.children = [];
    }
  */
  ]
});
