/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.jetty',
  name: 'IPAccessSink',
  extends: 'foam.dao.AbstractSink',
  implements: ['foam.lang.ContextAware'],
  flags: ['java'],

  documentation: `Manage Jettys IPAccess list`,

  javaImports: [
    'foam.lang.FObject',
    'foam.lang.X',
    'foam.core.logger.Loggers',
    'org.eclipse.jetty.server.handler.InetAccessHandler'
  ],

  properties: [
    {
      name: 'ipAccessHandler',
      class: 'Object',
      visibility: 'HIDDEN',
      transient: true
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'dao'
    }
  ],

  methods: [
    {
      name: 'put',
      args: 'Object obj, foam.lang.Detachable sub',
      javaCode: `
      // sub.detach();
      clear();
      `
    },
    {
      name: 'remove',
      args: 'Object obj, foam.lang.Detachable sub',
      javaCode: `
      // sub.detach();
      clear();
      `
    },
    {
      documentation: 'Jettys InetAccessHandler does not support remove, so have to clear and re-add',
      name: 'clear',
      javaCode: `
      Loggers.logger(getX(), this).info("clear");
      ((InetAccessHandler)getIpAccessHandler()).clear();
      getDao().select(new IPAccessAddSink(getIpAccessHandler()));
      `
    }
  ]
})
