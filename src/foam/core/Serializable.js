/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core',
  name: 'Serializable',

  documentation: `
    Marker interface to indicate that a CLASS is serializble or not.

    (Currently) only used for Sinks to indicate if they can be serialized across the network
    to the server and back. If they aren't serializable, an ArraySink is
    sent in their place, and when it returns, its contents are copied to
    the non-serializable sink.

    Checked in RestDAO, ClientDAO, and RequestResponseClientDAO.
  `
});
