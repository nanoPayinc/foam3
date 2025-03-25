/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.mlang',
  name: 'IsValid',
  extends: 'foam.mlang.predicate.Unary',
  implements: [ 'foam.lang.Serializable' ],
  javaImports: [
    'foam.lang.XLocator'
  ],

  properties: [
    {
      class: 'foam.mlang.ExprProperty',
      name: 'arg1'
    }
  ],

  methods: [
    {
      name: 'f',
      code: function(o) {
        return this.arg1.f(o) == undefined || this.arg1.f(o).errors_ ? false : true;
      },
      javaCode: `
try {
  ((foam.lang.FObject) getArg1().f(obj)).validate(XLocator.get());
} catch(Exception e) {
  return false;
}
return true;
      `
    }
  ]
});
