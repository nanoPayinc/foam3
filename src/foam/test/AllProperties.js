/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

foam.CLASS({
  package: 'foam.test',
  name: 'AllProperties',
  properties: [
    {
      class: 'foam.lang.Int',
      name: 'intProp'
    },
    {
      class: 'foam.lang.String',
      name: 'stringProp'
    },
    {
      class: 'foam.lang.FObjectArray',
      of: 'foam.test.TestObj',
      name: 'fObjectArrayProp'
    },
    {
      class: 'foam.lang.Object',
      name: 'objectProp'
    },
    {
      class: 'foam.lang.Function',
      name: 'functionProp'
    },
    {
      class: 'foam.lang.StringArray',
      name: 'stringArray'
    },
    {
      class: 'foam.lang.Class',
      name: 'classProp'
    },
    {
      class: 'foam.lang.FObjectProperty',
      of: 'foam.test.TestObj',
      name: 'fObjectPropertyProp'
    },
    {
      class: 'foam.lang.EMail',
      name: 'emailProp'
    },
    {
      class: 'foam.u2.ViewSpec',
      name: 'viewSpecProp'
    },
    {
      class: 'foam.lang.Enum',
      of: 'foam.test.TestEnum',
      name: 'enumProp'
    },
    {
      class: 'foam.lang.Date',
      name: 'dateProp'
    },
    {
      class: 'foam.lang.DateTime',
      name: 'dateTimeProp'
    },
    {
      class: 'foam.lang.Float',
      name: 'floatProp'
    },
    {
      class: 'foam.lang.Long',
      name: 'longProp'
    },
    {
      class: 'foam.lang.UnitValue',
      name: 'currencyProp'
    },
    {
      class: 'foam.lang.Color',
      name: 'colorProp'
    },
    // {
    //   class: 'foam.lang.Reference',
    //   name: 'reference'
    // },
    {
      class: 'foam.lang.Array',
      name: 'arrayProp'
    },
    {
      class: 'foam.lang.Map',
      name: 'mapProp'
    },
    {
      class: 'foam.u2.view.TableCellFormatter',
      name: 'tableCellFormatterProp'
    },
    {
      class: 'foam.lang.Byte',
      name: 'byteProp'
    },
    {
      class: 'foam.lang.Short',
      name: 'shortProp'
    },
    {
      class: 'foam.lang.Double',
      name: 'doubleProp'
    },
    {
      class: 'foam.lang.List',
      name: 'listProp'
    },
    {
      class: 'foam.lang.Image',
      name: 'imageProp'
    },
    {
      class: 'foam.lang.URL',
      name: 'urlProp'
    },
    {
      class: 'foam.lang.Password',
      name: 'passwordProp'
    },
    {
      class: 'foam.lang.PhoneNumber',
      name: 'phoneNumberProp'
    },
    // {
    //   class: 'foam.lang.MultiPartID',
    //   name: 'multiPartID'
    // },
    {
      class: 'foam.parse.ParserArray',
      name: 'parserArrayProp'
    },
    {
      class: 'foam.parse.ParserProperty',
      name: 'parserPropertyProp'
    },
    {
      class: 'foam.mlang.ExprProperty',
      name: 'exprPropertyProp'
    },
    {
      class: 'foam.mlang.SinkProperty',
      name: 'sinkPropertyProp'
    },
    {
      class: 'foam.mlang.predicate.PredicateProperty',
      name: 'predicatePropertyProp'
    },
    {
      class: 'foam.mlang.predicate.PredicateArray',
      name: 'predicateArrayProp'
    },
    // {
    //   class: 'foam.dao.RelationshipProperty',
    //   name: 'relationshipProperty'
    // },
    {
      class: 'foam.lang.Blob',
      name: 'blobProp'
    },
    // {
    //   class: 'foam.lang.Stub',
    //   name: 'stub'
    // },
    {
      class: 'foam.u2.ViewFactory',
      name: 'viewFactoryProp'
    },
    {
      class: 'foam.lang.Int',
      transient: true,
      name: 'transientInt'
    },
    {
      class: 'foam.lang.String',
      transient: true,
      name: 'transientString'
    },
    {
      class: 'foam.lang.FObjectArray',
      of: 'foam.test.TestObj',
      transient: true,
      name: 'transientFObjectArray'
    },
    {
      class: 'foam.lang.Object',
      transient: true,
      name: 'transientObject'
    },
    {
      class: 'foam.lang.Function',
      transient: true,
      name: 'transientFunction'
    },
    {
      class: 'foam.lang.StringArray',
      transient: true,
      name: 'transientStringArray'
    },
    {
      class: 'foam.lang.Class',
      transient: true,
      name: 'transientClass'
    },
    {
      class: 'foam.lang.FObjectProperty',
      of: 'foam.test.TestObj',
      transient: true,
      name: 'transientFObjectProperty',
    },
    {
      class: 'foam.lang.EMail',
      transient: true,
      name: 'transientEMail'
    },
    {
      class: 'foam.u2.ViewSpec',
      transient: true,
      name: 'transientViewSpec'
    },
    {
      class: 'foam.lang.Enum',
      transient: true,
      of: 'foam.test.TestEnum',
      name: 'transientEnum'
    },
    {
      class: 'foam.lang.Date',
      transient: true,
      name: 'transientDate'
    },
    {
      class: 'foam.lang.DateTime',
      transient: true,
      name: 'transientDateTime'
    },
    {
      class: 'foam.lang.Float',
      transient: true,
      name: 'transientFloat'
    },
    {
      class: 'foam.lang.Long',
      transient: true,
      name: 'transientLong'
    },
    {
      class: 'foam.lang.UnitValue',
      transient: true,
      name: 'transientCurrency'
    },
    {
      class: 'foam.lang.Color',
      transient: true,
      name: 'transientColor'
    },
    // {
    //   class: 'foam.lang.Reference',
    //   transient: true,
    //   name: 'transientReference'
    // },
    {
      class: 'foam.lang.Array',
      transient: true,
      name: 'transientArray'
    },
    {
      class: 'foam.lang.Map',
      transient: true,
      name: 'transientMap'
    },
    {
      class: 'foam.u2.view.TableCellFormatter',
      transient: true,
      name: 'transientTableCellFormatter'
    },
    {
      class: 'foam.lang.Byte',
      transient: true,
      name: 'transientByte'
    },
    {
      class: 'foam.lang.Short',
      transient: true,
      name: 'transientShort'
    },
    {
      class: 'foam.lang.Double',
      transient: true,
      name: 'transientDouble'
    },
    {
      class: 'foam.lang.List',
      transient: true,
      name: 'transientList'
    },
    {
      class: 'foam.lang.Image',
      transient: true,
      name: 'transientImage'
    },
    {
      class: 'foam.lang.URL',
      transient: true,
      name: 'transientURL'
    },
    {
      class: 'foam.lang.Password',
      transient: true,
      name: 'transientPassword'
    },
    {
      class: 'foam.lang.PhoneNumber',
      transient: true,
      name: 'transientPhoneNumber'
    },
    // {
    //   class: 'foam.lang.MultiPartID',
    //   transient: true,
    //   name: 'transientMultiPartID'
    // },
    {
      class: 'foam.parse.ParserArray',
      transient: true,
      name: 'transientParserArray'
    },
    {
      class: 'foam.parse.ParserProperty',
      transient: true,
      name: 'transientParserProperty'
    },
    {
      class: 'foam.mlang.ExprProperty',
      transient: true,
      name: 'transientExprProperty'
    },
    {
      class: 'foam.mlang.SinkProperty',
      transient: true,
      name: 'transientSinkProperty'
    },
    {
      class: 'foam.mlang.predicate.PredicateProperty',
      transient: true,
      name: 'transientPredicateProperty'
    },
    {
      class: 'foam.mlang.predicate.PredicateArray',
      transient: true,
      name: 'transientPredicateArray'
    },
    // {
    //   class: 'foam.dao.RelationshipProperty',
    //   transient: true,
    //   name: 'transientRelationshipProperty'
    // },
    {
      class: 'foam.lang.Blob',
      transient: true,
      name: 'transientBlob'
    },
    {
      class: 'foam.u2.ViewFactory',
      transient: true,
      name: 'transientViewFactory'
    }
  ],
  classes: [
    {
      name: 'InnerClass1',
      properties: [
        {
          class: 'String',
          name: 'name'
        }
      ]
    }
  ],
  static: [
    function createPopulated() {
      return foam.test.AllProperties.create({
        intProp: 12,
        stringProp: "asdf",
        fObjectArrayProp: [foam.test.TestObj.create({ description: 'An object in an array!' }),
                           foam.test.TestObj.create({ description: 'Another object in an array!' })],
        objectProp: [1, 2, 3],
//        function: null,
        stringArrayProp: ['Hello', 'World'],
        classProp: foam.test.AllProperties,
        fObjectPropertyProp: foam.test.TestObj.create({ description: 'some object' }),
        emailProp: 'test@example.com',
//        viewSpec: null
        enumProp: foam.test.TestEnum.BAR,
        dateProp: new Date("1995-12-17T03:24:00"),
        dateTimeProp: new Date("1995-12-18T04:23:44"),
        floatProp: 1.2345,
        longProp: 12341234,
        currencyProp: 342342,
        colorProp: 'rgba(0, 0, 255, 0)',
//        list: null
        imageProp: '/favicon/favicon-32x32.png',
        urlProp: 'https://google.com/',
        passwordProp: 'superSecret111!',
        phoneNumberProp: '555-3455'
      });
    }
  ]
});
