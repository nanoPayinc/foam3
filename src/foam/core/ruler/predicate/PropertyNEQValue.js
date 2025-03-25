/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.core.ruler.predicate',
  name: 'PropertyNEQValue',

  documentation: `A predicate that returns false when a specific property equals the provided value.
   Both the property name and the desired value must be provided. user can choose the new or old object for evaluation.

   An example of usage: When a pizza object is updated, and the status property is equal to pizzaStatus.COOKED evaluate false.`,

  properties: [
    {
      class: 'String',
      name: 'propName'
    },
    {
      class: 'Object',
      name: 'propValue'
    },
    {
      class: 'Boolean',
      name: 'isNew',
      value: true
    }
  ],

  ruleF: `
    if ( getIsNew() )
      return ! SafetyUtil.equals(n.getProperty(getPropName()), getPropValue());

    return ( o != null ) &&
      ! SafetyUtil.equals(o.getProperty(getPropName()), getPropValue());
  `
});
