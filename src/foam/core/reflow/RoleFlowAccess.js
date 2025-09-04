/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.reflow',
  name: 'RoleFlowAccess',
  implements: [ 'foam.mlang.Expressions' ],

  imports: [
    'groupDAO'
  ],

  requires: [
    'foam.core.auth.Group',
    'foam.core.reflow.FlowAccess'
  ],

  constants: {
    ROLE_PREFIX: 'Role'
  },

  properties: [
    {
      class: 'foam.mlang.predicate.PredicateProperty',
      name: 'predicate',
      hidden: true,
      factory: function() {
        return this.CONTAINS(this.Group.ID, this.ROLE_PREFIX);
      }
    },
    {
      class: 'Reference',
      of: 'foam.core.auth.Group',
      name: 'roleId',
      required: true,
      reactive: false,
      view: function(_, X) {
        var self = X.data;
        var rolesDAO = self.groupDAO.where(self.predicate);
        return {
          class: 'foam.u2.view.RichChoiceView',
          search: true,
          sections: [
            {
              heading: 'Roles',
              dao: rolesDAO
            }
          ]
        };
      }
    },
    {
      __copyFrom__: 'foam.core.reflow.UserFlowAccess.ACCESS_LEVEL'
    }
  ]
});
