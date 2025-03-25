/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.menu',
  name: 'TreeGraphAltView',
  extends: 'foam.u2.view.AltView',

  requires: [
    'foam.core.menu.Menu',
    'foam.u2.view.TableView',
    'foam.u2.view.TreeGraphView'
  ],

  css: `
    .foam-u2-view-TreeGraphView {
      width: 962px;
    }
  `,

  methods: [
    function init() {
      this.views = [
        [{ class: 'foam.u2.view.TableView' }, 'Table'],
        /*
        [{
            class: 'foam.u2.view.TreeGraphView'
          }, 'Tree']];
        },
        */
        [{
            class: 'foam.graphics.TreeGraph',
            width: 1000,
            height: 1000
          }, 'Graph']];
        }
      ]
});
