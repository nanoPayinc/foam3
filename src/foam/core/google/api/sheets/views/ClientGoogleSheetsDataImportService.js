/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

 foam.CLASS({
  package: 'foam.core.google.api.sheets.views',
  name: 'ClientGoogleSheetsDataImportService',
  implements: [
    'foam.core.google.api.sheets.views.GoogleSheetsDataImportService'
  ],

  properties: [
    {
      class: 'Stub',
      of: 'foam.core.google.api.sheets.views.GoogleSheetsDataImportService',
      name: 'delegate'
    }
  ]
});
