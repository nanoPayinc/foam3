/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.approval',
  name: 'ReleaseCashInApprovalType',

  implements: [
    'foam.core.auth.ServiceProviderAware'
  ],

  properties: [
  	{
  		class: 'String',
  		name: 'id'
  	},
  	{
  		class: 'Reference',
  		of: 'foam.core.approval.ApprovalRequestClassification',
  		name: 'classification'
  	},
  	{
  		class: 'Reference',
  		of: 'foam.core.auth.ServiceProvider',
  		name: 'spid'
  	}
  ]
});
