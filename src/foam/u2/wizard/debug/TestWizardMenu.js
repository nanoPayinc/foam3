/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.wizard.debug',
  name: 'TestWizardMenu',
  extends: 'foam.nanos.menu.Menu',

  imports: [
    'stack'
  ],

  requires: [
    'foam.dao.ArrayDAO',
    'foam.nanos.menu.Menu',
    'foam.u2.wizard.debug.TestWizardScenarioMenu'
  ],

  properties: [
    {
      class: 'StringArray',
      name: 'packages',
      factory: () => ['foam.u2.wizard.debug.scenarios']
    },
    {
      name: 'children_',
      factory: function () {
        const scenarioMenus = [];

        scenarioMenus.push(this.Menu.create({
          id: this.id + '/ElementWizardTest',
          label: 'Element Wizard Test',
          parent: this.id,
          handler: foam.nanos.menu.ViewMenu.create({
            view: { class: 'net.nanopay.cards.test.wizards.ElementTest' }
          }, this)
        }));

        for ( const packageString of this.packages ) {
          const pkg = packageString.split('.').reduce((o, k) => o?.[k], globalThis);
          if ( pkg === undefined ) throw new Error(
            `could not load wizard scenarios from: ${packageString}`);
          scenarioMenus.push(...Object.getOwnPropertyNames(pkg).map(scenarioName =>
            this.Menu.create({
              id: this.id + '/' + scenarioName,
              label: foam.String.labelize(scenarioName),
              parent: this.id,
              handler: this.TestWizardScenarioMenu.create({
                scenarioCls: pkg[scenarioName]
              })
            })
          ));
        }
        
        return this.ArrayDAO.create({ array: scenarioMenus });
      }
    },
    {
      name: 'children',
      // Use getter instead of factory to have higher precedence
      // than than 'children' factory from relationship
      getter: function() { return this.children_; }
    }
  ]
});
