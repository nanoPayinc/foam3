/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.pii',
  name: 'PropertyInfoRefine',
  refines: 'foam.lang.PropertyInfo',

  methods: [
    {
      name: 'containsPII',
      type: 'boolean',
      code: function() { return false; },
      javaCode: 'return false;'
    },
    {
      name: 'containsDeletablePII',
      type: 'boolean',
      code: function() { return false; },
      javaCode: 'return false;'
    }
  ]
});
