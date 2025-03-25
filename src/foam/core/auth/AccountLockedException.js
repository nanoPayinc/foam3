/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  name: 'AccountLockedException',
  package: 'foam.core.auth',
  extends: 'foam.core.auth.AuthenticationException',
  javaGenerateDefaultConstructor: false,
  javaGenerateConvenienceConstructor: false,

  properties: [
    {
      name: 'exceptionMessage',
      value: 'Please contact customer service'
    }
  ],

  javaCode: `
    public AccountLockedException() {
      super();
    }

    public AccountLockedException(Exception cause) {
      super(cause);
    }
  `
});
