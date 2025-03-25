/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  name: 'DuplicateEmailException',
  package: 'foam.core.auth',
  extends: 'foam.lang.ValidationException',
  javaGenerateDefaultConstructor: false,
  javaGenerateConvenienceConstructor: false,

  properties: [
    {
      name: 'exceptionMessage',
      value: 'Email already in use'
    }
  ],

  javaCode: `
    public DuplicateEmailException() {
      super();
    }

    public DuplicateEmailException(String message) {
      super(message);
    }

    public DuplicateEmailException(Throwable cause) {
      super(cause);
    }

    public DuplicateEmailException(String message, Throwable cause) {
      super(message, cause);
    }
  `
});
