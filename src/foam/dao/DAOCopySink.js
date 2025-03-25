/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'DAOCopySink',
  extends: 'foam.dao.AbstractSink',

  documentation: 'Puts all objects in the sink into a different DAO',

  javaImports: [
    'foam.dao.DAO',
    'foam.lang.ClassInfo'
  ],

  properties: [
    {
      class: 'Class',
      name: 'of'
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'outputDAO'
    },
    {
      class: 'Boolean',
      name: 'cloneOnPut',
      value: true
    },
    {
      class: 'Long',
      name: 'count'
    }
  ],

  javaCode: `
  public DAOCopySink(ClassInfo of, DAO delegate) {
    setOf(of);
    setOutputDAO(delegate);
  }
  public DAOCopySink(ClassInfo of, DAO delegate, boolean cloneOnPut) {
    setOf(of);
    setOutputDAO(delegate);
    setCloneOnPut(cloneOnPut);
  }
  `,

  methods: [
    {
      name: 'put',
      code: function put(o, sub) {
        this.outputDAO.put(this.cloneOnPut ? o.clone() : o);
      },
      javaCode: `
      var fobj = (foam.lang.FObject) obj;
      getOutputDAO().put(getCloneOnPut() ? fobj.fclone() : fobj);
      setCount(getCount()+1);
      `
    }
  ]
});
