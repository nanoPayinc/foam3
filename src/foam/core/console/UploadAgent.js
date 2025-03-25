/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'UploadAgent',

  implements: [ 'foam.lang.ContextAgent' ],

  javaImports: [ 'foam.dao.DAO' ],

  properties: [
    {
      class: 'FObjectArray',
      of: 'foam.lang.FObject',
      name: 'data'
    },
    {
      class: 'Int',
      name: 'processed'
    }
  ],

  methods: [
    {
      name: 'execute',
//      type: 'Void',
//      args: 'Context x',
      javaCode: `
        DAO dao = ((DAO) x.get("AGENTDAO"));
        foam.lang.FObject[] data = getData();
        for ( int i = 0 ; i < data.length ; i++ ) {
          var d = data[i];
          dao.put(d);
        }
        // Empty data to avoid sending back to client
        setData(null);
        setProcessed(data.length);
      `
    }
  ]
});
