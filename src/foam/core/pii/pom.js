/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.POM({
  name: "pii",
  projects: [
    { name: "test/pom",
      flags: "test" },
  ],
  files: [
    { name: "AddressRefine",
      flags: "js|java" },
    { name: "KeyValue",
      flags: "js|java" },
    { name: "PIIAware",
      flags: "js|java" },
    { name: "PIIReportRequestView",
      flags: "web" },
    { name: "PIIReportTicket",
      flags: "js|java" },
    { name: "PIIReportTicketRuleAction",
      flags: "js|java" },
    { name: "PIIReportTicketSendRuleAction",
      flags: "js|java" },
    { name: "PropertyInfoRefine",
      flags: "js|java" },
    { name: "PropertyRefine",
      flags: "js|java" },
    { name: "UserRefine",
      flags: "js|java" }
  ]
});
