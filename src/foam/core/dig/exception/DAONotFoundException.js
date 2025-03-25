/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 */

foam.CLASS({
  package: 'foam.core.dig.exception',
  name: 'DAONotFoundException',
  extends: 'foam.core.dig.exception.DigErrorMessage',
  javaGenerateDefaultConstructor: false,

  javaCode: `
    public DAONotFoundException() { }

    public DAONotFoundException(String daoName) {
      super(daoName);
    }

    public DAONotFoundException(String daoName, Throwable cause) {
      super(daoName, cause);
    }
  `,

  properties: [
    {
      name: 'exceptionMessage',
      class: 'String',
      value: 'DAO not found {{message}}',
    },
    {
      class: 'String',
      name: 'status',
      value: '404'
    },
    {
      class: 'String',
      name: 'errorCode',
      value: '1000'
    }
  ]
});
