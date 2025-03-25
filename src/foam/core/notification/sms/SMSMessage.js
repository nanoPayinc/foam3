/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

 foam.CLASS({
   package: 'foam.core.notification.sms',
   name: 'SMSMessage',

   documentation: 'SMS message',

   implements: [
     'foam.core.auth.CreatedAware',
     'foam.core.auth.CreatedByAware'
   ],

   properties: [
     {
       class: 'Long',
       name: 'id'
     },
     {
       class: 'Reference',
       of: 'foam.core.auth.User',
       name: 'user'
     },
     {
       class: 'DateTime',
       name: 'created'
     },
     {
       class: 'Reference',
       of: 'foam.core.auth.User',
       name: 'createdBy',
       documentation: 'User who created SMSMessage'
     },
     {
       class: 'Reference',
       of: 'foam.core.auth.User',
       name: 'createdByAgent',
       documentation: 'User whocreated SMSMessage'
     },
     {
       class: 'String',
       name: 'message'
     },
     {
       class: 'String',
       name: 'phoneNumber'
     },
     {
       class: 'Enum',
       of: 'foam.core.notification.sms.SMSStatus',
       name: 'status'
     }
   ]
 });
