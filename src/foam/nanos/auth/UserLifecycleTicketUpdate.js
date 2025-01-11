/**
 * @license
 * Copyright 2024 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'UserLifecycleTicketUpdate',

  properties: [
    {
      name: 'daoKey',
      class: 'String'
    },
    {
      name: 'of',
      class: 'Class',
      javaInfoType: 'foam.core.AbstractObjectPropertyInfo',
      javaType: 'foam.core.ClassInfo',
    },
    {
      name: 'objectId',
      class: 'Object'
    },
    {
      name: 'previousState',
      class: 'Object'
    },
    {
      name: 'currentState',
      class: 'Object'
    }
  ],
  methods: [
    {
      name: 'toString',
      type: 'String',
      javaCode: `
      StringBuilder sb = new StringBuilder();
      sb.append(getDaoKey());
      sb.append(",");
      sb.append(getOf());
      sb.append(",");
      sb.append(getObjectId());
      sb.append(",");
      sb.append(getPreviousState());
      sb.append(",");
      sb.append(getCurrentState());
      return sb.toString();
      `
    },
    {
      name: 'toKey',
      type: 'String',
      javaCode: `
      StringBuilder sb = new StringBuilder();
      sb.append(getOf().getObjClass().getSimpleName());
      sb.append(":");
      sb.append(getObjectId());
      return sb.toString();
      `
    }
  ]
})
