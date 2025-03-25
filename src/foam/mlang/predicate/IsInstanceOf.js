/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.mlang.predicate',
  name: 'IsInstanceOf',
  extends: 'foam.mlang.predicate.AbstractPredicate',
  implements: [ 'foam.lang.Serializable' ],

  documentation: 'Predicate which checks if objects are instances of the specified class.',

  javaCode: `
    public IsInstanceOf(foam.lang.ClassInfo of) {
      setOf(of);
    }
  `,

  properties: [
    {
      class: 'Class',
      name: 'of',
      javaType: 'foam.lang.ClassInfo',
      view: {
        class: 'foam.u2.view.StrategizerChoiceView',
        desiredModelId: 'foam.Class'
      }
    },
    {
      class: 'FObjectProperty',
      javaType: 'foam.mlang.Expr',
      name: 'propExpr'
    }
  ],

  methods: [
    {
      type: 'FObject',
      name: 'fclone',
      javaCode: 'return this;'
    },
    {
      name: 'f',
      code: function f(obj) { return this.propExpr == null || this.propExpr == undefined ? this.of.isInstance(obj) : this.of.isInstance(this.propExpr.f(obj)); },
      javaCode: 'return getPropExpr() == null ? getOf().isInstance(obj) : getOf().isInstance(getPropExpr().f(obj));'
    },
    {
      name: 'ruleF',
      type: 'Boolean',
      args: 'Context x, foam.lang.FObject o, foam.lang.FObject n',
      code: 'return this.f(n);',
      javaCode: 'return f(n);'
    },
    {
      name: 'toString',
      code: function toString() {
        return foam.String.constantize(this.cls_.name) +
            '(' + this.of.id + ')';
      },
      javaCode: `
        return getClass().getSimpleName() + "(" + getOf().getId() + ")";
      `
    }
  ]
});
