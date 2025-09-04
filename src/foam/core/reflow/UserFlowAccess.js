/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.reflow',
  name: 'UserFlowAccess',

  requires: [
    'foam.core.reflow.FlowAccess'
  ],

  properties: [
    {
      class: 'Reference',
      of: 'foam.core.auth.User',
      name: 'userId',
      reactive: false,
      required: true
    },
    {
      class: 'Enum',
      of: 'foam.core.reflow.FlowAccess',
      name: 'accessLevel',
      reactive: false,
      factory: function() { return foam.core.reflow.FlowAccess.PUBLIC_RO; },
      view: function(_, X) {
        return {
          class: 'foam.u2.view.RadioView',
          isHorizontal: true,
          choices: [
            [ foam.core.reflow.FlowAccess.PUBLIC_RO, foam.core.reflow.FlowAccess.PUBLIC_RO.label ],
            [ foam.core.reflow.FlowAccess.PUBLIC_RW, foam.core.reflow.FlowAccess.PUBLIC_RW.label ]
          ]
        }
      }
    }
  ]
});
