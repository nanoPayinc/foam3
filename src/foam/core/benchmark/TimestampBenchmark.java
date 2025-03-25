/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.benchmark;

import foam.lang.X;
import foam.core.bench.Benchmark;
import foam.util.FastTimestamper;
import foam.util.SyncFastTimestamper;

public class TimestampBenchmark
  extends Benchmark
{
  protected FastTimestamper ts_ = new SyncFastTimestamper();

  @Override
  public void execute(X x) {
    ts_.createTimestamp();
  }
}
