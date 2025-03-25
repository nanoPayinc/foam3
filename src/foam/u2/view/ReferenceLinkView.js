/**
* @license
* Copyright 2025 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.u2.view',
  name: 'ReferenceLinkView',
  extends: 'foam.u2.view.ReferencePropertyView',
  documentation: `Creates a reference view from an id and a daoKey, acts as a reference view for without needing a reference property`,
  properties: [
    {
      name: 'data',
      documentation: 'ID of reference obj'
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'targetDAO'
    },
    {
      name: 'prop'
    }
  ],
  methods: [
    function fromProperty(prop) {
      let p = foam.lang.Reference.create({
        name: 'tempRef',
        of: this.targetDAO.of
      }, this);
      this.prop = p;
      this.SUPER(p);
    }
  ],
});
