/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.crunch.wizardflow',
  name: 'AutoSaveWizardletsAgent',
  documentation: `
    Binds listeners which automatically save wizardlets when they are modified.
  `,

  imports: [
    'wizardlets',
    'wizardController'
  ],

  requires: [
    'foam.nanos.crunch.ui.CapabilityWizardlet'
  ],

  implements: [
    'foam.core.ContextAgent'
  ],

  methods: [
    async function execute() {
      // TODO: investigate adding onDetach here
      for ( let wizardlet of this.wizardlets ) {
        if ( this.CapabilityWizardlet.isInstance(wizardlet) && (wizardlet.capability && wizardlet.capability.autoSave) ) {
          wizardlet.getDataUpdateSub().sub(this.autoSave.bind(this, wizardlet));
        }
      }
    }
  ],
  listeners: [
    {
      name: 'autoSave',
      // Does not need idled or merged as the wizardlet data sub already does this
      // isIdled: true,
      code: async function(wizardlet) {
        this.wizardController.isLoading_ = true;
        await wizardlet.save({ reloadData: wizardlet.reloadOnAutoSave });
        this.wizardController.isLoading_ = false;
      }
    }
  ]
});
