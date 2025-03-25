/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  name: 'TokenInvalidException',
  package: 'foam.core.auth.token',
  extends: 'foam.core.auth.AuthenticationException',
  javaGenerateDefaultConstructor: false,
  javaGenerateConvenienceConstructor: false,

  javaCode: `
    public TokenInvalidException() {
      super();
    }

    public TokenInvalidException(String msg) {
      super(msg);
    }

    public TokenInvalidException(Exception cause) {
      super(cause);
    }
  `
});
