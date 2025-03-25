/**
* @license
* Copyright 2023 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.core.menu',
  name: 'PseudoMenu',
  extends: 'foam.core.menu.Menu',

  documentation: `Psedo-menu base class that can be used to create
    children for menus on startup rather than defined in jrls.
    Refer to foam.core.boot.DAOCSpecMenu for reference.`,

  implements: ['foam.mlang.Expressions'],

  requires: [
    'foam.dao.MDAO'
  ],

  properties: [
    {
      name: 'readPredicate',
      factory: function() {
        /* ignoreWarning */
        return async function(o) {
          return await o.children_.select(this.COUNT()).value;
        };
      }
    },
    {
      name: 'children_',
      factory: function() {
        // To be implemented by sub-classes
        return this.MDAO.create({of: foam.core.menu.Menu});
      }
    },
    {
      name: 'children',
      // Use getter instead of factory to have higher precedence
      // than than 'children' factory from relationship
      getter: function() { return this.children_; }
    },
    {
      name: 'view',
      factory: function() { return 'foam.core.menu.PseudoMenuView' }
    }
  ]
});
