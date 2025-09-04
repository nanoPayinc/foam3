/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.benchmark',
  name: 'F3FileJournalBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.X',
    'foam.core.auth.User',
    'foam.core.bench.Benchmark',
    'foam.core.bench.BenchmarkResult',
    'foam.dao.*'
  ],

  javaCode: `
    protected F3FileJournal journal_;
    protected DAO         dao_;
  `,

  methods: [
    {
      name: 'setup',
      args: [
        {
          name: 'x',
          type: 'X'
        },
        {
          name: 'br',
          type: 'BenchmarkResult'
        }
      ],
      javaCode: `
        dao_ = new NullDAO();
        journal_ = new F3FileJournal.Builder(x)
          .setDao(new MDAO(User.getOwnClassInfo()))
          .setFilename("f3journalbenchmark")
          .setCreateFile(true)
          .build();
      `
    },
    {
      name: 'execute',
      args: [
        {
          name: 'x',
          type: 'X'
        }
      ],
      javaCode: `
        User u = new User();
        u.setId(System.currentTimeMillis());
        u.setFirstName("test");
        u.setLastName("testing");
        journal_.put(x, "", dao_, u);
      `
    }
  ]
});