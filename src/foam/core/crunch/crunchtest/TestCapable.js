/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.crunch.crunchtest',
  name: 'TestCapable',
  implements: [ 'foam.core.crunch.lite.Capable' ],
  documentation: `
    Object implementing Capable to do testing with.
  `,

  properties: [
    {
      name: 'id',
      class: 'String',
    },
    // Grab properties from CapableObjectData
    ...(
      foam.core.crunch.lite.CapableObjectData
        .getOwnAxiomsByClass(foam.lang.Property)
        .map(p => p.clone())
    )
  ],

  methods: [
    // Grab methods from CapableObjectData
    ...(
      foam.core.crunch.lite.CapableObjectData
        .getOwnAxiomsByClass(foam.lang.Method)
        .map(p => p.clone())
    )
  ]
});