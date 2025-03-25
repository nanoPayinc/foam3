/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.export',
  name: 'GoogleSheetsOutputter',
  extends: 'foam.core.column.TableColumnOutputter',
  requires: [
    'foam.core.column.ColumnConfigToPropertyConverter',
    'foam.core.export.GoogleSheetsPropertyMetadata',
  ],
  methods: [
    {
      name: 'getColumnMetadata',
      type: 'foam.core.export.GoogleSheetsPropertyMetadata[]',
      code: async function(x, cls, propNames) {
        var metadata = [];
        var props = [];
        if ( ! propNames ) {
          props = cls.getAxiomsByClass(foam.lang.Property);
          propNames = props.map(p => p.name);
        } else {
          var columnConfig = x.columnConfigToPropertyConverter;
          for ( var i = 0 ; i < propNames.length ; i++ ) {
            props.push(await columnConfig.returnProperty(cls, propNames[i]));
          }
        }
        
        for ( var i = 0 ; i < props.length ; i++ ) {
          if ( props[i].cls_.id === "foam.lang.Action" )
            continue;
          
          metadata.push(this.returnMetadataForProperty(x, cls, props[i], propNames[i]));
        }
        return metadata;
      }
    },
    {
      name: 'outputStringForProperties',
      type: 'StringArray',
      code: async function(x, cls, obj, columnMetadata, lengthOfPrimaryPropsRequested) {
        var values = [];
        var columnConfig = x.columnConfigToPropertyConverter;

        var props = columnConfig.returnProperties(cls, columnMetadata.map(m => m.propName));
        values.push(await this.arrayOfValuesToArrayOfStrings(x, obj, props, lengthOfPrimaryPropsRequested));
        return values;
      }
    },
    {
      name: 'returnMetadataForProperty',
      code: function(x, of, prop, propName) {
        var columnConfig = x.columnConfigToPropertyConverter;
          //to constants?
          var cellType = '';
          var pattern = '';
          var unitProp;
          if ( foam.lang.UnitValue.isInstance(prop) ) {
            cellType = 'CURRENCY';
            pattern = '\"$\"#0.00\" CAD\"';
            if ( prop.unitPropName )
              unitProp = of.getAxiomByName(prop.unitPropName).name;
          } else if ( foam.lang.Date.isInstance(prop) ) {
            cellType = 'DATE';
            pattern = 'yyyy-mm-dd';
          } else if ( foam.lang.DateTime.isInstance(prop) ) {
            cellType = 'DATE_TIME';
            pattern = 'ddd mmm d yyyy hh/mm/ss';
          } else if ( foam.lang.Time.isInstance(prop) ) {
            cellType = 'TIME';
            pattern = 'hh/mm/ss';
          }  else if ( foam.lang.Enum.isInstance(prop) || foam.lang.AbstractEnum.isInstance(prop) ) {
            cellType = "ENUM";
          } else if ( foam.lang.Int.isInstance(prop) || foam.lang.Float.isInstance(prop) || foam.lang.Long.isInstance(prop) || foam.lang.Double.isInstance(prop) ) {
            cellType = 'NUMBER';
          }  else if ( foam.lang.Boolean.isInstance(prop) ) {
            cellType = 'BOOLEAN';
          } else if ( foam.lang.String.isInstance(prop) ) {
            cellType = 'STRING';
          } else if ( foam.lang.StringArray.isInstance(prop) || foam.lang.Array.isInstance(prop) ) {
            cellType = 'ARRAY';
          } 

          return this.GoogleSheetsPropertyMetadata.create({
            columnName: prop.name,
            columnLabel: columnConfig.returnColumnHeader(of, propName).colPath.join('/'),
            columnWidth: prop.tableWidth ? prop.tableWidth : 0,
            cellType: cellType,
            pattern: pattern,
            propName: propName,
            prop: prop,
            unitPropName: unitProp
          });
      }
    },
    {
      name: 'setUnitValueMetadata',
      code: function(metadata, propNames, stringArray) {
        for ( var i = 0; i < metadata.length; i++ ) {
          if ( foam.lang.UnitValue.isInstance(metadata[i].prop) ) {
            var indexOfUnitProp = propNames.indexOf(metadata[i].unitPropName);
            metadata[i].perValuePattercSpecificValues = stringArray.slice(1).map(a => a[indexOfUnitProp]);
          }
        }
      }
    },
    {
      name: 'setUnitValueMetadataForObj',
      code: function(metadata, obj) {
        for ( var i = 0; i < metadata.length; i++ ) {
          if ( foam.lang.UnitValue.isInstance(metadata[i].prop) ) {
            metadata[i].perValuePattercSpecificValues = [ obj[metadata[i].unitPropName].toString() ];
          }
        }
      }
    }
  ]
});