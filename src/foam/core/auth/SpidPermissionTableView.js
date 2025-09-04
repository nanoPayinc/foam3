/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

 foam.CLASS({
  package: 'foam.core.auth',
  name: 'SpidPermissionTableView',
  extends: 'foam.core.auth.PermissionTableView',

  imports: [
    'capabilityDAO',
    'prerequisiteCapabilityJunctionDAO',
    'serviceProviderDAO'
  ],

  requires: [
    'foam.core.auth.ServiceProvider',
    'foam.core.crunch.Capability',
    'foam.core.crunch.CapabilityCapabilityJunction'
  ],

  properties: [
    {
      class: 'Boolean',
      name: 'showSearch',
      value: false
    },
    {
      name: 'rolesOnly',
      value: true
    }
  ],

  // create capabilities of all the roles

  methods: [
    async function initMap() {
      var self = this;
      var pcjs = await this.prerequisiteCapabilityJunctionDAO.select();
      pcjs.array.forEach(pcj => {
        var spid = pcj.sourceId, cap = pcj.targetId;
        var key = cap + ':' + spid;

        var data = this.GroupPermission.create({
          checked: true
        });

        data.checked$.sub(function() {
          self.updateGroup(cap, spid, data.checked$, self);
        });

        this.gpMap[key] = data;
      });

    },

    async function getColumns() {
      this.serviceProviderDAO = this.serviceProviderDAO.where(this.NOT(this.IN(this.ServiceProvider.ID, ['*', 'foam'])));
      var gs = (await this.serviceProviderDAO.orderBy(this.ServiceProvider.ID).select()).array;

      // skipping findchildren because spids can have multiple parents

      for ( var i = 0 ; i < gs.length ; i ++ ) {
        gs[i].displayName_ = gs[i].name;
      }
      return gs;
    },

    async function getRows() {
      var permissions = (await this.permissionDAO.orderBy(this.Permission.ID).select()).array;
      var capabilities = [];
      for ( var i = 0; i < permissions.length; i++ ) {
        var cap = this.Capability.create({
          id: permissions[i].id,
          permissionsGranted: [ permissions[i].id ],
          lifecycleState: foam.core.auth.LifecycleState.ACTIVE
        });
        vap = await this.capabilityDAO.put(cap);
        capabilities.push(cap);
      }
      return capabilities;
    },

    function updateGroup(c_, g_, data) {
      var ccj = this.CapabilityCapabilityJunction.create({
        sourceId: g_,
        targetId: c_
      })
      if ( data.get() ) {
        this.prerequisiteCapabilityJunctionDAO.put(ccj);
      } else {
        this.prerequisiteCapabilityJunctionDAO.remove(ccj);
      }
    }
  ]
});
