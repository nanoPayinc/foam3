/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  name: 'TokenExpiredException',
  package: 'foam.core.auth.token',
  extends: 'foam.core.auth.AuthenticationException',
  javaGenerateDefaultConstructor: false,
  javaGenerateConvenienceConstructor: false,

  javaCode: `
    public TokenExpiredException() {
      super();
    }

    public TokenExpiredException(String msg) {
      super(msg);
    }

    public TokenExpiredException(Exception cause) {
      super(cause);
    }
  `
});
