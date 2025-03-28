/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.INTERFACE({
  package: 'foam.lib.csv',
  name: 'CSVOutputter',

  proxy: true,

  methods: [
    {
      name: 'outputValue',
      args: [
        { name: 'value' }
      ]
    },
    {
      name: 'outputFObject',
      args: 'Context x, FObject obj'
    },
    {
      name: 'flush'
    }
  ]
});
