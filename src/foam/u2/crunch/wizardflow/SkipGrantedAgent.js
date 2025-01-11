/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.crunch.wizardflow',
  name: 'SkipGrantedAgent',
  documentation: `
    Allows filtering or skipping of granted capabilities. Also exports a wizard
    position in case wizardlets are to be skipped.
  `,
  imports: [ 
    'crunchService',
    'wizardlets'
  ],
  exports: [ 'initialPosition' ],
  requires: [
    'foam.nanos.crunch.CapabilityJunctionStatus',
    'foam.u2.crunch.wizardflow.SkipMode',
    'foam.nanos.crunch.ui.CapabilityWizardlet',
    'foam.u2.wizard.WizardPosition',
    'foam.u2.wizard.wizardflow.AddFacadeWizardlet.FacadeWizardlet'
  ],

  properties: [
    {
      name: 'initialPosition',
      class: 'FObjectProperty',
      of: 'foam.u2.wizard.WizardPosition',
      factory: function() {
        return this.WizardPosition.create({
          wizardletIndex: 0,
          sectionIndex: 0,
        });
      },
    },
    {
      name: 'mode',
      class: 'Enum',
      of: 'foam.u2.crunch.wizardflow.SkipMode',
      factory: function () {
        return this.SkipMode.SKIP;
      }
    }
  ],

  methods: [
    async function execute() {
      if ( this.mode == this.SkipMode.SHOW ) return;

      let passedAtBeginning = -1;
      let foundFirstWizardlet = false;
      for ( let wizardlet of this.wizardlets ) {
        if ( ! foundFirstWizardlet ) passedAtBeginning++;
        if ( ! wizardlet.isAvailable ||
          (! this.CapabilityWizardlet.isInstance(wizardlet) && ! this.FacadeWizardlet.isInstance(wizardlet)) ) continue;
        let isGranted = ['GRANTED','PENDING'].some(status =>
          this.CapabilityJunctionStatus[status] == wizardlet.status);
        if ( ! isGranted ||  
          (wizardlet.capability && await this.crunchService.isRenewable(this.__subContext__, wizardlet.capability.id))
        ) {
          foundFirstWizardlet = true;
          continue;
        }
        if ( this.FacadeWizardlet.isInstance(wizardlet) ) wizardlet.handleSkipping();
        if ( this.mode == this.SkipMode.HIDE ) {
          wizardlet.isVisible = false;
        }
      }

      this.initialPosition.wizardletIndex = passedAtBeginning;
    }
  ],
});
