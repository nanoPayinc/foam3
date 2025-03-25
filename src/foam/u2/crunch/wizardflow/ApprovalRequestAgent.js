/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.crunch.wizardflow',
  name: 'ApprovalRequestAgent',
  implements: [
    'foam.lang.ContextAgent'
  ],

  imports: [
    'approvableDAO',
    'approvalRequestDAO',
    'capabilities',
    'crunchService',
    'rootCapability',
    'subject',
    'submitted',
    'wizardSubject'
  ],

  requires: [
    'foam.core.approval.ApprovalRequest',
    'foam.core.approval.CompositeApprovable',
    'foam.core.crunch.UCJUpdateApprovable',
    'foam.core.dao.Operation'
  ],

  properties: [
    {
      class: 'String',
      name: 'group'
    }
  ],

  methods: [
    async function execute() {
      var id = foam.uuid.randomGUID();

      await this.crunchService.createApprovalRequest(
        null,
        this.rootCapability.id
      );
    }
  ]
});
