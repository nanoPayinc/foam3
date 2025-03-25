/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'RemoveSink',
  extends: 'foam.dao.AbstractSink',
  flags: ['js', 'java'],

  implements: [
    'foam.lang.ContextAware'
  ],

  javaImports: [
    'foam.lang.FObject',
    'foam.lang.X'
  ],

  properties: [
    {
      class: 'foam.dao.DAOProperty',
      name: 'dao'
    }
  ],

  methods: [
    {
      name: 'put',
      args: [
        {
          type: 'Object',
          name: 'obj'
        },
        {
          type: 'foam.lang.Detachable',
          name: 'sub'
        }
      ],
      code: function (obj, sub) {
        this.dao.remove_(this.__context__, obj)
      },
      javaCode: `
        getDao().remove_(getX(), (FObject) obj);
      `
    }
  ]
});