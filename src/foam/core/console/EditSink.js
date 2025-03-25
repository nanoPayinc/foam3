/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.console',
  name: 'EditSink',
  extends: 'foam.dao.ArraySink',

  methods: [
    function addToE(e) {
      var dao = e.__context__.dao; // hackish, better to export & import
      this.array.forEach(o => {
        var data = foam.comics.DAOUpdateController.create({data: o, dao: dao}, this);

        e.tag({
          class: 'foam.comics.DAOUpdateControllerView',
          controllerMode: foam.u2.ControllerMode.EDIT,
          detailView: 'foam.u2.DetailView',
          dao: dao,
          data: data
        });
      });
    }
  ]
});
