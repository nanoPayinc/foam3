/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
   package: 'foam.u2',
   name: 'PhoneCountryCodeCitationView',
   extends: 'foam.u2.CitationView',
   
   methods: [
      function getSummary(data) {
         return data.emoji + ' ' + data.name + ' +' + data.phoneCode;
      }
   ]
});
