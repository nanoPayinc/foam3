/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.ruler',
  name: 'StopRulerAction',

  implements: ['foam.core.ruler.RuleAction'],

  documentation: 'Stop ruler (i.e, RuleEngine) from executing subsequent rules in the same group.',

  methods: [
    {
      name: 'applyAction',
      javaCode: 'ruler.stop();'
    }
  ]
});
