/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.demo.relationship',
  name: 'Student',

  ids: [ 'studentId' ],

  properties: [
    {
      class: 'String',
      name: 'name'
    },
    {
      class: 'Long',
      name: 'studentId'
    }
  ]
});

foam.RELATIONSHIP({
  sourceModel: 'foam.core.demo.relationship.Student',
  targetModel: 'foam.core.demo.relationship.Course',
  cardinality: '*:*',
  forwardName: 'courses',
  inverseName: 'students'
});
