/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.flow',
  name: 'DocumentMenu',
  extends: 'foam.core.menu.Menu',

  documentation: 'Psedo-menu to display all documents as sub-menus.',

  implements: [ 'foam.mlang.Expressions' ],

  requires: [
    'foam.core.menu.DocumentFileMenu',
    'foam.dao.ArrayDAO',
    'foam.dao.PromisedDAO',
    'foam.core.controller.Memento',
    'foam.core.menu.Menu'
  ],

  imports: [ 'documentDAO' ],

  properties: [
    {
      name: 'children_',
      factory: function() {
        /* ignoreWarning */
        var aDAO = this.ArrayDAO.create();
        var pDAO = this.PromisedDAO.create();

        this.documentDAO
          .select(doc => {
            var menu = this.Menu.create({
              id:     this.id + '/' + doc.id,
              keywords: ["flow", "doc", "document", "help"],
              label:  doc.title || foam.String.labelize(doc.id),
              parent: this.id,
              handler: this.DocumentFileMenu.create({
                docKey: doc.id,
              })
            });
            aDAO.put(menu);
        }).then(() => pDAO.promise.resolve(aDAO));

        return pDAO.orderBy(this.Menu.LABEL);
      }
    },
    {
      name: 'children',
      // Use getter instead of factory to have higher precedence
      // than than 'children' factory from relationship
      getter: function() { return this.children_; }
    }
  ]
});
