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
  name: 'AllSerializableProperties',
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
    // {
    //   class: 'foam.lang.Function',
    //   name: 'functionProp'
    // },
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
    // {
    //   class: 'foam.lang.List',
    //   name: 'listProp'
    // },
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
    {
      class: 'foam.lang.Blob',
      name: 'blobProp'
    },
  ],
  static: [
    function createPopulated() {
      return foam.test.AllSerializableProperties.create({
        intProp: 12,
        stringProp: "asdf",
        fObjectArrayProp: [foam.test.TestObj.create({ description: 'An object in an array!' }),
                           foam.test.TestObj.create({ description: 'Another object in an array!' })],
        objectProp: [1, 'foo', new Date(), foam.test.AllSerializableProperties, [3, 4]],
//        function: null,
        stringArrayProp: ['Hello', 'World'],
        classProp: foam.test.AllSerializableProperties,
        fObjectPropertyProp: foam.test.TestObj.create({ description: 'some object' }),
        emailProp: 'test@example.com',
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
