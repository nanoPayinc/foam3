/**
 * @license
 * Copyright 2015 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.menu',
  name: 'SessionLinkMenu',
  extends: 'foam.core.menu.LinkMenu',

  imports: [
    'window'
  ],

  documentation: 'A menu item which links to an URL with current session id.',

  methods: [
    function select(X, menu) {
      var url = window.location.origin;
      url += this.link;
      url += "?sessionId=" + localStorage.defaultSession;
      this.link = url;

      this.SUPER();
      /*
      if ( this.openNewTab ) {
        this.window.open(url, '_blank');
      } else {
        this.window.location = url;
      }
      if ( menu.analyticsMessage ) {
        X.postToWindow?.post({ step: menu.analyticsMessage });
      }*/
/*    },
    function launch(X, menu) {
      this.select(X, menu);*/
    }
  ]
});
