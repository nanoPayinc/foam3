/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.wizard.debug',
  name: 'WizardInspector',
  extends: 'foam.u2.Controller',

  imports: [
    'wizardController'
  ],

  requires: [
    'foam.u2.DetailPropertyView',
    'foam.u2.borders.Block'
  ],

  static: [
    // ???: Should this and TranslationConsole extend a common class?
    function OPEN(opt_args, opt_x) {
      const windowProps = "width=800,height=800,scrollbars=no";
      const w = globalThis.window.open("", "Wizard Inspector", windowProps, true);

      document.body.addEventListener('beforeunload', () => w.close());

      w.document.body.innerText = '';
      w.document.body.innerHTML = '<title>Wizard Inspector</title>';
      w.document.$UID = foam.next$UID();

      var window = foam.core.Window.create({window: w}, opt_x || ctrl);
      var v      = this.create(opt_args || {}, window);
      v.write(window.document);
    }
  ],

  css: `
    ^, ^wizardlet-list {
      display: flex;
      flex-direction: column;
    }
    ^wizardlet-row {
      display: flex;
      flex-direction: column;
    }
    ^wizardlet-row:not(:last-of-type) {
      margin-bottom: 4px;
    }
    ^wizardlet-actions {
      display: flex;
      align-items: center;
    }
    ^ .foam-u2-borders-Block {
      border-color: #333;
    }
    ^current.foam-u2-borders-Block {
      border-color: /*%PRIMARY1%*/ #3F3;
    }
  `,

  methods: [
    function render() {
      const self = this;
      const wizardController = self.wizardController;
      this
        .addClass(this.myClass())
        .start('h1').add(wizardController.title || 'Untitled Wizard').end()
        .startContext({ data: wizardController })
          .tag(self.STORE_GLOBAL)
        .endContext()
        .start('h2').add('wizardlets').end()
        .start(this.Block)
          .add(wizardController.wizardlets$.map(() => this.E()
            .addClass(self.myClass('wizardlet-list'))
            .forEach(wizardController.wizardlets, function (wizardlet) {
              this
                .start(self.Block)
                  .addClass(wizardController.currentWizardlet$.map(() =>
                    ( wizardController.currentWizardlet === wizardlet )
                      ? self.myClass('current')
                      : self.myClass('not-current')))
                  .addClass(self.myClass('wizardlet-row'))
                  .startContext({ data: wizardlet })
                    .add(wizardlet.TITLE)
                    .start()
                      .addClass(self.myClass('wizardlet-actions'))
                      .tag(wizardlet.IS_AVAILABLE)
                      .add('isAvailable')
                      .tag(wizardlet.IS_VISIBLE)
                      .add('isVisible')
                      .tag(self.STORE_GLOBAL, { size: 'SMALL' })
                    .end()
                  .endContext()
                .end()
                ;
            })
          ))
        .end()
        ;
    }
  ],

  actions: [
    {
      name: 'storeGlobal',
      label: 'Store as Global Variable',
      code: function storeGlobal() {
        for ( let i = 1 ; true ; i++ ) {
          const nameToTry = 'temp' + i;
          if ( globalThis.hasOwnProperty(nameToTry) ) continue;

          globalThis[nameToTry] = this;
          console.log(`%cstored wizardlet: %c${nameToTry} %o`,
            "font-weight: bold",
            "color: #fc0373;",
            this
          );
          break;
        }
      }
    }
  ]
});