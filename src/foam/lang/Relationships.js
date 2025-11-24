/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.RELATIONSHIP({
   sourceModel: 'foam.lang.Currency',
   targetModel: 'foam.core.auth.Country',
   forwardName: 'countries',
   inverseName: 'currency',
   cardinality: '1:*'
 });
 