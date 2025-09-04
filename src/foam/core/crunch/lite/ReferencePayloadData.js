/**
* @license
* Copyright 2024 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.INTERFACE({
  package: 'foam.core.crunch.lite',
  name: 'ReferencePayloadData',
  documentation: `
    Interface for payload data that is a reference to another object. Useful for storing psuedo-relationships
    for instance - bank account reference on user without explicitly creating a property on the user object.

    Implemented in CapableAdapterDAO and used in CapableDAO. 

    CapableDAO will call CapableAdapterDAO to on find and select methods which will then call the onSelect method of the payload data. 
    onSelect can be used to populate the dataObj property with the object that the payload data is referencing,
    or subclasses can implement the onSelect method to do something else.

    Similarly, on put operations, the onUpdate method will be called by CapableAdapterDAO. onUpdate can be used update the referenced object
    with dataObj if dataObj is different from the object that was sent to the client, or subclasses can implement the onUpdate method to do something else.
  `,


  properties: [
    {
      // Should be a reference to another obj, not enforced here as the build will fail without a valid 'of' property
      // class: 'Reference',
      name: 'data'
    },
    {
      name: 'dataObj'
    }
  ],
  methods: [
    {
      name: 'onUpdate',
      type: 'Void',
      javaThrows: ['Exception'],
      args: [
        { name: 'x', type: 'Context' }
      ]
    },
    {
      name: 'onSelect',
      type: 'Void',
      javaThrows: ['Exception'],
      args: [
        { name: 'x', type: 'Context' }
      ]
    }
  ]
});
