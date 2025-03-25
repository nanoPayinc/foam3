/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.analytics',
  name: 'FoldManagerDAODecorator',
  extends: 'foam.dao.ProxyDAO',
  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.core.analytics.FoldManager',
      name: 'fm'
    }
  ],
  methods: [
    {
      name: 'put_',
      javaCode: `
obj = getDelegate().put_(x, obj);
if ( obj instanceof foam.core.analytics.Foldable ) {
  ((foam.core.analytics.Foldable) obj).doFolds(getFm());
}
return obj;
      `
    }
  ]
});