/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.ticket',
  name: 'TicketDAOCreateView',
  extends: 'foam.comics.v2.DAOCreateView',

  properties: [
    {
      class: 'foam.u2.ViewSpec',
      name: 'viewView',
      expression: function() {
        return {
          class: 'foam.u2.view.FObjectView',
          of: 'foam.core.ticket.Ticket',
          detailView: { class: 'foam.u2.detail.SectionedDetailView' }
        };
      }
    }
  ]
});
