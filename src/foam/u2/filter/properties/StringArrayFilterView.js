/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.filter.properties',
  name: 'StringArrayFilterView',
  extends: 'foam.u2.filter.properties.StringFilterView',

  documentation: 'Filter view for String[] properties. Builds OR(IN("x", prop), IN("y", prop), ...).',

  requires: [
    'foam.u2.CheckBox',
    'foam.u2.TextField'
  ],

  properties: [
    {
      class: 'String',
      name: 'search',
      documentation: 'Client-side starts-with filter for option names.',
      postSet: function() { this.daoUpdate(); }
    },
    { class: 'Int',     name: 'maxOptionCount', value: 20 },
    { name: 'countByContents', factory: function() { return {}; } },
    {
      name: 'availableOptions',
      expression: function(countByContents, selectedOptions) {
        var all = Object.keys(countByContents || {});
        if ( ! all.length ) return [];
        var set = new Set(selectedOptions || []);
        return all.filter(o => ! set.has(o)).sort();
      }
    },
    {
      name: 'predicate',
      expression: function(selectedOptions, property) {
        if ( ! selectedOptions || selectedOptions.length === 0 ) return this.TRUE;
        if ( selectedOptions.length === 1 ) return this.IN(selectedOptions[0], property);
        var self = this;
        return selectedOptions.reduce(function(acc, v) {
          var term = self.IN(v, property);
          return acc ? self.OR(acc, term) : term;
        }, null);
      }
    }
  ],

  methods: [
    function render() {
      this.SUPER();
      this.onDetach(this.selectedOptions$.sub(this.daoUpdate));
    },

    function getLabelWithCount(option) {
      var c = (this.countByContents && this.countByContents[option]) || 0;
      return c > 1 ? '[' + c + '] ' + (option || this.LABEL_EMPTY) : (option || this.LABEL_EMPTY);
    },
  ],

  listeners: [
    {
      name: 'daoUpdate',
      isMerged: true,
      delay: 200,
      code: function() {
        var self = this;
        this.isLoading = true;
        this.isOverLimit = false;

        var q = (this.search || '').trim().toLowerCase();

        // Count from dao.where(this.predicate)
        this.dao.where(this.predicate).select().then(function(sink) {
          var arr = sink && (sink.array || sink.a || sink) || [];
          var map = Object.create(null);

          for ( var i = 0; i < arr.length; i++ ) {
            var vals = self.property.f(arr[i]) || [];
            if ( ! Array.isArray(vals) ) continue;

            for ( var j = 0; j < vals.length; j++ ) {
              var raw = vals[j];
              if ( raw == null ) continue;

              var key = ('' + raw).trim();
              if ( q && key.toLowerCase().indexOf(q) !== 0 ) continue; // starts-with

              map[key] = (map[key] || 0) + 1;
            }
          }

          self.countByContents = map;
          self.isOverLimit = Object.keys(map).length > self.maxOptionCount;
        }).finally(() => { self.isLoading = false; });
      }
    },
    {
      name: 'selectOption',
      code: function(index) {
        var opt = this.availableOptions[index];
        if ( ! opt ) return;
        this.selectedOptions = this.selectedOptions.concat([ opt ]);
      }
    }
  ]
});