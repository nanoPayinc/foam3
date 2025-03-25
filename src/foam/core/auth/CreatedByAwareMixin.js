/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.auth',
  name: 'CreatedByAwareMixin',

  implements: [
    'foam.core.auth.CreatedByAware'
  ],

  properties: [
    {
      class: 'Reference',
      of: 'foam.core.auth.User',
      name: 'createdBy',
      createVisibility: 'HIDDEN',
      updateVisibility: 'RO',
      documentation: 'User who created the entry',
      tableCellFormatter: function(value, obj, axiom) {
        this.__subSubContext__.userDAO
          .find(value)
          .then(user => this.add(user ? user.legalName : `ID: ${value}`));
      }
    },
    {
      class: 'Reference',
      of: 'foam.core.auth.User',
      name: 'createdByAgent',
      documentation: 'Agent acting as User who created the entry',
      createVisibility: 'HIDDEN',
      updateVisibility: 'RO',
      tableCellFormatter: function(value, obj, axiom) {
        this.__subSubContext__.userDAO
          .find(value)
          .then(user => this.add(user ? user.legalName : `ID: ${value}`));
      }
    }
  ]
});
