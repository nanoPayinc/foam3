/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

 foam.CLASS({
  package: 'foam.core.approval',
  name: 'ApprovalRequestMemoRule',

  documentation: `
    A rule to determine what to update memo for all other
    outstanding approval requests.
  `,

  javaImports: [
    'foam.lang.ContextAwareAgent',
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.core.approval.ApprovalRequest',
    'foam.dao.ArraySink',
    'java.util.List'
  ],

  implements: ['foam.core.ruler.RuleAction'],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAwareAgent() {

          @Override
          public void execute(X x) {
            ApprovalRequest request = (ApprovalRequest) obj;
            DAO requests = ApprovalRequestUtil.getAllRequests(getX(), request.getObjId(), request.getClassification());

            DAO approvalRequestDAO = (DAO) getX().get("approvalRequestDAO");

            List<ApprovalRequest> requestsToUpdate = ((ArraySink) requests
            .where(
              foam.mlang.MLang.NEQ(ApprovalRequest.MEMO, request.getMemo())
            ).select(new ArraySink())).getArray();

            for ( ApprovalRequest requestToUpdate : requestsToUpdate ){
              requestToUpdate.setMemo(request.getMemo());
              approvalRequestDAO.put(requestToUpdate);
            }
          }
        }, "Updated the memo for all other requests");
      `
    }
  ]
});
