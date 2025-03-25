/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.edit',
  name: 'PermissiveEditBehaviour',
  extends: 'foam.core.crunch.edit.AbstractEditBehaviour',

  properties: [
    {
      name: 'wizardletBorder',
      factory: function(){
        return 'foam.u2.wizard.views.PermissiveEditWizardletBorder'
      }
    }
  ],

  methods: [
    {
      name: 'maybeApplyEdit',
      javaCode: `
        ucj.setData(newData);
        return true;
      `
    }
  ]
});
