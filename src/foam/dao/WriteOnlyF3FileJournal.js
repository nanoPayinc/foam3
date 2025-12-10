/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'WriteOnlyF3FileJournal',
  extends: 'foam.dao.F3FileJournal',

  documenation: 'A journal which does nothing on replay.',

  methods: [
    {
      name: 'replay',
      javaCode: `
        return;
      `
    }
  ]
});
