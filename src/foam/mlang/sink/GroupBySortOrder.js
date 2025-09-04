/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.ENUM({
  package: 'foam.mlang.sink',
  name: 'GroupBySortOrder',
  
  documentation: 'Sort order options for GroupBy value-based limiting',
  
  values: [
    {
      name: 'NONE',
      label: 'No Sorting',
      ordinal: 0,
      documentation: 'Keep groups in original order, no value-based sorting or limiting'
    },
    {
      name: 'ASC',
      label: 'Ascending', 
      ordinal: 1,
      documentation: 'Sort by value ascending (lowest values first)'
    },
    {
      name: 'DESC',
      label: 'Descending',
      ordinal: 2, 
      documentation: 'Sort by value descending (highest values first)'
    }
  ]
});