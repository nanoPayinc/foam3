/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
   Canned queries are common reusable DAO Predicates associated with a model.
   If 'name' is specified, they are installed on both the prototype and class.
   <pre>
   Ex.
   axioms: [
     {
       class: 'foam.comics.v2.CannedQuery',
       name: 'DAOS',
       label: 'DAOs',
       predicateFactory: function(e, cls) {
         return e.ENDS_WITH(cls.NAME, 'DAO');
       }
     }
   ]
   </pre>
   Accessed as someDAO.where(this.MyClass.DAOS)...
**/
foam.CLASS({
  package: 'foam.comics.v2',
  name: 'CannedQuery',

  documentation: `
    A common query that can be stored in a model
  `,

  properties: [
    {
      class: 'String',
      name: 'name',
      hidden: true,
      expression: function(label) {
        // Since these can be used as axioms, provide a unique name based on the label.
        return label.replace(/[^0-9a-z]/gi, '') + '__CannedQuery';
      }
    },
    {
      class: 'String',
      name: 'label'
    },
    {
      class: 'foam.mlang.predicate.PredicateProperty',
      name: 'predicate',
      expression: function(predicateFactory) {
        return predicateFactory ?
          predicateFactory(foam.mlang.ExpressionsSingleton.create(), this.sourceCls_) :
          null;
      }
    },
    {
      name: 'predicateFactory',
      hidden: true
    }
  ],

  methods: [
    function installInClass(cls) {
      if ( ! this.hasOwnProperty('name') ) return;

      Object.defineProperty(
        cls,
        this.name, //foam.String.constantize(this.name),
        {
          get: () => this.predicate,
          configurable: false
        });
    },
    function installInProto(proto) {
      this.installInClass(proto);
    }
  ]
});
