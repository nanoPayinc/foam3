/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.nanos.ruler.predicate',
  name: 'PropertyIsSetPredicate',

  documentation: 'A predicate that returns true when a specific property is set.',

  properties: [
    {
      class: 'String',
      name: 'propName'
    },
    {
      class: 'Boolean',
      name: 'isNew',
      value: true,
      documentation: 'If true (default) test new object, otherwise test old object.'
    }
  ],

  ruleF: 'return getIsNew() ? n.isPropertySet(getPropName()) : o.isPropertySet(getPropName());'
});
