/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 */

foam.CLASS({
  package: 'foam.core.dig.exception',
  name: 'DAOPutException',
  extends: 'foam.core.dig.exception.DigErrorMessage',

  javaCode: `
    public DAOPutException(String message) {
      super(message);
    }

    public DAOPutException(String message, Throwable cause) {
      super(message, cause);
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
      value: '1001'
    }
  ]
});
