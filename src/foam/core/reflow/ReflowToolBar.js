/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */


foam.CLASS({
  package: 'foam.core.reflow',
  name: 'ReflowToolBar',
  extends: 'foam.u2.View',

  requires: [
    'foam.core.reflow.ToolbarControl'
  ],

  imports: ['showPrompts','toolbarControlDAO', 'data as importedData'],

  css: `
    ^ {
      position: relative;
      margin-block-end: 0;
      display: inline-flex;
      width: 100%;
      align-items: center;
      position: sticky;
      justify-content: space-between;
      bottom: 0;
      padding: 10px 16px;
      border-top: 1px solid $borderLight;
    }
    ^ > :lastChild {
      flex-shrink: 0;
    }
    ^input-field-container {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }

  `,

  properties: [
    {
      name: 'data',
      factory: function() {
        return this.importedData;
      }
    },
    {
      class: 'String',
      name: 'promptMode',
      value: 'Standard',
      view: {
        class: 'foam.u2.view.ChoiceView',
        choices: ['Standard', 'Advanced']
      }
    }
  ],

  methods: [
    function render() {
      let self = this;
      this.
        addClass().
        show(this.showPrompts$).
        start().
        addClass(this.myClass('input-field-container')).
        add(this.dynamic(function(promptMode) {
          self.toolbarControlDAO
            .where(self.EQ(self.ToolbarControl.TOOLBAR, self.promptMode))
            .select().then(result => {
              result.array
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .forEach(c => {
                  this.tag({class: c.view, data: self.data});
                });
            });
        })).
        end().
        startContext({ data: this }).
        add(this.PROMPT_MODE).
        endContext();
    }
  ]
});
