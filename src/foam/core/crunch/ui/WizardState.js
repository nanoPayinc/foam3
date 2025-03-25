/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.ui',
  name: 'WizardState',
  documentation: `
    The first time a user opens a wizard with respect to a CRUNCH capability,
    the wizard will not display any capabilities that were previously granted.
    However, if the wizard is set to display completed capabilities, then any
    subsequent invocation of the wizard should still show the newly GRANTED
    capabilities.

    WizardState stores a list of capabilities that were granted on the first
    invocation of a wizard with respect to a specific top-level capability to
    support the behaviour described above.
  `,

  ids: ['realUser', 'effectiveUser', 'capability'],

  properties: [
    {
      name: 'realUser',
      class: 'Reference',
      of: 'foam.core.auth.User'
    },
    {
      name: 'effectiveUser',
      class: 'Reference',
      of: 'foam.core.auth.User'
    },
    {
      name: 'capability',
      class: 'Reference',
      of: 'foam.core.crunch.Capability',
      menuKeys: ['admin.capabilities']
    },
    {
      name: 'ignoreList',
      class: 'StringArray',
      documentation: `
        List of capabilities to ignore when rendering the wizard.
      `
    }
  ],
});

// This did not work - used multiple ID instead
// foam.RELATIONSHIP({
//   package: 'foam.core.crunch.ui',
//   extends:'foam.core.crunch.ui.WizardState',
//   sourceModel: 'foam.core.auth.User',
//   targetModel: 'foam.core.crunch.Capability',
//   junctionModel: 'foam.core.crunch.ui.UserCapabilityWizardState',
//   cardinality: '*:*',
//   forwardName: 'capabilityWizardStates',
//   inverseName: 'userWizardStates'
// });
