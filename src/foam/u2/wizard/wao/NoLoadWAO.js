/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.wizard.wao',
  name: 'NoLoadWAO',
  extends: 'foam.u2.wizard.wao.SplitWAO',
  documentation: `
    A WAO that does not load and prevents any delegates from loading unless explicitly told to do so.
    Useful when a precefing WAO has already loaded the data for a wizardlet.

    NOTE: If we need a 'NoSaveWAO' we should make this wao configreable to not save rather than making a new class.
  `,
  methods: [
    async function load(wizardlet, options) {
      if ( options?.enableLoad ) {
        await this.SUPER(wizardlet, options);
      }
      return;
    }
  ]
});
