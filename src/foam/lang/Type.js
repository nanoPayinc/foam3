/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.LIB({
  name: 'foam.lang.type',
  methods: [
    function toType(str) {
      if ( ! str ) {
        return foam.lang.type.Any.create()
      }

      if ( foam.isRegistered('foam.lang.type.' + str) ) {
        return foam.lookup("foam.lang.type." + str).create();
      }

      if ( str.endsWith('[]') ) {
        return foam.lang.type.Array.create({
          type: foam.lang.type.toType(str.substring(0, str.lastIndexOf('[]')))
        })
      }

      if ( foam.isRegistered(str) ) {
        return foam.lang.type.FObject.create({ of: str })
      }

      return foam.lang.type.SimpleType.create({
        java: str,
        swift: str
      });
    }
  ]
});


foam.INTERFACE({
  package: 'foam.lang.type',
  name: 'Type',
  methods: [
    {
      name: 'refs',
      type: 'String[]',
    },
    {
      name: 'toJavaType',
      type: 'String'
    },
    {
      name: 'toSwiftType',
      args: [
        { type: 'Boolean', name: 'optional' },
      ],
      type: 'String'
    }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'SimpleType',
  properties: [
    {
      class: 'String',
      name: 'java'
    },
    {
      class: 'String',
      name: 'swift'
    },
  ],
  methods: [
    function refs() { return [] },
    function toJavaType() { return this.java },
    function toSwiftType(optional) {
      return this.swift + (optional ? '?' : '')
    },
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Any',
  implements: ['foam.lang.type.Type'],
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  methods: [
    function refs() { return [] },
    function toJavaType() { return 'Object' },
    function toSwiftType() { return 'Any?' }
  ],
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Object',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'Object'],
    ['swift', 'Any']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Byte',
  implements: ['foam.lang.type.Type'],
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  methods: [
    function refs() { return []; },
    function toJavaType() { return 'byte'; },
    function toSwiftType() { return 'Int8'; }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Short',
  implements: ['foam.lang.type.Type'],
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  methods: [
    function refs() { return []; },
    function toJavaType() { return 'short'; },
    function toSwiftType() { return 'Int16'; }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Integer',
  implements: ['foam.lang.type.Type'],
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  methods: [
    function refs() { return []; },
    function toJavaType() { return 'int'; },
    function toSwiftType() { return 'Int'; }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Void',
  implements: ['foam.lang.type.Type'],
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  methods: [
    function refs() { return []; },
    function toJavaType() { return 'void'; },
    function toSwiftType() { return 'Void'; }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'String',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'String'],
    ['swift', 'String']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Long',
  implements: ['foam.lang.type.Type'],
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  methods: [
    function refs() { return []; },
    function toJavaType() { return 'long'; },
    function toSwiftType() { return 'Int'; }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Array',
  implements: ['foam.lang.type.Type'],
  // Should be Multiton, but multitons don't work for non-string properties.
  // axioms: [ { class: 'foam.pattern.Multiton', property: 'type' } ],
  properties: [
    {
      name: 'type'
    }
  ],
  methods: [
    function refs() { return this.type.refs() },
    function toJavaType() {
      return `${this.type.toJavaType()}[]`
    },
    function toSwiftType(optional) {
      return `[${this.type.toSwiftType()}]` + (optional ? '?' : '')
    }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Boolean',
  implements: ['foam.lang.type.Type'],
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  methods: [
    function refs() { return []; },
    function toJavaType() { return 'boolean'; },
    function toSwiftType() { return 'Bool'; }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'FObject',
  implements: ['foam.lang.type.Type'],
  properties: [
    {
      class: 'Class',
      name: 'of',
      value: 'foam.lang.FObject',
    }
  ],
  methods: [
    function refs() { return [this.of.id] },
    function toJavaType() { return this.of.id },
    function toSwiftType(optional) {
      return this.of.model_.swiftName + (optional ? '?' : '')
    }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Char',
  implements: ['foam.lang.type.Type'],
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  methods: [
    function refs() { return []; },
    function toJavaType() { return 'char'; },
    function toSwiftType() { return 'Character'; }
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'DateTime',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'java.util.Date'],
    ['swift', 'Date']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Time',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'java.util.Date'],
    ['swift', 'Date']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Date',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'java.util.Date'],
    ['swift', 'Date']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Context',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'foam.lang.X'],
    ['swift', 'Context']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Number',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'float'],
    ['swift', 'Float']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Float',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'float'],
    ['swift', 'Float']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'List',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'java.util.List'],
    ['swift', '[Any?]']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Map',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'java.util.Map'],
    ['swift', '[AnyHashable:Any?]']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Class',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'foam.lang.ClassInfo'],
    ['swift', 'ClassInfo']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Double',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'double'],
    ['swift', 'Double']
  ]
});


foam.CLASS({
  package: 'foam.lang.type',
  name: 'Regex',
  extends: 'foam.lang.type.SimpleType',
  axioms: [ { class: 'foam.pattern.Singleton' } ],
  properties: [
    ['java', 'java.util.regex.Pattern'],
    ['swift', 'String']
  ]
});
