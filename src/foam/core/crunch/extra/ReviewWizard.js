/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.extra',
  name: 'ReviewWizard',
  extends: 'foam.core.crunch.Capability',
  documentation: `
    This capability is recognized by ReviewWizardDAO.
  `,

  properties: [
    {
      name: 'capabilityToReview',
      class: 'Reference',
      of: 'foam.core.crunch.Capability',
      menuKeys: ['admin.capabilities']
    }
  ],
});
