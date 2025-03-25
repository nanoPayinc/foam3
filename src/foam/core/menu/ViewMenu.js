/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.menu',
  name: 'ViewMenu',
  extends: 'foam.core.menu.AbstractMenu',

  properties: [
    {
      class: 'foam.u2.ViewSpec',
      name: 'view',
      javaInfoType: 'foam.lang.AbstractFObjectPropertyInfo',
      javaJSONParser: 'new foam.lib.json.UnknownFObjectParser()',
      // TODO: remove next line when permanently fixed in ViewSpec
      fromJSON: function fromJSON(value, ctx, prop, json) { return value; }
    }
  ],

  methods: [
    function createView(X) { return this.view.clone ? this.view.clone() : this.view; }
  ]
});
