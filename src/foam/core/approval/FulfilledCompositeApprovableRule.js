/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

 foam.CLASS({
  package: 'foam.core.approval',
  name: 'FulfilledCompositeApprovableRule',

  documentation: `
    A rule which will cascade the CompositeApprovable's status to
    it's sub approvables
  `,

  javaImports: [
    'foam.lang.ContextAwareAgent',
    'foam.lang.Detachable',
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.dao.AbstractSink',
    'foam.dao.DAO',
    'foam.core.approval.Approvable',
    'foam.core.approval.CompositeApprovable',
    'foam.mlang.MLang',
    'java.util.ArrayList'
  ],

  implements: ['foam.core.ruler.RuleAction'],

  methods: [
    {
      name: 'applyAction',
      javaCode: `
        agency.submit(x, new ContextAwareAgent() {

          @Override
          public void execute(X x) {
            CompositeApprovable compositeApprovable = (CompositeApprovable) obj;
            DAO approvableDAO = (DAO) getX().get("approvableDAO");

            approvableDAO.where(
              MLang.IN(
                  Approvable.ID,
                  compositeApprovable.getApprovableIds()
              )
            ).select(new AbstractSink() {
              @Override
              public void put(Object obj, Detachable sub) {
                Approvable approvable = (Approvable) ((FObject) obj).fclone();
                approvable.setStatus(compositeApprovable.getStatus());
                approvableDAO.put_(x, approvable);
              }
            });
          }
        }, "Cascaded CompositeApprovable status to sub approvables");
      `
    }
  ]
});
