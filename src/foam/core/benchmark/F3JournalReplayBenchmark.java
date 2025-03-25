/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.benchmark;

import foam.lang.X;
import foam.dao.*;
import foam.core.auth.User;
import foam.core.bench.Benchmark;
import foam.core.bench.BenchmarkResult;

public class F3JournalReplayBenchmark extends Benchmark {
  protected F3FileJournal journal_;
  protected DAO dao_;
  protected int userCount;

  public F3JournalReplayBenchmark() {
    this(1000);
  }

  public F3JournalReplayBenchmark(int userCount) {
    this.userCount = userCount;
  }

  @Override
  public void setup(X x, BenchmarkResult br) {
    dao_ = new NullDAO();
    journal_ = new F3FileJournal.Builder(x)
//      .setDao(new MDAO(User.getOwnClassInfo()))
      .setFilename("f3replaybenchmark")
      .setCreateFile(true)
      .build();
    journal_.setX(x);
    for (int i = 0; i < userCount; i ++ ) {
      User u = new User();
      u.setId(System.currentTimeMillis());
      u.setFirstName("test");
      u.setLastName("testing");
      journal_.put(x, "", dao_, u);
    }
  }

  @Override
  public void execute(X x) {
    journal_.replay(x, new MDAO(User.getOwnClassInfo()));
  }
}
