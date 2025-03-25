/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.boot',
  name: 'DAOCSpecMenu',
  extends: 'foam.core.menu.PseudoMenu',

  documentation: 'Psedo-menu to display all DAO CSpecs as sub-menus.',

  implements: [ 'foam.mlang.Expressions' ],

  requires: [
    'foam.comics.v2.DAOControllerConfig',
    'foam.dao.PromisedDAO',
    'foam.core.controller.Memento',
    'foam.core.menu.LinkMenu',
    'foam.core.menu.Menu'
  ],

  imports: [ 'cSpecDAO' ],

  properties: [
    {
      name: 'children_',
      factory: function() {
        /* ignoreWarning */
        var aDAO = this.MDAO.create({of: this.Menu});
        var pDAO = this.PromisedDAO.create();
        this.cSpecDAO.where(
          this.AND(
            this.ENDS_WITH(foam.core.boot.CSpec.ID, 'DAO'),
            this.EQ(foam.core.boot.CSpec.SERVE,     true)
          )).select((spec) => {
            var menu = this.Menu.create({
              id:      'admin.data/' + spec.id,
              label:   foam.String.labelize(spec.name),
              parent:  this.id,
              handler: this.LinkMenu.create({link: '#admin.data/' + spec.id})
            });
            aDAO.put(menu);
        }).then(() => pDAO.promise.resolve(aDAO));

        return pDAO;
      }
    }
  ]
});
