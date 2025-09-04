/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.reflow',
  name: 'ModelDAO',
  extends: 'foam.dao.ProxyDAO',

  requires: [ 'foam.dao.MDAO' ],

  properties: [
    'packages',
    [ 'of', foam.lang.Model ],
    {
      name: 'delegate',
      factory: function() {
        var dao      = this.MDAO.create({of: foam.lang.Model}).orderBy(foam.lang.Model.ID);
        var all      = [];
        var packages = { '--All--': all };

        function addModel(m) {
          try {
            var c = foam.maybeLookup(m);
            if ( c ) {
              var mdl = c.model_;
              (packages[mdl.package] || ( packages[mdl.package] = [])).push(mdl);
              all.push(mdl);
              dao.put(mdl);
            }
          } catch (x) {}
        }

        Object.keys(foam.USED).forEach(addModel);
        Object.keys(foam.UNUSED).forEach(addModel);
        this.packages = packages;

        return dao;
      }
    }
  ]
});
