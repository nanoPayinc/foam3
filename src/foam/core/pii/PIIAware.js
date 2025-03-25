/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.core.pii',
  name: 'PIIAware',

  documenation: `Models with pii data that is more sensibly reported
as a single text block should implement PIIAware rather than use per
property containsPII.
An example is the Address model where the many address properties can
be summerized into a single line.
`,

  methods: [
    {
      documentation: 'Return a concatenation of the models pii data.',
      name: 'piiSummary',
      type: 'String'
    }
  ]
});
