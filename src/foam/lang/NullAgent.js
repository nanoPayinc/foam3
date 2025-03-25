/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.lang',
  name: 'NullAgent',
  documentation: `
    An Agent that has an empty execution.
  `,

  implements: [
    'foam.lang.ContextAgent'
  ],

  methods: [
    async function execute() {}
  ]
});
  