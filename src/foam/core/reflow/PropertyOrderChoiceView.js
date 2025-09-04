/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.reflow',
  name: 'PropertyOrderChoiceView',
  extends: 'foam.u2.view.ChoiceView',

  properties: [
    'of',
    {
      name: 'choices',
      factory: function(of) {
        var choices = [ ];
        choices.push('--');
        this.of.getAxiomsByClass(foam.lang.Property).forEach(p => {
          if ( p.hidden || p.networkTransient ) return;
          choices.push(p.name);
          choices.push('-' + p.name);
        });
        return choices;
      }
    }
  ]
});
