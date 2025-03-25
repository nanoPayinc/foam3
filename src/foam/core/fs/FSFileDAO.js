/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.fs',
  name: 'FSFileDAO',
  extends: 'foam.dao.ProxyDAO',
  flags: ['java'],

  documentation: `
    A DAO for recursively looking up all the files under its root directory on select.
    For each file found, a FSFile is created with its file name, absolute path, parent directory
    and stored by the DAO.
    FSFile has a reference to FSFileContent. See FSFileContentDAO for file content lookup.
    Unlike FileDAO, which is meant for storing Files from clients, this type of DAO is intended to
    make existing server file access possible from the client.
  `,

  javaImports: [
    'foam.core.fs.AbstractStorage',
    'foam.dao.Sink',
    'foam.lang.X',
    'java.io.File',
    'org.apache.commons.io.FilenameUtils'
  ],

  properties: [
    {
      class: 'String',
      name: 'root',
      value: "./pub",
      javaSetter: `
        assertNotFrozen();
        if ( val.contains("../") || val.contains("..\\\\") ) {
          return;
        }
        root_ = val;
        rootIsSet_ = true;
      `
    },
    {
      class: 'Boolean',
      name: 'initialized',
    }
  ],

  methods: [
    {
      name: 'select_',
      javaCode: `
        if ( ! getInitialized() ) {
          File dir = new File(getRoot());
          listFiles(x, dir, sink);
          setInitialized(true);
          return sink;
        }
        return getDelegate().select_(x, sink, skip, limit, order, predicate);
      `
    },
    {
      name: 'listFiles',
      args: 'X x, File dir, Sink sink',
      javaCode: `
        File[] files = dir.listFiles();
        FSFile current;
        for (File file : files) {
          current = save(x, file, dir);
          sink.put(current, null);
          if (file.isDirectory()) {
            listFiles(x, file, sink);
          }
        }

      `
    },
    {
      name: 'save',
      args: 'X x, File file, File dir',
      javaType: 'FSFile',
      javaCode: `
        FSFile fsFile = new FSFile.Builder(x)
          .setId(file.getPath())
          .setDir(dir.getName())
          .setPath(file.getName())
          .setIsDirectory(file.isDirectory())
          .setExtension(FilenameUtils.getExtension(file.getPath()))
          .build();
        return (FSFile) getDelegate().put_(x, fsFile);
      `
    },
    {
      name: 'put_',
      javaCode: `
        throw new UnsupportedOperationException();
      `
    },
    {
      name: 'remove_',
      javaCode: `
        throw new UnsupportedOperationException();
      `
    },
    {
      name: 'removeAll_',
      javaCode: `
        throw new UnsupportedOperationException();
      `
    },
    {
      name: 'cmd_',
      javaCode: `
        throw new UnsupportedOperationException();
      `
    }
  ]
});
