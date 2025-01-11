/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.mlang.predicate',
  name: 'IsClassOf',
  extends: 'foam.mlang.predicate.AbstractPredicate',
  implements: [ 'foam.core.Serializable' ],

  documentation: 'Predicate which checks if the class of object is a specified class.',

  javaCode: `
  public IsClassOf(foam.core.ClassInfo of) {
    setOf(of);
  }
  `,

  properties: [
    {
      class: 'Class',
      name: 'of',
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
      name: 'f',
      code: function(obj) {
        return this.propExpr == null || this.propExpr == undefined ? this.of.id == obj.cls_.id : this.of.id == this.propExpr.f(obj).cls_.id;
      },
      javaCode: `
      return getPropExpr() == null ? getOf().getObjClass() == obj.getClass() : getOf().getObjClass() == getPropExpr().f(obj).getClass();
      `
    },
    {
      name: 'ruleF',
      type: 'Boolean',
      args: 'Context x, foam.core.FObject o, foam.core.FObject n',
      code: 'return this.f(n);',
      javaCode: 'return f(n);'
    },
    function toString() {
      return foam.String.constantize(this.cls_.name) +
          '(' + this.of.id + ')';
    }
  ]
});
