/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.pii',
  name: 'PropertyRefine',
  refines: 'foam.lang.Property',

  properties: [
    {
      /**
        Identifies properties that contain Personally identifiable information,
        which may fall within the ambit of privacy regulations.
      */
      class: 'Boolean',
      name: 'containsPII'
    },
    {
      /**
        Identifies properties that contain Personally identifiable information which
        may be eligible for deletion on request.
        NOTE: this property is only tested if containsPII is true.
      */
      class: 'Boolean',
      name: 'containsDeletablePII'
    }
  ]
});
