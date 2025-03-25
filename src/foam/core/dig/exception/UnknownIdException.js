/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 */

foam.CLASS({
  package: 'foam.core.dig.exception',
  name: 'UnknownIdException',
  extends: 'foam.core.dig.exception.DigErrorMessage',
  javaGenerateDefaultConstructor: false,

  javaCode: `
    public UnknownIdException() {
      super();
    }

    public UnknownIdException(String message) {
      super(message);
    }
  `,

  properties: [
    {
      class: 'String',
      name: 'status',
      value: '400'
    },
    {
      class: 'String',
      name: 'errorCode',
      value: '1005'
    }
  ]
});
