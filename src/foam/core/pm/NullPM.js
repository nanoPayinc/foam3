/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.pm',
  name: 'NullPM',
  extends: 'foam.core.pm.PM',

  documentation: 'A PM that does not log.',

  javaImports: [
    'foam.lang.X'
  ],

  methods: [
    {
      name: 'init_',
      javaCode: ``
    },
    {
      name: 'log',
      type: 'Void',
      args: [
        {
          name: 'x',
          type: 'X'
        }
      ],
      javaCode: '/*nop*/'
    }
  ]
});
