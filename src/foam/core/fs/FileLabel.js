/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.fs',
  name: 'FileLabel',
  ids:['name'],
  documentation: 'Contextual label applied to a file instance',

  properties: [
    {
      class: 'String',
      name: 'name'
    },
    {
      class: 'String',
      name: 'description'
    }
  ],

  methods: [
    function toSummary() { return this.name; }
  ]
})

foam.RELATIONSHIP({
  sourceModel: 'foam.core.fs.FileLabel',
  targetModel: 'foam.core.fs.FileLabel',
  forwardName: 'children',
  inverseName: 'parent',
  sourceProperty: {
    hidden: true
  },
  targetProperty: {
    class: 'String',
    value: '',
    view: {
      class: 'foam.u2.view.ReferenceView',
      placeholder: '--'
    }
  }
});
