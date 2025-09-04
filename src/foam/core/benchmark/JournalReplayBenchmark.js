/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.core.benchmark',
  name: 'JournalReplayBenchmark',
  extends: 'foam.core.bench.Benchmark',

  javaImports: [
    'foam.lang.X',
    'foam.core.auth.User',
    'foam.core.bench.Benchmark',
    'foam.core.bench.BenchmarkResult',
    'foam.dao.*'
  ],

  javaCode: `
    protected FileJournal journal_;
    protected DAO dao_;
    protected int userCount = 1000;

    public JournalReplayBenchmark(int userCount) {
      this.userCount = userCount;
    }
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
        journal_ = new FileJournal.Builder(x)
    //      .setDao(new MDAO(User.getOwnClassInfo()))
          .setFilename("replaybenchmark")
          .setCreateFile(true)
          .build();
        for (int i = 0; i < userCount; i ++ ) {
          User u = new User();
          u.setId(System.currentTimeMillis());
          u.setFirstName("test");
          u.setLastName("testing");
          journal_.put(x, "", dao_, u);
        }
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
        journal_.replay(x, new MDAO(User.getOwnClassInfo()));
      `
    }
  ]
});