/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.export',
  name: 'CSVTableExportDriver',
  extends: 'foam.core.export.TableExportDriver',

  implements: [ 'foam.core.export.ExportDriver' ],

  documentation: 'The driver to export data retrieved with projection to CSV',

  requires: [
    'foam.core.column.CSVTableOutputter',
    'foam.core.column.TableColumnOutputter'
  ],

  properties: [
    {
      class: 'Boolean',
      name: 'sheetsCompatibleDates',
      value: true
    },
    {
      class: 'Boolean',
      name: 'addUnits',
      value: true
    },
    {
      name: 'outputter',
      hidden: true,
      expression: function(sheetsCompatibleDates, addUnits) {
        return this.CSVTableOutputter.create({
          sheetsCompatibleDates: sheetsCompatibleDates,
          addUnits:              addUnits
        });
      }
    },
    {
      name: 'columnHandler',
      hidden: true,
      class: 'FObjectProperty',
      of: 'foam.core.column.CommonColumnHandler',
      factory: function() {
        return foam.core.column.CommonColumnHandler.create();
      }
    },
    {
      name: 'columnConfigToPropertyConverter',
      hidden: true,
      factory: function() {
        if ( ! this.__context__.columnConfigToPropertyConverter )
          return foam.core.column.ColumnConfigToPropertyConverter.create();
        return this.__context__.columnConfigToPropertyConverter;
      }
    }
  ],

  methods: [
    async function exportFObject(X, obj) {
      var propNames  = this.getPropName(X, obj.cls_);
      var objToTable = await this.exportFObjectAndReturnTable(X, obj, propNames);
      return this.outputter.arrayToCSV(objToTable);
    },

    async function exportDAO(X, dao) {
      var propName   = this.getPropName(X, dao.of);
      var daoToTable = await this.exportDAOAndReturnTable(X, dao, propName);
      return this.outputter.arrayToCSV(daoToTable);
    }
  ]
});
