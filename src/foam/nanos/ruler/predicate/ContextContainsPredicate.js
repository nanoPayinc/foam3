/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.nanos.ruler.predicate',
  name: 'ContextContainsPredicate',

  documentation: 'Returns true if the key is found in the context',

  properties: [
    {
      class: 'String',
      name: 'key',
      documentation: 'The Key that we want to check is contained in the context'
    }
  ],

  ruleF: 'return x.get(getKey()) != null;'
});
