/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.core.ruler.predicate',
  name: 'PropertyEQProperty',

  documentation: `A predicate that returns true when a specific property equals the value of another specified property.
  The developer must provide the property names as a string for prop1 and prop2.
  The developer can choose on which object this predicate is evaluated. either old or new object.

  Example of usage: When a pizza object passes through the rule engine, we can check if topping1 property is equal to topping2 property.
  when true, we can charge for the topping at a discounted double topping rate`,

  properties: [
    {
      class: 'String',
      name: 'prop1'
    },
    {
      class: 'String',
      name: 'prop2'
    }
  ],

  ruleF: `
    return SafetyUtil.equals(n.getProperty(getProp1()), n.getProperty(getProp2()));
  `
});
