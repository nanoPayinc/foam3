/**
 * @license
 * Copyright 2023 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.POM({
  name: "zac",
  version: 1,
  package: 'foam.core.zac',
  projects: [
    { name: "../../../pom" },
    { name: "../../../foam/core/pom" },
    { name: "../../../../deployment/demo/pom" }
  ],
  files: [
    { name: "Client", flags: "web" }
  ]
});
