/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.http;

import foam.lang.*;
import foam.dao.DAO;
import foam.dao.AbstractSink;
import foam.core.boot.CSpec;
import java.io.PrintWriter;

public class ServicesWebAgent
  implements WebAgent
{
  public ServicesWebAgent() {}

  public void execute(X x) {
    final PrintWriter out   = x.get(PrintWriter.class);
          DAO         dao   = (DAO) x.get("cSpecDAO");
    final int[]       count = { 0, 0 };

    out.println("<pre>");
    dao.orderBy(CSpec.NAME).select(new AbstractSink() {
      @Override
      public void put(Object o, Detachable d) {
        CSpec s = (CSpec) o;
        out.println(s.getName() + (s.getServe() ? " (S)" : ""));
        if ( s.getServe() ) count[1]++;
        count[0]++;
      }
    });
    out.println();
    out.println(count[0] + " services, " + count[1] + " served");
    out.println("</pre>");
  }
}
