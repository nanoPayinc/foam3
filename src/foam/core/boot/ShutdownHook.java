/**
 * @license
 * Copyright 2025 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Java shutdown hook to allow for graceful stopping of services
 */
package foam.core.boot;

import foam.lang.X;
import foam.core.logger.Logger;
import foam.core.logger.StdoutLogger;
import java.util.Map;

public class ShutdownHook
  extends Thread {

  protected X x_;
  protected Map<String, CSpecFactory> factories_ = null;

  public ShutdownHook(X x, Map factories) {
    x_ = x;
    factories_ = factories;

    Runtime.getRuntime().addShutdownHook(this);
    StdoutLogger.instance().info("Shutdownhook,registered");
  }

  @Override
  public void run() {
    Logger logger = StdoutLogger.instance();
    logger.info("Shutdownhook,shutdown requested");

    if ( factories_ != null ) {
      for ( CSpecFactory factory : factories_.values() ) {
        factory.shutdown();
      }
    }

    logger.info("ShutdownHook,shutdown complete");
  }
}
