/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.example',
  name: 'ExampleData',

  requires: [
    'foam.core.auth.Phone'
  ],
  
  properties: [
    {
      name: 'testValidatedValue',
      class: 'FObjectProperty',
      required: true,
      of: 'foam.lang.RequiredBooleanHolder'
    }
  ]

});
