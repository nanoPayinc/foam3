/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.wizard.debug',
  name: 'TestWizardScenarioMenu',
  extends: 'foam.nanos.menu.AbstractMenu',

  imports: [
    'crunchController',
    'stack'
  ],

  exports: [
    'fakeCapabilityDAO as capabilityDAO',
    'fakePrerequisiteCapabilityDAO as prerequisiteCapabilityJunctionDAO'
  ],

  requires: [
    'foam.dao.ArrayDAO',
    'foam.u2.crunch.wizardflow.LoadCapabilityGraphAgent',
    'foam.u2.crunch.wizardflow.GraphWizardletsAgent',
    'foam.u2.stack.StackBlock',
    'foam.u2.wizard.agents.RootCapabilityAgent',
    'foam.u2.wizard.debug.scenarios.MinMaxChoicePrereqLiftScenario',
    'foam.util.async.Sequence'
  ],

  properties: [
    {
      class: 'foam.dao.DAOProperty',
      name: 'fakeCapabilityDAO',
      flags: ['web'],
      expression: function (scenario) {
        return this.ArrayDAO.create({
          of: 'foam.nanos.crunch.Capability',
          array: scenario.capabilities
        });
      }
    },
    {
      class: 'foam.dao.DAOProperty',
      name: 'fakePrerequisiteCapabilityDAO',
      flags: ['web'],
      expression: function (scenario) {
        return this.ArrayDAO.create({
          of: 'foam.nanos.crunch.CapabilityCapabilityJunction',
          array: scenario.capabilityCapabilityJunctions
        });
      }
    },
    {
      class: 'Class',
      name: 'scenarioCls',
      flags: ['web']
    },
    {
      class: 'FObjectProperty',
      of: 'foam.u2.wizard.debug.TestWizardScenario',
      name: 'scenario',
      flags: ['web'],
      expression: function (scenarioCls) {
        if ( ! scenarioCls ) return null;
        return scenarioCls.create({}, this);
      }
    }
  ],

  methods: [
    function launch(X) {
      this.launch_(X);
    },
    async function launch_(X) {
      X = X.createSubContext({
        capabilityDAO: this.fakeCapabilityDAO,
        prerequisiteCapabilityJunctionDAO: this.fakePrerequisiteCapabilityDAO
      });
      const sequence = this.crunchController.createTransientWizardSequence(X)
        .addBefore('ConfigureFlowAgent', this.RootCapabilityAgent, {
          rootCapability: 'Entry'
        })
        .addBefore('CreateWizardletsAgent', this.LoadCapabilityGraphAgent)
        .addBefore('CreateWizardletsAgent', this.GraphWizardletsAgent)
        .remove('CreateWizardletsAgent')
        .remove('GrantedEditAgent')
        .remove('CapabilityStoreAgent')
        ;
      this.scenario.installInSequence(sequence);
      await sequence.execute();
    }
  ]
});