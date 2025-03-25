/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.benchmark;

import foam.lang.X;
import foam.core.bench.Benchmark;
import foam.core.bench.BenchmarkRunner;
import foam.core.bench.BenchmarkRunner.Builder;
import foam.core.pm.*;
import java.util.Map;

public class PMBenchmark
  extends Benchmark
{
  @Override
  public void execute(X x) {
    PM pm = new PM(foam.core.bench.Benchmark.class, "abc");
    pm.log(x);
  }
}
