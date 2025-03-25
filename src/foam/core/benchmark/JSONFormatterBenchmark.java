/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.benchmark;

import foam.lang.X;
import foam.lib.formatter.JSONFObjectFormatter;
import foam.core.auth.Subject;
import foam.core.auth.User;
import foam.core.bench.Benchmark;
import foam.core.bench.BenchmarkResult;

public class JSONFormatterBenchmark
  extends Benchmark
{
  protected JSONFObjectFormatter f_ = new JSONFObjectFormatter(null);
  protected User                 u_ = null;

  @Override
  public void setup(X x, BenchmarkResult br) {
    u_ = ((Subject) x.get("subject")).getUser();
  }

  @Override
  public void execute(X x) {
    f_.reset();
    f_.output(u_);
  }
}
