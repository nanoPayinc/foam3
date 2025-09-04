/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.reflow',
  name: 'ColumnParser',
  extends: 'foam.parse.Grammar',

  documentation: "Call either .parseString() to parse an individual column or .parseString(columns, 'columnList') to parse a array of columns.",

  properties: [
    'of'
  ],

  methods: [
    function grammar(alt, seq, seq0, seq1, eof, literal, literalIC, repeat, repeat0, sym) {
      var fs  = [];
      var ps = this.of.getAxiomsByClass(foam.lang.Property);

      function addProperty(p, lit) {
        // Name
        fs.push(lit(p.name, p));

        // Shortname
        if ( p.shortName )
          fs.push(lit(p.shortName, p));

        // Aliases
        p.aliases.forEach(a => fs.push(lit(a, p)));
      }

      // Four chances to match:
      ps.forEach(p => addProperty(p, literal));
      ps.forEach(p => addProperty(p, literalIC));
      ps.forEach(p => addProperty(p, (n, p) => literalIC(foam.String.constantize(n).replaceAll('_', ' '), p)));
      ps.forEach(p => addProperty(p, (n, p) => literalIC(foam.String.constantize(n), p)));

      var fieldNameParser = alt.apply(null, fs.map(f => seq1(0, f, sym('end'))));

      return {
        START: sym('fieldName'),

        end: alt(',', eof()),

        fieldName: fieldNameParser,

        ws: repeat0(' '),

        comma: seq0(sym('ws'), ',', sym('ws')),

        columnList: seq1(1,
          sym('ws'),
          repeat(sym('fieldName'), sym('comma')),
          sym('ws'),
          eof())
      };
    }
  ]
});
