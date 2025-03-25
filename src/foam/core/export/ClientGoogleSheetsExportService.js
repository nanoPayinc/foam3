/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.export',
  name: 'ClientGoogleSheetsExportService',

  implements: [
    'foam.core.export.GoogleSheetsExport'
  ],

  properties: [
    {
      class: 'Stub',
      of: 'foam.core.export.GoogleSheetsExport',
      name: 'delegate'
    }
  ]
});
