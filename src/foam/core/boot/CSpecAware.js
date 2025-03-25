/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.boot',
  name: 'CSpecAware',

  properties: [
    {
      name: 'cSpec',
      class: 'FObjectProperty',
      of: 'foam.core.boot.CSpec',
      transient: true
    }
  ]
});


foam.CLASS({
  package: 'foam.core.boot',
  name: 'EasyDAOCSpecAwareRefinement',
  refines: 'foam.dao.EasyDAO',

  implements: [
    'foam.core.boot.CSpecAware'
  ],

  properties: [
    {
      name: 'name',
      factory: function() {
        return this.cSpec && this.cSpec.name || (this.of && this.of.id);
      }
    }
  ]
});
