/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.mlang',
  name: 'Table',
  extends: 'foam.dao.ArraySink',

  requires: [
    'foam.dao.MDAO',
    'foam.u2.view.TableView'
  ],

  properties: [
    {
      name: 'dao',
      factory: function() {
        var dao = this.MDAO.create({of: this.of});
        this.array.forEach(a => dao.put(a));
        return dao;
      }
    },
    {
      class: 'Class',
      name: 'of'
    },
    {
      name: 'view',
      expression: function(columns) {
        if ( ! this.array.length ) return 'No results';
        if ( ! this.of ) this.of = this.array[0].cls_;

        var tv = this.TableView.create({ data: this.dao });
        if ( columns.length ) {
          tv.columns = columns.map(function(c) { return of.getAxiomByName(c) });
        }
        return tv;
      }
    },
    {
      class: 'StringArray',
      name: 'columns'
    }
  ],

  methods: [
    /*
    function put(o) {
      if ( ! this.of ) this.of = o.cls_
      this.SUPER(o);
      },*/
    function toE(_, x) {
      return x.E().add(this.view$);
    },
    function addToE(e) {
      e.add(this.view$);
    }
  ]
});
