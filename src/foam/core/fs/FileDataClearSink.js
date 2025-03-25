/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.fs',
  name: 'FileDataClearSink',
  extends: 'foam.dao.ProxySink',

  documentation: `Strip File 'data' to support File table views`,

  javaImports: [
    'foam.lang.FObject'
  ],

  methods: [
    {
      name: 'put',
      args: [
        {
          name: 'obj',
          type: 'Object'
        },
        {
          name: 'sub',
          type: 'foam.lang.Detachable'
        }
      ],
      javaCode: `
      File file = (File) ((FObject) obj).fclone();
      File.DATA.clear(file);
      File.DATA_STRING.clear(file);
      getDelegate().put(file, sub);
      `
    },
    {
      name: 'remove',
      javaCode: `//nop`
    },
    {
      name: 'eof',
      javaCode: `// nop`
    },
    {
      name: 'reset',
      javaCode: `//nop`
    }
  ]
});
