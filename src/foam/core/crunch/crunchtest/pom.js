foam.POM({
  name: "crunchtest",
  files: [
    { name: "FakeTestObject",                                         flags: "js|java" }
    // { name: "TestCapable",                                            flags: "js|java" }
  ],
  javaFiles: [
    { name: "CapabilityReopenTest" },
    { name: "CapabilityReputTest" },
    { name: "CapabilityTest" },
    { name: "CapableTest" },
    { name: "PredicatedPCJDAOTest" }
  ]
});
