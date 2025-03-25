/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.ruler.predicate.test',
  name: 'FScriptRulePredicateTest',
  extends: 'foam.core.test.Test',

  javaImports: [
    'foam.lang.X',
    'foam.core.crunch.UserCapabilityJunction',
    'foam.core.crunch.CapabilityJunctionStatus',
    'foam.core.ruler.predicate.FScriptRulePredicate'
  ],

  methods: [
    {
      name: 'runTest',
      javaCode: `
      var p = new FScriptRulePredicate();
      var q = "";
      var y = x;

      var targetId = "foam.core.ruler.Target";
      var o = new UserCapabilityJunction();
      o.setSourceId(100L);
      o.setTargetId("foam.core.ruler.Target");
      o.setStatus(CapabilityJunctionStatus.PENDING);
      var n = new UserCapabilityJunction();
      n.setSourceId(100L);
      n.setTargetId(targetId);
      n.setStatus(CapabilityJunctionStatus.GRANTED);

      y = x.put("OLD", o);
      y = y.put("NEW", n);
      q = "o exists && n exists";
      p.setQuery(q);
      test(p.f(y), q);

      y = x.put("NEW", n);
      q = "o !exists && n exists";
      p.setQuery(q);
      test(p.f(y), q);

      y = x.put("NEW", n);
      q = "o !exists && n exists && n.status == foam.core.crunch.CapabilityJunctionStatus.GRANTED";
      p.setQuery(q);
      test(p.f(y), q);

      y = x.put("NEW", n);
      q = "o !exists && n exists && n.targetId == \\"foam.core.ruler.Target\\" && n.status == foam.core.crunch.CapabilityJunctionStatus.GRANTED";
      p.setQuery(q);
      test(p.f(y), q);
      `
    }
  ]
})
