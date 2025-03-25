/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.lang',
  name: 'Static',
  extends: 'foam.lang.AbstractMethod',

  documentation: 'An Axiom for defining static methods.',

  methods: [
    function isStatic() { return true; },

    function installInClass(cls) {
      Object.defineProperty(
        cls,
        this.name,
        {
          value: this.code,
          configurable: false
        });
    },

    function installInProto(proto) {
      this.installInClass(proto);
    }
  ]
});


foam.CLASS({
  package: 'foam.lang',
  name: 'ModelStaticRefinement',
  refines: 'foam.lang.Model',

  properties: [
    {
      class: 'AxiomArray',
      of: 'Static',
      name: 'static',
      adaptArrayElement: function(o) {
        if ( typeof o === 'function' ) {
          var name = foam.Function.getName(o);
          foam.assert(name, 'Static must be named');
          return foam.lang.Static.create({name: name, code: o});
        }

        return foam.lang.Static.isInstance(o) ?
          o :
          foam.lang.Static.create(o) ;
      }
    }
  ]
});
