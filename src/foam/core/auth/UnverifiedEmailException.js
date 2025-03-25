/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  name: 'UnverifiedEmailException',
  package: 'foam.core.auth',
  extends: 'foam.lang.ValidationException',
  javaGenerateDefaultConstructor: false,
  javaGenerateConvenienceConstructor: false,

  properties: [
    {
      name: 'exceptionMessage',
      value: 'Email not verified.'
    }
  ],

  javaCode: `
    public UnverifiedEmailException() {
      super();
    }

    public UnverifiedEmailException(String message) {
      super(message);
    }

    public UnverifiedEmailException(Throwable cause) {
      super(cause);
    }

    public UnverifiedEmailException(String message, Throwable cause) {
      super(message, cause);
    }
  `
});
