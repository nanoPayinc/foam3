/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.core.ruler.predicate',
  name: 'PropertyIsClass',

  documentation: 'Returns true if property propName is classOf of',

  properties: [
    {
      class: 'String',
      name: 'propName'
    },
    {
      class: 'Class',
      name: 'of',
      documentation: 'class that we want the object to be a class of'
    },
    {
      class: 'Boolean',
      name: 'isNew',
      value: true
    }
  ],

  ruleF: `
    if ( getIsNew() ) {
      Object value = n.getProperty(getPropName());
      return value != null && value.getClass() == getOf().getObjClass();
    }
    if ( o != null ) {
      Object value = o.getProperty(getPropName());
      return value != null && value.getClass() == getOf().getObjClass();
    }
    return false;
  `
});
