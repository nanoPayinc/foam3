/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

([
  {
    name: 'LiftOneAllowTwo',
    choices: ['ChoiceA', 'ChoiceB', 'ChoiceC'],
    lifted: ['ChoiceA'],
    max: 2
  },
  {
    name: 'LiftOneAllowOne',
    choices: ['ChoiceA', 'ChoiceB', 'ChoiceC'],
    lifted: ['ChoiceA'],
    max: 1
  }
].forEach(META => foam.CLASS({
  package: 'foam.u2.wizard.debug.scenarios',
  name: META.name,
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
        ...META.choices.map((name, i) => ({
          class: 'foam.core.crunch.Capability',
          id: name,
          of: ['String','Int','Boolean'].map(v => `foam.lang.${v}Holder`)[i % 3]
        })),
        {
          class: 'foam.core.crunch.MinMaxCapability',
          id: 'MinMax',
          min: 1, max: META.max
        },
        {
          class: 'foam.core.crunch.Capability',
          id: 'Choice.D.A',
          of: 'foam.lang.IntHolder'
        },
        {
          class: 'foam.core.crunch.Capability',
          id: 'Choice.D.B',
          of: 'foam.lang.BooleanHolder'
        }
      ]
    },
    {
      class: 'FObjectArray',
      of: 'foam.core.crunch.CapabilityCapabilityJunction',
      name: 'capabilityCapabilityJunctions',
      factory: () => [
        ...META.lifted.map(name => ['Entry', name]),
        ['Entry','MinMax'],
        ...META.choices.map(name => ['MinMax', name])
      ]
    }
  ]
})));
