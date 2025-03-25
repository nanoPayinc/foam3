/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.ruler',
  name: 'RuleActionMergeDecorator',

  documentation: `
    Merge calls occurring within mergeDelay period to the delegate rule action.

    Usage: Add RuleActionMergeDecorator to the 'action' of an async rule to
    merge repeated calls to the underlying rule action. For example,

      {
        class: 'foam.core.ruler.Rule',
        ...,
        async: true,
        action: {
          class: 'foam.core.ruler.RuleActionMergeDecorator',
          mergeDelay: 1000,
          delegate: {
            class: 'MyRuleAction'
          }
        }
      }
  `,

  implements: [ 'foam.core.ruler.RuleAction' ],

  javaImports: [
    'foam.lang.ContextAgent',
    'foam.lang.X',
    'foam.core.ruler.Rule'
  ],

  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.core.ruler.RuleAction',
      name: 'delegate'
    },
    {
      class: 'Int',
      name:  'mergeDelay',
      units: 'ms'
    },
    {
      class: 'String',
      name: 'keyProp',
      value: 'id'
    }
  ],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        if ( ! rule.getAsync() ) {
          getDelegate().applyAction(x, obj, oldObj, ruler, rule, agency);
          return;
        }

        var key = rule.getId() + ":" + obj.getProperty(getKeyProp());
        agency.schedule(x, new ContextAgent() {
          @Override
          public void execute(X x) {
            // Re-enter rule.asyncApply() to support retry
            var clone = (Rule) rule.fclone();
            clone.setAction(getDelegate());
            clone.asyncApply(x, obj, oldObj, ruler, clone);
          }
        }, key, getMergeDelay());
      `
    }
  ]
});

