/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.ndiff',
  name: 'NDiffJournal',
  extends: 'foam.dao.ProxyJournal',
  javaImports: [
    'foam.core.logger.Loggers',
    'foam.core.logger.Logger',
    'foam.core.ndiff.NDiff',
    'foam.core.ndiff.NDiffDAO',
    'foam.dao.DAO',
    'foam.dao.AbstractF3FileJournal',
    'foam.util.SafetyUtil',
  ],
  properties: [
    {
      name: 'cSpecName',
      class: 'String',
      documentation: `
        The name of the originating CSpec.
        `,
    },
    {
      name: 'runtimeOrigin',
      class: 'Boolean',
      documentation: `
        If true, this entry was fed in at runtime, rather
        than from one of the repo journals.
        `,
    },
  ],
  methods: [
    {
      name: 'replay',
      javaCode: `
        Logger logger = Loggers.logger(x, this); 

        // need information about the target journal first.
        // if we have no idea where this is replaying,
        // then don't bother sending to NDiffDAO
        if ( SafetyUtil.isEmpty(getCSpecName()) ) {
          logger.warning("cSpecName is not set!!");
          getDelegate().replay(x, dao); 
          return;
        }

        String cSpecName = getCSpecName();
        boolean runtimeOrigin = getRuntimeOrigin();

        logger.debug("Replaying to NDiffDAO",
                    cSpecName,
                    "runtimeOrigin",
                    runtimeOrigin);
        getDelegate().replay(x, new NDiffDAO.Builder(getX())
                                            .setDelegate(dao)
                                            .setCSpecName(cSpecName)
                                            .setRuntimeOrigin(runtimeOrigin)
                                            .build()
        );
        logger.debug("Replaying to NDiffDAO",
                    cSpecName,
                    "runtimeOrigin",
                    runtimeOrigin,
                    "Done");
        `,
    },
  ],
});
