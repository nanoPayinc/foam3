/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

 foam.CLASS({
  package: 'foam.core.approval',
  name: 'FulfilledApprovableRule',

  documentation: `
    A rule to determine what to do with an approvable once the 
    approval request has been APPROVED
  `,

  javaImports: [
    'foam.lang.ContextAwareAgent',
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.core.auth.User',
    'foam.core.approval.Approvable',
    'foam.core.approval.ApprovableAware',
    'foam.core.approval.ApprovalRequest',
    'foam.core.approval.ApprovalStatus',
    'foam.core.auth.LifecycleState',
    'foam.core.auth.LifecycleAware',
    'foam.core.dao.Operation',
    'foam.core.auth.Subject',
    'java.util.Map'
  ],

  implements: ['foam.core.ruler.RuleAction'],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAwareAgent() {
          
          @Override
          public void execute(X x) {
            Approvable approvable = (Approvable) obj;

            if ( approvable.getBlockFulfillementLogic() ) {
              return;
            }

            DAO dao = (DAO) getX().get(approvable.getServerDaoKey());

            FObject objectToPut;

            if ( approvable.getOperation() == Operation.CREATE ){
              try {
                objectToPut =  (FObject) approvable.getOf().newInstance();
              } catch ( Exception e ){
                throw new RuntimeException(e);
              }
              LifecycleAware lifecycleAwareObject = (LifecycleAware) objectToPut;
              lifecycleAwareObject.setLifecycleState(LifecycleState.ACTIVE);
            } else if ( approvable.getOperation() == Operation.UPDATE ){
              FObject currentObjInDao = dao.find(approvable.getObjId());
              objectToPut = currentObjInDao.fclone();
            } else {
              throw new RuntimeException("Unsupported approvable operation.");
            }

            Map propsToUpdate = approvable.getPropertiesToUpdate();

            for ( Object propName : propsToUpdate.keySet() ){
              String propNameString = (String) propName;
              objectToPut.setProperty(propNameString,propsToUpdate.get(propNameString));
            }

            User createdBy = (User) ((DAO) x.get("bareUserDAO")).find(approvable.getCreatedBy());

            Subject subject = new Subject.Builder(x).setUser(createdBy).build();
            X createdX = x.put("subject", subject);

            dao.inX(createdX).put(objectToPut);
          }
        }, "Updated the object based on a approved approvable");
      `
    }
  ]
});
