/**
 * @license
 * Copyright 2025 Google Inc. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'RemoteSink',
  extends: 'foam.dao.ProxySink',

  documentation: 'A Remote Proxy for the Sink interface. Used for Sink callbacks on dao.listen().',

  axioms: [
    // Makes it so that the Sink isn't Serialized but instead has a Skeleton
    // registered to receive remote callbacks.
    {
      class: 'foam.box.Remote',
      clientClass: 'foam.dao.ClientSink'
    }
  ],

  properties: [
    {
      class: 'Proxy',
      of: 'foam.dao.Sink',
      name: 'delegate',
      factory: function() { return foam.dao.ArraySink.create(); }
    }
  ]
});
