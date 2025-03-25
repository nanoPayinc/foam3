/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.theme',
  name: 'ThemeService',

  client: true,
  skeleton: true,
  proxy: true,

  javaImports: [
    'foam.lang.X'
  ],

  methods: [
    {
      name: 'findTheme',
      type: 'foam.core.theme.Theme',
      async: true,
      args: 'Context x'
    }
  ]
});
