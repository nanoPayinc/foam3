/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.box',
  name: 'CrunchClientBox',
  extends: 'foam.box.ProxyBox',

  documentation: `
    This box adds support for CRUNCH intercepts.
  `,

  requires: [ 'foam.core.crunch.box.CrunchClientReplyBox' ],

  properties: [
  ],

  methods: [
    {
      name: 'send',
      code: function send(msg) {
        msg.attributes.replyBox.localBox =
          this.CrunchClientReplyBox.create({
            msg:       msg,
            clientBox: this,
            delegate:  msg.attributes.replyBox.localBox
          });

        this.delegate.send(msg);
      }
    }
  ]
});
