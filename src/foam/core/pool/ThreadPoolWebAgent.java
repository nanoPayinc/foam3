/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.pool;

import foam.lang.*;
import foam.core.http.WebAgent;
import foam.util.SafetyUtil;
import java.io.PrintWriter;
import jakarta.servlet.http.HttpServletRequest;

/** Display thread pool information. **/
public class ThreadPoolWebAgent
  implements WebAgent
{
  public ThreadPoolWebAgent() {}

  public void execute(X x) {
    PrintWriter                        out   = x.get(PrintWriter.class);
    ThreadPoolAgency                   pool  = (ThreadPoolAgency) x.get("threadPool");
    java.util.concurrent.BlockingQueue queue = pool.pool_.getQueue();

    out.println(pool.getClass().getSimpleName() + ": " + pool.toString());
    out.println("<br>");
    out.println("pool queue size: " + queue.size());
  }
}
