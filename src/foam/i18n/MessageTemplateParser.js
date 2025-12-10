/**
* @license
* Copyright 2024 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.i18n',
  name: 'MessageTemplateParser',
  requires: [
    'foam.parse.Parsers',
    'foam.parse.ImperativeGrammar',
  ],
  documentation: `model messages: [] supports templating for key/value
replacement at runtime.

general format:
  messages: [
    { name: 'MSG_CONSTANT1', message: 'Message text with one \${templateKey1} or more \${templateKey2} template keys', template: true },
    { name: 'MSG_CONSTANT2', message: '\${this.MSG_CONSTANT1} or \${this.propertyName}', template: true },

templateKey is resolved as follows:
1. value is explicitly provided during rendering of the message:
  this.E().... .add(this.MSG_CONSTANT1({ templateKey1: this.data...}))
2. if preceeded with 'this', attempt match this[key] (can use class constants like other messages or instance values). 
Also supports dot notation for FObject properties.
  `,

  properties: [
    {
      name: 'value',
      // Test Value
      // value: 'Hello ${toName} from ${fromName}',
    },
    {
      name: 'valueParserResults',
      hidden: true,
      expression: function(value) {
        var parsedValue = this.grammar.parseString(value);
        return parsedValue;
      }
    },
  ],
  methods: [
    function addLiteral(a) {
      let str = a.join('');
      return () => { return str; } 
    },
    function addParam(a) {
      return map => {
        if ( a.indexOf('.') != -1 ) {
          let arr = a.split('.');
          let ret = map;
          arr.forEach(element => {
            ret = ret[element];
          });
          return ret;
        };
        return map[a];
      }
    }
  ],
  grammars: [
    {
      name: 'grammar',
      language: 'foam.parse.json.Parsers',
      symbols: function() {
        return {
          START: sym('string'),
          string: repeat(
              alt(sym('literal'), sym('parameter'))
          ),
          literal: repeat(not(sym('parameter'), anyChar()), null, 1),
          parameter: seq('${', sym('identifier'), '}'),
          identifier: repeat(not('}', anyChar()))
        };
      },
      actions: [
        function literal(a) {
          return this.addLiteral(a);
        },
        function parameter(a) {
          return this.addParam(a[1]);
        },
        function identifier(a) {
          return a.join('');
        },
        function string(a) {
          return a;
        }
      ],
    },
  ],
});
