/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.auth.test',
  name: 'DummySp',

  documentation: 'A fake/mock/dummy model just to test ServiceProvideAware',

  implements: [
    'foam.core.auth.ServiceProviderAware'
  ],

  javaImports: [
    'foam.core.auth.ServiceProviderAware',
    'foam.core.auth.ServiceProviderAwareSupport'
  ],

  properties: [
    {
      name: 'id',
      class: 'Long'
    },
    {
      name: 'owner',
      class: 'Reference',
      of: 'foam.core.auth.User'
    },
    {
      name: 'spid',
      class: 'Reference',
      of: 'foam.core.auth.ServiceProvider',
      storageTransient: true,
      javaFactory: `
        var map = foam.util.Arrays.asMap(new Object[]
          {
            DummySp.class.getName(),
            new foam.lang.PropertyInfo[] { DummySp.OWNER }
          });
        return new ServiceProviderAwareSupport().findSpid(getX(), map, this);
      `
    }
  ]
});
