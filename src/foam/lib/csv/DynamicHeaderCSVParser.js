/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.lib.csv',
  name: 'DynamicHeaderCSVParser',
  documentation: `
    A CSV parser that doesn't care about the order of the header. You would
    use this parser when you have a CSV that contains a header and want the
    parser to figure out which column maps to which property.

    This parser makes use of the foam.lang.Property's fromCSVLabelMapping
    which allows one property to map to multiple columns.
  `,
  requires: [
    'foam.parse.StringPStream'
  ],
  grammars: [
    {
      name: 'csvRow',
      symbols: function() {
        return {
          START: seq1(0, repeat(sym('field'), ',')),
          field: alt(sym('quotedText'), sym('unquotedText'), ''),
          unquotedText: repeat(not(alt(',','\n', '\r'), anyChar()), '', 1),
          quotedText: seq1(1, '"', repeat(alt(sym('escapedQuote'), not('"', anyChar()))), '"'),
          escapedQuote: '""'
        };
      },
      actions: {
        unquotedText: function (a) {
          return a.join('');
        },
        quotedText: function (a) {
          return a.join('');
        },
        escapedQuote: function () { return '"'; }
      }
    }
  ],
  methods: [
    function fromCSV(cls, s, sink) {
      var propMap = cls.getAxiomsByClass(foam.lang.Property)
        .reduce((map, p) => {
          p.fromCSVLabelMapping(map, p);
          return map;
        }, {});

      var ps = this.StringPStream.create();
      ps.setString(s);

      ps = ps.apply(this.csvRow.getSymbol('START'), this.csvRow);

      var headers = ps.value;
      headers.forEach(h => {
        if ( ! propMap[h.trim()] ) {
          console.warn('Unknown label', h, 'for class', cls.id);
        }
      });
      while ( ps.tail.valid ) {
        ps = ps.tail.apply(this.csvRow.getSymbol('START'), this.csvRow);
        var obj = cls.create();
        ps.value.forEach((v, i) => {
          var prop = propMap[headers[i]];
          prop && prop.set(obj, v);
        });
        sink.put(obj);
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.lib.csv',
  name: 'PropertyFromCSV',
  refines: 'foam.lang.Property',
  properties: [
    {
      class: 'Function',
      name: 'fromCSVLabelMapping',
      value: function(map, prop) {
        map[prop.name] = prop;
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.lib.csv',
  name: 'FObjectPropertyFromCSV',
  refines: 'foam.lang.FObjectProperty',
  properties: [
    {
      class: 'Function',
      name: 'fromCSVLabelMapping',
      value: function(map, prop) {
        prop.of.getAxiomsByClass(foam.lang.Property)
          .forEach(a => {
            var m = {};
            a.fromCSVLabelMapping(m, a);
            Object.keys(m).forEach(k => {
              map[prop.name + '.' + k] = {
                set: function(o, value) {
                  o[prop.name] = o[prop.name] || prop.of.create();
                  m[k].set(o[prop.name], value);
                }
              };
            });
          });
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.lib.csv',
  name: 'FObjectArrayFromCSV',
  refines: 'foam.lang.FObjectArray',
  properties: [
    {
      class: 'Function',
      name: 'fromCSVLabelMapping',
      value: function(map, prop) {
        map[prop.name] = {
          set: function(o, value) {
            o[prop.name] = foam.json.parseString(value);
          }
        };
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.lib.csv',
  name: 'ArrayFromCSV',
  refines: 'foam.lang.Array',
  properties: [
    {
      class: 'Function',
      name: 'fromCSVLabelMapping',
      value: function(map, prop) {
        map[prop.name] = {
          set: function(o, value) {
            o[prop.name] = foam.json.parseString(value);
          }
        };
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.lib.csv',
  name: 'StringArrayFromCSV',
  refines: 'foam.lang.StringArray',
  properties: [
    {
      class: 'Function',
      name: 'fromCSVLabelMapping',
      value: function(map, prop) {
        map[prop.name] = {
          set: function(o, value) {
            o[prop.name] = foam.json.parseString(value);
          }
        };
      }
    }
  ]
});
