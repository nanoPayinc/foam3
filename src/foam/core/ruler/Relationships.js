/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RELATIONSHIP({
  sourceModel: 'foam.core.ruler.RuleGroup',
  targetModel: 'foam.core.ruler.Rule',
  forwardName: 'rules',
  inverseName: 'ruleGroup',
  cardinality: '1:*'
});
