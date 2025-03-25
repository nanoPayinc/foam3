/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.wizard.debug.scenarios',
  name: 'PrerequisiteWAOScenario',
  extends: 'foam.u2.wizard.debug.TestWizardScenario',

  properties: [
    {
      class: 'FObjectArray',
      of: 'foam.core.crunch.Capability',
      name: 'capabilities',
      factory: () => [
        {
          class: 'foam.core.crunch.Capability',
          id: 'Entry',
          wizardConfig: {
            class: 'foam.u2.crunch.EasyCrunchWizard',
            incrementalWizard: true
          }
        },
        {
          class: 'foam.core.crunch.Capability',
          id: `HasData`,
          of: 'foam.lang.StringHolder'
        },
        {
          class: 'foam.core.crunch.Capability',
          id: `WantsData`,
          of: 'foam.lang.StringHolder',
          wizardlet: {
            class: 'foam.core.crunch.ui.CapabilityWizardlet',
            wao: {
              class: 'foam.u2.wizard.wao.PrerequisiteWAO',
              of: 'foam.lang.StringHolder',
              prerequisiteCapabilityId: 'HasData'
            }
          }
        }
      ]
    },
    {
      class: 'FObjectArray',
      of: 'foam.core.crunch.CapabilityCapabilityJunction',
      name: 'capabilityCapabilityJunctions',
      factory: () => [
        ['Entry','WantsData'],
        ['WantsData','HasData'],
      ]
    }
  ]
});
