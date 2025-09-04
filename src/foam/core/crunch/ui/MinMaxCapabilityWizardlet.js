/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.ui',
  name: 'MinMaxCapabilityWizardlet',
  extends: 'foam.core.crunch.ui.CapabilityWizardlet',
  implements: [
    'foam.core.crunch.ui.LiftingAwareWizardlet',
    'foam.core.crunch.ui.PrerequisiteAwareWizardlet'
  ],

  requires: [
    'foam.lang.ArraySlot',
    'foam.core.crunch.CapabilityJunctionStatus',
    'foam.core.crunch.ui.MinMaxCapabilityWizardletSection',
    'foam.u2.view.CardSelectView',
    'foam.u2.view.MultiChoiceView'
  ],

  imports: [
    'capabilityDAO',
    'translationService'
  ],

  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.core.crunch.MinMaxCapabilityData',
      name: 'data',
      factory: function(){
        return foam.core.crunch.MinMaxCapabilityData.create();
      }
    },
    {
      class: 'FObjectArray',
      of: 'foam.u2.wizard.wizardlet.Wizardlet',
      name: 'choiceWizardlets',
      factory: function() {
        return [];
      }
    },
    {
      name: 'min',
      class: 'Int',
      factory: function(){
        if ( foam.core.crunch.MinMaxCapability.isInstance(this.capability) ){
          return this.capability.min ?? this.choices.length;
        }
      }
    },
    {
      name: 'max',
      class: 'Int',
      factory: function(){
        if ( foam.core.crunch.MinMaxCapability.isInstance(this.capability) ){
          return this.capability.max || this.choices.length;
        }
      }
    },
    {
      name: 'choices',
      expression: function(choiceWizardlets){
        var self = this;
        return choiceWizardlets.map(wizardlet => {
          var isFinal =
            wizardlet.status === this.CapabilityJunctionStatus.GRANTED ||
            wizardlet.status === this.CapabilityJunctionStatus.PENDING;

          var capId = wizardlet.capability?.id || wizardlet.id;
          return [capId, self.translationService.getTranslation(foam.locale, `${capId}.name`,wizardlet.title), isFinal]
        })
      }
    },
    {
      class: 'Boolean',
      name: 'goNextOnValid',
      expression: function(capability$goNextOnValid){
        return capability$goNextOnValid;
      }
    },
    {
      class: 'Boolean',
      name: 'automaticallyReloadDataOnAvailable',
      documentation: `When set to true, when this wizardlet becomes available the selectedData of this.data will be repopulated from it's last known value`,
      value: true
    },
    {
      class: 'Boolean',
      name: 'isValid',
      postSet: function(o,n) {
        if ( ! n ) {
          this.isAvailablePromise =
            Promise.all(this.choiceWizardlets.map(cw => cw.isAvailablePromise))
              .then(() => { this.cancel(); });
        } else {
          if ( this.goNextOnValid ) {
            this.wizardController?.goNext();
          }
        } 
      },
      expression: function(min, max, data$selectedData){
        return data$selectedData?.length >= min && data$selectedData?.length <= max;
      }
    },
    {
      class: 'Boolean',
      name: 'isVisible',
      expression: function (isAvailable, choices, hideChoiceView) {
        return isAvailable && choices.length > 0 && ! hideChoiceView;
      }
    },
    {
      name: 'isAvailable',
      class: 'Boolean',
      value: true,
      documentation: `
        Specify the availability of this wizardlet. If true, wizardlet is
        available if at least one section is available. If false, wizardlet
        does not display even if some sections are available.
      `,
      postSet: function(_,n){ 
        if ( !n ){
          if ( this.automaticallyReloadDataOnAvailable && this.data.selectedData?.length ) this.data.lastPopulatedData = this.data.selectedData;
          this.data.selectedData = [];
          this.isAvailablePromise =
            Promise.all(this.choiceWizardlets.map(cw => cw.isAvailablePromise))
              .then(() => { this.cancel(); });
        } else {
          if ( this.automaticallyReloadDataOnAvailable && this.data.lastPopulatedData?.length) this.data.selectedData = this.data.lastPopulatedData;
          this.save();
        }
      }
    },
    {
      class: 'foam.u2.ViewSpec',
      name: 'choiceSelectionView',
      factory: () => ({
        class: 'foam.u2.view.MultiChoiceView'
      })
    },
    {
      class: 'foam.u2.ViewSpec',
      name: 'choiceView',
      factory: () => ({
        class: 'foam.u2.view.CardSelectView'
      })
    },
    {
      name: 'sections',
      flags: ['web'],
      transient: true,
      class: 'FObjectArray',
      of: 'foam.u2.wizard.wizardlet.WizardletSection',
      factory: function() {
        // to account for isFinal: true in choices
        var finalData = this.choices.filter(choice => choice[2]).map(selectedChoice => selectedChoice[0]);
        var selectedData = finalData;

        // to account for previously selected data
        if ( this.data.selectedData?.length > 0 ){
          var savedSelectedDataIds = [
            ...this.data.selectedData
          ];

          var savedSelectedData = [];

          // need to grab the selected capability objects
          for ( let i = 0; i < this.choices.length; i++ ){
            if ( savedSelectedDataIds.includes(this.choices[i][0].id) ){
              savedSelectedData.push(this.choices[i][0]);
            }

            if ( savedSelectedData.length === savedSelectedDataIds.length ) break;
          }

          selectedData = finalData.concat(savedSelectedData);
        }

        this.data.selectedData = selectedData;
        var sections = [
          this.MinMaxCapabilityWizardletSection.create({
            isAvailable: true,
            title: this.capability.name,
            choiceWizardlets$: this.choiceWizardlets$,
            isLoaded: true,
            customView: {
              ...this.choiceSelectionView,
              choices$: this.choices$,
              showValidNumberOfChoicesHelper: false,
              data$: this.data$.dot('selectedData'),
              minSelected$: this.min$,
              maxSelected$: this.max$,
              choiceView: {
                ...this.choiceView,
                of: 'foam.core.crunch.Capability',
                largeCard: true
             }
            }
          })
        ];

        if ( this.of && this.showDefaultSections ){
          var ofSections = foam.u2.detail.AbstractSectionedDetailView.create({
            of: this.of,
          }, this).sections.map(section => this.WizardletSection.create({
            section: section,
            data$: this.data$,
            isAvailable$: section.createIsAvailableFor(
              this.data$,
            )
          }));

          sections = [
            ...ofSections,
            ...sections
          ]
        }
        return this.hideChoiceView ? [] : sections;
      }
    },
    {
      name: 'consumePrerequisites',
      documentation: `
        When true, report 'true' on calls to addPrerequisite to indicate that
        prerequisite wizardlets were handled by this wizardlet. This effectively
        prevents prerequisite wizardlets from displaying in a CRUNCH wizard.
      `,
      class: 'Boolean'
    },
    {
      name: 'hideChoiceView',
      documentation: `
        When true, do not display the choice selection section.
      `,
      class: 'Boolean'
    },
    {
      name: 'showDefaultSections',
      class: 'Boolean'
    }
  ],

  methods: [
    function load() {
      // This needs to happen on load as this MinMax might be a child of another MinMax
      // Skip this wizardlet if only one choice is available and max is 1
      const choiceWizardlets = this.choiceWizardlets;
      if ( choiceWizardlets.length === 1 && this.max == 1 && this.min != 0 ) {
        this.data.selectedData = [choiceWizardlets[0].capability.id];
        this.isVisible = false;
      }
      this.SUPER();
    },
    function addPrerequisite(wizardlet, opt_meta) {
      const meta = {
        lifted: false,
        ...opt_meta
      };

      this.choiceWizardlets.push(wizardlet);
      if ( wizardlet.saveOnAvailable ) {
        console.warn( 'MinMax choice', wizardlet.id, 'of MinMax', this.id, `has saveOnAvailable active, 
        this can cause unexpected wizardelet.save() calls, disabling this behavior`)
        wizardlet.saveOnAvailable = false;
      }

      // isAvailable defaults to false if this MinMax is in control of the
      //   prerequisite wizardlet
      if ( ! meta.lifted ) {
        wizardlet.isAvailable$ = this.getPrerequisiteAvailabilitySlot(wizardlet);
      }

      return this.consumePrerequisites;
    },
    function handleLifting(liftedWizardlets) {
      if ( ! liftedWizardlets.length ) return;
      const updated = () => {
        // Hide choice selection if lifted choices reach maximum
        const countLifted = liftedWizardlets.length && liftedWizardlets
          .map(w => w.isAvailable ? 1 : 0)
          .reduce((count, val) => count + val);
        this.isVisible = countLifted < this.max && this.isAvailable;


        // Update lifted choices based on their availability
        let newSelectedData = [...this.data.selectedData || []];
        for ( const w of liftedWizardlets ) {
          if ( w.isAvailable ) newSelectedData.push(w.capability);
          else foam.Array.remove(newSelectedData, w.capability);
        }
        this.data.selectedData = foam.Array.unique(newSelectedData);
      }
      const slots = liftedWizardlets.map(w => w.isAvailable$);
      this.ArraySlot.create({ slots }).sub(updated);
      this.isAvailable$.sub(updated);
    },
    function getPrerequisiteAvailabilitySlot(prereqWizardlet){
      var slot = foam.lang.SimpleSlot.create();

      this.data$.dot('selectedData').sub(
        ()=> slot.set(this.isPrereqSelected(prereqWizardlet))
      );

      slot.set(this.isPrereqSelected(prereqWizardlet));
      
      return slot;
    },

    function isPrereqSelected(prereqWizardlet){
      for ( var i = 0 ; i < this.data.selectedData?.length ; i++ ) {
        var currentData = this.data.selectedData[i];

        let idToCompare;
        if ( foam.String.isInstance(currentData) ){
          idToCompare = currentData;
        } else if ( foam.core.crunch.Capability.isInstance(currentData) ){
          idToCompare = currentData.id;
        } else {
          idToCompare = null;
        }

        if ( idToCompare == null ){
          console.warn("Unexpected data type to compare");
          return;
        }

        if ( foam.util.equals(idToCompare, prereqWizardlet.id) ) return true;
      }
      return false;
    },
  ],
  listeners: [
    {
      name: 'onReady',
      documentation: 'If one choice available skip the wizardlet',
      code: function() {
        const choiceWizardlets = this.choiceWizardlets;
        if ( choiceWizardlets.length === 1 && this.min != 0) {
          this.goNextOnValid = true;
          this.isVisible = false;
        }
      }
    }
  ]
});
