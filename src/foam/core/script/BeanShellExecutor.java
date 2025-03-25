/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.core.script;

import bsh.EvalError;
import bsh.Interpreter;
import foam.lang.X;
import foam.core.boot.CSpec;
import foam.core.logger.Logger;
import java.io.IOException;
import java.io.PrintStream;

public class BeanShellExecutor {
  private CSpec cSpec;
  public static final Object[] OBJECT_HOLDER = new Object[1];

  public BeanShellExecutor(CSpec cSpec) {
    this.cSpec = cSpec;
  }

  public Object execute(X x, PrintStream ps, String serviceScript ) throws IOException  {
    Interpreter shell = new Interpreter();

    try {
      shell.set("x", x);
      return shell.eval(serviceScript);
    } catch (EvalError e) {
      Logger logger = (Logger) x.get("logger");
      if ( logger != null ) {
        logger = foam.core.logger.StdoutLogger.instance();
      }
      logger.error(this.getClass().getSimpleName(), "execute", (this.cSpec != null ? this.cSpec.getName() : ""), e);
      return null;
    }
  }
}
