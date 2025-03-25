/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RULE_PREDICATE({
  package: 'foam.core.ruler.predicate',
  name: 'ApprovalReputPredicate',

  documentation: 'Returns true if it is a reput call from ApprovalDAO.',

  javaImports: [
    'foam.core.approval.ApprovalRequest'
  ],

  properties: [
    {
      class: 'String',
      name: 'classification'
    }
  ],

  ruleF: `
    var approvalReq = x.get(ApprovalRequest.class);
    return approvalReq != null
      && approvalReq.getClassification().equals(getClassification());
  `
});
